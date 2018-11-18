const fs = require('fs');
const { log } = console;
const content = fs.readFileSync('./sample.ini', 'utf-8');

// regexes
const sectionRE = /\[(.*?)\]/;
const commentsRE = /^\s*;/;

const filtered = content.split('\n').filter(e => e && !e.match(commentsRE));

/** TODO: Change imperative parts to declarative */

let relations = {};
let currentSection = '';
for (let i of filtered) {
    if (i.match(sectionRE)) {
        currentSection = i.match(sectionRE)[1];
        relations[currentSection] = {};
    } else {
        const pairs = i.trim().split("=");
        relations[currentSection][pairs[0]] = pairs[1];
    }
}
