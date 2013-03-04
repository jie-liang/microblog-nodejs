/*
 * GET home page.
 */
var Blog = require('../models/blog.js');

exports.index = function(req, res){
	Blog.get(null, function (err, posts) {
		if(err) {
			posts=[];
		}
		res.render('index', {
	  	title: 'Homepage' ,
	  	user: req.session.user,
	  	posts: posts,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
  	});
	});

};