

HTMLElement.prototype.get_css_var = function(Var){
	return getComputedStyle(this).getPropertyValue(Var)
}

HTMLElement.prototype.set_css_var = function(Var,value){
	return this.style.setProperty(Var,value)
}


function installAcss(){
    let selectors = setup_json
    let external_selector = external_hook;

    let builtin_event = {
        "mousedown":"mouseup",
        "keydown":"keyup"
    }

    for(let i = 0;i<selectors.length;i++){
        let state = selectors[i]
        let query = state.selector
        let elts = document.querySelectorAll(query)
        for(let j = 0;j<elts.length;j++){
            if(builtin_event[state._event]){

                elts[j].addEventListener(state._event,onmainevent(state._if,state._else,state.key))
                window.addEventListener(state._event,()=>{})
                elts[j].addEventListener(builtin_event[state._event],onsecondaryevent(state._if,state._else,state.key))
                window.addEventListener(builtin_event[state._event],onsecondaryevent(state._if,state._else,state.key,elts[j]))
            }else{
                for(let k = 0;k  <external_selector.length;k++){
                    if(external_selector[k].event_as == state._event){
                        console.log(external_selector[k])
                        let elt_new = document.querySelectorAll(external_selector[k].selector)
                        elt_new.forEach(elt=>{
                            
                            elt.addEventListener(external_selector[k].event,onmainevent(state._if,state._else,state.key,elts[j]))
                            window.addEventListener(external_selector[k].event,()=>{})
                            window.addEventListener(builtin_event[external_selector[k].event],onsecondaryevent(state._if,state._else,state.key,elts[j]),true)
                            elt.addEventListener(builtin_event[external_selector[k].event],onsecondaryevent(state._if,state._else,state.key,elts[j])) 

                                   })                    
                    }
            }
        }
    }



    function onmainevent(_if,_else,key,elts){
        function handler(e){
            let elt
            if(!elts){
                elt = e.target
            }else{
                elt = elts
            }
            elt.set_css_var(`--else_${key}`, "unset")
            elt.set_css_var(`--if_${key}`, _if)
        }
        return handler
    }

    function onsecondaryevent(_if,_else,key,elts){
        function handler(e){
            let elt
            if(!elts){
                elt = e.target
            }else{
                elt = elts
            }
            elt.set_css_var(`--if_${key}`, "unset")
            elt.set_css_var(`--else_${key}`, _else)
        }
        return handler
    }
}

}