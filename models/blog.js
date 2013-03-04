var mongodb = require('./db');

function Blog(username, post, time) {
	this.user = username;
	this.post = post;

	if(time) {
		this.time = time;
	} else {
		this.time = new Date();
	}
};

module.exports = Blog;

Blog.prototype.save = function save (callback) {
	var blog = {
		user: this.user,
		post: this.post,
		time: this.time
	};
	mongodb.open( function (err,db){
		if(err) {
			return callback(err);
		}
		db.collection('blogs', function (err, collection){
			if(err) {
				mongodb.close();
				console.error("get collection error: "+err);
				return callback(err);
			}
			
			collection.ensureIndex('user', function (err, indexName){
				if(err) {
					console.error("ensureIndex: "+err);
					mongodb.close();
					return callback(err);
				}
				collection.insert(blog, {safe: true}, function (err, blog){
					mongodb.close();
					callback(err, blog);
				});
			});
		});
	});
};

Blog.get = function get (username, callback) {
	mongodb.open( function (err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('blogs', function (err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			var query = {};
			if (username) {
				query.user = username;
			}

			collection.find(query).sort({time: -1}).toArray(function (err, docs) {
				mongodb.close();
				if(err) {
					callback(err);
				}

				var blogs = [];
				docs.forEach(function (doc, index){
					var blog = new Blog(doc.user, doc.post, doc.time);
					blogs.push(blog);
				});
				callback(null, blogs);
			});
		});
	});
};