
          let setup_json = [{"_event":"mousedown","_if":"#221f3b","_else":"black","selector":".btn","key":"2542c569-24b6-4d71-a7b1-93d2e40dc561"},{"_event":"mousedown","_if":"lightblue","_else":"yellow","selector":".btn","key":"eb8325c0-0384-4a81-9a9f-37c2f36941b3"},{"_event":"isBtnClicked","_if":"200px","_else":"var(--w)","selector":".card","key":"10f75dbe-5577-4f86-bc88-5cd89e97a8b0"},{"_event":"mousedown","_if":"200px","_else":"var(--secheight)","selector":".card","key":"3ec341e3-83c1-4ce6-ad55-f2d43d1c9bb4"}]
          let external_hook = [{"selector":".btn","event":"mousedown","event_as":"isBtnClicked"}]
          window.onload = () => installAcss()
          