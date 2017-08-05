const mongoose = require('mongoose')
, config = require('../config/database');

const CardSchema = mongoose.Schema({
		term: {
			type: String,
			required: true
		},
		definition: {
			type: String,
			required: true
		},
		image_url: {
			type: String
		},
		id: {
			type: String
		}


})

// User Schema
const StudySetSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	cards: [CardSchema],
	userId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
		// type: String,
		required: true
	},
	password: {
		type: String
	},
	visibility: {
		type: String,
		default: 'Everyone'
	},
	privileges: {
		type: String,
		default: 'Just me'
	},
	updated: { type: Date, default: Date.now },
	created: { type: Date, default: Date.now },
	description: {
		type: String,
		// required: true
	},
	// subject: {
	// 	type: String
	// },
	image_url: {
		type: String,
		default: "https://farm4.staticflickr.com/3019/2580344111_c467711ec3.jpg"
	}


});


const StudySet = module.exports = mongoose.model('StudySet', StudySetSchema);

module.exports.getAllStudySets = function (req, res, next) {
		return StudySet.aggregate([{$sample: {size: 8}}])
		.then(results => {
			console.log(results)
			return Promise.all(results.map(result => {
				return StudySet.findById(result._id).populate('userId')
			}))
		})
	}

module.exports.getStudySetByTitle = function(title){
	const query = {title: title}
	return StudySet.findOne(query)
	.populate('userId');
}

module.exports.getStudySetById = function(studySetId){
	return StudySet.findById(studySetId)
	.populate('userId');
}

module.exports.getStudySetByOwner = function(userId){
	const query = {userId: userId}
	return StudySet.find(query)
	.populate('userId');
}
module.exports.addStudySet = function(newStudySet){
	return newStudySet.save();
}

module.exports.deleteStudySet = function(studySetId){
	return StudySet.findByIdAndRemove(studySetId)
}

//Trying to get a study set by it's unique id
module.exports.findStudySet = function(studySetId){
	return StudySet.find({id:studySetId})
}

module.exports.updateStudySetTitle = function(studySetId, title){
	const newTitle = {$set: {title: title}}
	return StudySet.findByIdAndUpdate(studySetId, newTitle, {new: true})
}

module.exports.updateStudySet = function(studySetId, obj){
	const update = {$set: obj}
	return StudySet.findByIdAndUpdate(studySetId, update, {new: true})
}
