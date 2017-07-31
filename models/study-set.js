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
		imageURL: {
			type: String
		},
		id: {
			type: String,
			required: true
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
		type: String,
		required: true
	},
	password: {
		type: String
	},
	visibility: {
		type: String,
		default: 'Everyone'
	},
	privelages: {
		type: String,
		default: 'Just me'
	},
	updated: { type: Date, default: Date.now }
});


const StudySet = module.exports = mongoose.model('StudySet', StudySetSchema);


// deprecated code from old project
// module.exports.getCharacterById = function(id, callback){
// 	User.findById(id, callback);
// }

// module.exports.getCharacterByCharacterName = function(name, callback){
// 	const query = {name: name}
// 	User.findOne(query, callback);
// }

module.exports.getAllStudySets = function (req, res, next) {
		StudySet.find()
	}

module.exports.getStudySetByTitle = function(title, callback){
	const query = {title: title}
	StudySet.findOne(query, callback);
}

module.exports.getStudySetById = function(studySetId, callback){
	const query = {studySetId: studySetId}
	StudySet.findOne(query, callback);
}

module.exports.getStudySetByOwner = function(userId, callback){
	const query = {userId: userId}
	StudySet.find(query, callback);
}
module.exports.addStudySet = function(newStudySet, callback){
			newStudySet.save(callback);
}

module.exports.deleteStudySet = function(studySetId, callback){
	const query = {id: studySetId}
	StudySet.deleteOne(query, callback)
}

module.exports.updateStudySetTitle = function(studySetId, title, callback){
	const query = {studySetId: studySetId}
	const newTitle = {$set: {title: title}}
	StudySet.updateOne(query, newTitle, callback)
}

module.exports.updateStudySet = function(studySetId, obj, callback){
	const filter = {id: studySetId}
	const update = {$set: obj}
	StudySet.updateMany(filter, update, callback)
}


