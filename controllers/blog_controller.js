var User = require('../models/user.js');
var Blog = require('../models/blog.js');
var crypto = require('crypto');

exports.blogPost = function(req, res){
  var currentUser = req.session.user;
  var blog = new Blog(currentUser.name, req.body.post);

  blog.save( function (err) {
  	if(err) {
      console.error("error on saving: ");
      console.error(err);
  		req.flash('error', err);
  	} else {
      req.flash('success', 'Posted');
    }
  	res.redirect('/u/' + currentUser.name);
  } );
};