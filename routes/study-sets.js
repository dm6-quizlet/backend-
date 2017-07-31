const express = require('express')
,	router = express.Router()
,	passport = require('passport')
,	config = require('../config/database')
,	StudySet = require('../models/study-set');


//POST A NEW STUDY SET (WITH THE MODEL IN THE REQUEST IN THE BODY)
router.post('/create', (req, res, next) => {
	let newStudySet = new StudySet({
		id: req.body.id,
		title: req.body.title,
		cards: req.body.cards,
		userId: req.body.userId,
		password: req.body.password,
		visability: req.body.visability,
		privilages: req.body.privilages,
		updated: req.body.updated
	});

	StudySet.addStudySet(newStudySet, (err, studyset) => {
		if(err){
			res.json({success: false, msg:'Failed to create'})
		} else {
			res.json({success: true, msg:'created'})
		}
	})
});

//good
//GET A STUDY SET BY IT'S NAME (IN THE REQUEST BODY)
router.post('/studyset', (req, res, next) => {
	const title = req.body.title;
	StudySet.getStudySetByTitle(title, (err, studyset) => {
		if(err) throw err;
		if(!studyset){
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, studyset: studyset})
		}
	})
})


//good
router.get('/:userId', (req, res, next) => {
	const userId = req.params.userId;
	StudySet.getStudySetByOwner(userId, (err, studysets) => {
		if(err) throw err;
		if(!studysets){
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, studysets: studysets})
		}

	})
})

//good
router.delete('/:studySetId/delete', (req, res, next) => {
	const studySetId = req.params.studySetId;
	StudySet.deleteStudySet(studySetId, (err, studysets) => {
		if(err) throw err;
		if(!studysets){
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, msg: 'Study set deleted'})
		}

	})
})

router.put('/:studySetId/newtitle', (req, res, next) => {
	const studySetId = req.params.studySetId;
	const newTitle = req.body.title
	StudySet.updateStudySetTitle(studySetId, newTitle,(err, studysets) => {
		if(err) throw err;
		if(!studysets){
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, msg: 'Study set updated'})
		}

	})
})

router.put('/update', (req, res, next) => {
	const studySetId = req.body.id
	const update = req.body
	StudySet.updateStudySet(studySetId, update,(err, studysets) => {
		if(err) throw err;
		if(!studysets){
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, msg: 'Study set updated'})
		}

	})
})



module.exports = router;