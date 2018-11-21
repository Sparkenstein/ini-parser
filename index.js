const fs = require('fs');

// regexes
const sectionRE = /\[(.*?)\]/;
const commentsRE = /^\s*;/;

class iniParser {
    constructor(fileName) {
        const content = fs.readFileSync(fileName, 'utf-8');
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

    getKeys(sectionName) {
        return Object.keys(this.relations[sectionName]);
    }
    
    getValue(sectionName, key){
        return this.relations[sectionName][key];
    }
}

module.exports = iniParser;