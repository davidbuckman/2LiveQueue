/**
 * http://usejsdoc.org/
 */

var queue = require('../models/queue').queue;
var backupqueue = require('../models/backupqueue').backupqueue;

exports.enqueue = function(req, res) {
    if (req.query.word) {
        queue.enqueue(req.query.word);
        res.send(200);
    } else {
        res.send(400);
    }
};

exports.dequeue = function(req, res) {
    if (!queue.isEmpty()) { res.send(queue.dequeue()); }
    else { res.send(backupqueue.get_level(req.query.level)); }
};