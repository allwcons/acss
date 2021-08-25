
    let setup_json = [{"_event":"mousedown","_if":"red ","_else":"green","selector":".btn","key":"ea453c27-29a8-4acf-acde-1ac835b0b92f"},{"_event":"mousedown","_if":"lightblue ","_else":"yellow","selector":".btn","key":"3b95c042-239f-4a5e-addc-303d00bef269"},{"_event":"lolol","_if":"var(--width) * 2 ","_else":"200px","selector":".card","key":"1e79e499-7970-46d5-8dc6-8efb11e5508d"},{"_event":"mousedown","_if":"var(--height) ","_else":"300px","selector":".card","key":"ae179431-89df-4879-8290-d0c7432610b2"}]
    let external_hook = [{"selector":".btn","event":"mousedown","event_as":"lolol"}]
    window.onload = () => installAcss()
    