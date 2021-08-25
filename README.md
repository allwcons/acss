# Welcome to Acss

## requirement
  `nodejs version` > 6

***`To run acss`*** 
 - you need two file `acss.js` and `compiler.js`
 - another file where builds are going to save like `test.js` (build file)
    you can name is anything
 - add these inside head tag `<script type="text/javascript" src="acss.js"></script>`
    and
    `<script defer src="test.js"></script>`
 - write acss code to `style.acss`
 - compile these code using command
        `node compiler.js filename.acss buildfile`
        eg:
            node compiler.js style.acss test.js
 - run your html code
 - that's it.

