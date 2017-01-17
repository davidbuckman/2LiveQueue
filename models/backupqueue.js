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
    
    var word_list = require('../resources/wordlist.json');
    
    var level_cutoffs = [0, 0.5, 0.7, 0.85, 0.95, 1];
    
    var get_region = function(level_num) {
        return [Math.round(word_list.length * level_cutoffs[level_num - 1]),
                Math.round(word_list.length * level_cutoffs[level_num])];
    };
    
    // Words are sorted by probability of appearance, so lower probability
    // is higher difficulty
    var level_regions = {
            'level5' : get_region(1),
            'level4' : get_region(2),
            'level3' : get_region(3),
            'level2' : get_region(4),
            'level1' : get_region(5)
    };
    
    var level_lists = {};

    for (var level in level_regions) {
        if (!level_regions.hasOwnProperty(level)) { continue; }
        level_lists[level] = word_list.slice(level_regions[level][0], level_regions[level][1]);
        shuffleArray(level_lists[level]);
    }
    
    this.get_level = function(level) {
        if (level == undefined) { level = 'level1' }
        if (level_lists[level].length == 0) {
            level_lists[level] = word_list.slice(level_regions[level][0], level_regions[level][1]);
            shuffleArray(level_lists[level]);
        }
        return level_lists[level].pop();
    };
    
}

exports.backupqueue = new BackupQueue();