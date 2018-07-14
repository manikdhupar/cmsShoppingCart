var mongoose = require('mongoose');

// Page Schema
var PageSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String
	},
	content: {
		type: String,
		required: true
	},
	sorting: {
		type: Number
	}
});

var Page = mongoose.model('Page', PageSchema);

module.exports = Page;
