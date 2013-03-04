/*
 * GET users listing.
 */
var User = require('../models/user.js');
var Blog = require('../models/blog.js')
var crypto = require('crypto');

exports.user = function(req, res){
  User.get(req.params.user, function (err, user) {
    if(!user) {
      req.flash('error', "user doesn't exist");
      return res.redirect('/');
    }

    Blog.get(user.name, function (err, posts) {
      if(err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('user', {
        title: user.name,
        posts:posts,
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
};

exports.reg = function(req, res){
  res.render('reg', {
    title:'Sign Up',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
    }
  );
};

exports.regPost = function(req, res){
  if (req.body.password_repeat != req.body.password) {
  	req.flash('error', '两次输入的口令不一致');
  	return res.redirect('/reg');
  }

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
  	name: req.body.username,
  	password: password
  });

  User.get(newUser.name, function (err, user) {
    if (user) {
      err = '用户名已存在';
    }
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    newUser.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
};

exports.login = function(req, res){
  res.render('login', {
    title:'Sign In',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
    }
  );
};

exports.loginPost = function(req, res){
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function (err, user) {
    if(!user) {
      req.flash('error', "user doesn't exsit");
      return res.redirect('/login');
    }
    if(user.password != password) {
      req.flash('error', "invalid username or password");
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', 'Welcome');
    res.redirect('/u/' + user.name);
  });
};

exports.logout = function(req, res){
  req.session.user = null;
  req.flash('success', 'Signed out');
  res.redirect('/');
};