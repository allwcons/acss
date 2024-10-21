
          let setup_json = [{"_event":"mousedown","_if":"#221f3b","_else":"black","selector":".btn","key":"a1dd4f80-8c04-4c6c-9659-15b1e4d75a8d"},{"_event":"mousedown","_if":"lightblue","_else":"yellow","selector":".btn","key":"c1a78b5c-ed58-48e1-980d-35209cd08530"},{"_event":"isBtnClicked","_if":"200px","_else":"var(--w)","selector":".card","key":"ead52ed6-08b7-4110-b160-553aa8211368"},{"_event":"mousedown","_if":"200px","_else":"var(--secheight)","selector":".card","key":"555499d7-a7c4-4b5f-830d-dffa2be46a07"}]
          let external_hook = [{"selector":".btn","event":"mousedown","event_as":"isBtnClicked"}]
          window.onload = () => installAcss()
          