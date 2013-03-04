/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./controllers')
  , user = require('./controllers/user_controller')
  , blog = require('./controllers/blog_controller')
  , http = require('http')
  , path = require('path')
  , engine = require('ejs-locals')
  , MongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash');
var settings = require('./settings');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(flash());
  app.use(express.session({
    secret: settings.cookieSecret,
    store: new MongoStore({
      db: settings.db
    })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.engine('ejs', engine);

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/blogPost', checkLogin);
app.post('/blogPost', blog.blogPost);
app.get('/u/:user', user.user);
app.get('/reg', checkNotLogin);
app.get('/reg', user.reg);
app.post('/reg', checkNotLogin);
app.post('/reg', user.regPost);
app.get('/login', checkNotLogin);
app.get('/login', user.login);
app.post('/login', checkNotLogin);
app.post('/login', user.loginPost);
app.get('/logout', checkLogin);
app.get('/logout', user.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function checkLogin (req, res, next) {
  if(!req.session.user) {
    req.flash('error', 'Please sign in to continue');
    return res.redirect('/login');
  }
  next();
}

function checkNotLogin (req, res, next) {
  if(req.session.user) {
    req.flash('error', 'You have already signed in');
    return res.redirect('/');
  }
  next();
}

module.exports = app;