# ini-parser
Simple ini parser written in NodeJS.

#### Installation
```npm install Sparkenstein/ini-parser```


#### Example
```JavaScript
const Parser = require('ini-parser');
const parser = new Parser('filename.ini');

//Returns all the sections
console.log(parser.getsections());

//Returns the value
console.log(parser.getValue(section,key);

//Returns all the keys
console.log(parser.getKeys(section));

//returns all the section and values associated to the keys as object.
console.log(parser.relations);
```
