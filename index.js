const fs = require('fs');
const path = require('path');
// regexes
const sectionRE = /\[(.*?)\]/;
const commentsRE = /^\s*;/;

// messages
const SECTION_DOES_NOT_EXISTS = str => `Section ${str} does not exist`;

class iniParser {
    constructor(fileName) {
        this.fileName = fileName;
        const content = fs.readFileSync(path.resolve(fileName), 'utf-8');
        this.filtered = content.split('\n').filter(e => e && !e.match(commentsRE));

        this.relations = {};
        let currentSection = '';
        for (let i of this.filtered) {
            if (i.match(sectionRE)) {
                currentSection = i.match(sectionRE)[1];
                this.relations[currentSection] = {};
            } else {
                const pairs = i.trim().split("=");
                this.relations[currentSection][pairs[0]] = pairs[1];
            }
        }
    }

    getsections() {
        return this.filtered.reduce((a, e) => {
            const m = e.match(/\[(.*?)\]/);
            if (m)
                a.push(m[1]);
            return a;
        }, []);
    }

    getsection(sectionName) {
        return this.relations[sectionName] || SECTION_DOES_NOT_EXISTS(sectionName);
    }

    getKeys(sectionName) {
        return this.relations[sectionName] && Object.keys(this.relations[sectionName]) ||
            SECTION_DOES_NOT_EXISTS(sectionName);
    }

    getValue(sectionName, key) {
        return this.relations[sectionName] ? this.relations[sectionName][key] ||
            `key "${key}" under given section "${sectionName}" does not exists`:
            SECTION_DOES_NOT_EXISTS(sectionName);
    }

    setValue(sectionName, key, value) {
        if(!this.relations[sectionName]){
            return SECTION_DOES_NOT_EXISTS(sectionName);
        }
        this.relations[sectionName][key] = value
        return this.relations;
    }

}

module.exports = iniParser;