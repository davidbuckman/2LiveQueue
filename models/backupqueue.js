/*
 * backupqueue.js
 * 
 * List of backup words in case the user-filled queue runs out. Words 
 */

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function BackupQueue() {
    
    var level_lists = {
            'level1' : require('../resources/test_wordlist.json').slice(),
            'level2' : require('../resources/level2_wordlist.json').slice(),
            'level3' : require('../resources/level3_wordlist.json').slice(),
            'level4' : require('../resources/level4_wordlist.json').slice(),
            'level5' : require('../resources/level5_wordlist.json').slice()
    };

    for (var level in level_lists) {
        if (!level_lists.hasOwnProperty(level)) { continue; }
        shuffleArray(level_lists[level]);
    }
    
    this.get_level = function(level) {
        if (level == undefined) { level = 'level1' }
        if (level_lists[level].length == 0) {
            level_lists[level] = require('../resources/' + level + '_wordlist.json').slice();
            shuffleArray(level_lists[level]);
        }
        return level_lists[level].pop();
    };
    
}

exports.backupqueue = new BackupQueue();