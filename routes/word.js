/**
 * http://usejsdoc.org/
 */

var queue = require('../models/queue').queue;

exports.enqueue = function(req, res) {
    if (req.query.word) {
        queue.enqueue(req.query.word);
        res.send(200);
    } else {
        res.send(400);
    }
};

exports.dequeue = function(req, res) {
    res.send(queue.dequeue());
};