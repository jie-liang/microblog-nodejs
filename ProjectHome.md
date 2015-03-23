This project implements [BYVoid's Microblog](https://github.com/BYVoid/microblog) with express@3.1.0, ejs@0.8.3 and ejs-locals@1.0.2. BYVoid's Microblog source code only works with express 2.

This app uses ejs-locals to bring back Express 3.x layout, partial and block template functions for the EJS template engine.

To kickstart, make sure you follow the guide in [Wiki](http://code.google.com/p/microblog-nodejs/wiki/GettingStarted).

Here is the package info.
```
Microblog@0.0.1
├── connect-flash@0.1.0
├── connect-mongo@0.3.2
├── ejs@0.8.3
├── ejs-locals@1.0.2
├─┬ express@3.1.0
│ ├── buffer-crc32@0.1.1
│ ├── commander@0.6.1
│ ├─┬ connect@2.7.2
│ │ ├── bytes@0.1.0
│ │ ├── formidable@1.0.11
│ │ ├── pause@0.0.1
│ │ └── qs@0.5.1
│ ├── cookie@0.0.5
│ ├── cookie-signature@0.0.1
│ ├── debug@0.7.2
│ ├── fresh@0.1.0
│ ├── methods@0.0.1
│ ├── mkdirp@0.3.3
│ ├── range-parser@0.0.4
│ └─┬ send@0.1.0
│   └── mime@1.2.6
└─┬ mongodb@1.2.13
  └── bson@0.1.8
```