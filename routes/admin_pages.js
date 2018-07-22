var express = require('express');
var router = express.Router();
var Page = require('../models/page');

router.get('/', function(req, res) {
	res.send('admin area working!');
});

router.get('/add-page', function(req, res) {
	var title = '';
	var slug = '';
	var content = '';
	res.render('admin/add-page', {
		title: title,
		slug: slug,
		content: content
	});
});

router.post('/add-page', function(req, res) {
	var title = req.body.title;
	var slug = req.body.slug.replace(/\s+/g, '-');
	if (slug == '') slug = title.replace(/\s+/g, '-').toLowerCase();
	var content = req.body.content;

	Page.findOne({ slug: slug }, function(err, page) {
		if (page) {
			req.flash('danger', 'Already Exists, Please try Another');
			res.redirect('back');
		} else {
			var page = new Page({
				title: title,
				slug: slug,
				content: content,
				sorting: 0
			});

			page.save(function(err) {
				if (err) return err;

				req.flash('success', 'Added Successfully!');
				res.redirect('/admin/pages');
			});
		}
	});
});

module.exports = router;
