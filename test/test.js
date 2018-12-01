const assert = require('assert');

const iniParser = require('../index');
const parser = new iniParser(__dirname + '/sample.ini');

describe('reading', function(){
    describe('list of sections', function(){
        it('should return list of sections from sample file', function(){
            assert.deepStrictEqual([ 'config', 'secrete' ], parser.getsections());
        });
    });

    describe('list of keys inside section', function(){
        it('should return list of all keys in some section', function(){
            assert.deepStrictEqual([ 'name', 'age' ], parser.getKeys('config'));
        })
    });

    describe('section does not exists', function(){
        it('should not fail if section does not exist while retrieving keys', function(){
            assert.equal('Section php does not exist', parser.getKeys('php'));
        });

        it('should not fail if section does not exist while retrieving section name', function(){
            assert.equal('Section java does not exist', parser.getsection('java'));
        });
    });

    describe('read value from a section', function(){
        it('should return value of a given key inside a section', function(){
            assert.equal('spark', parser.getValue('config', 'name'));
        })
    });

});