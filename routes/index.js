
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index');
};

exports.view = function(req, res) {
    res.render('view');
};

exports.submit = function(req, res) {
    res.render('submit');
};