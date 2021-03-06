const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	StudySet = require('../models/study-set');


//POST A NEW STUDY SET (WITH THE MODEL IN THE REQUEST IN THE BODY)
router.post('/create', (req, res, next) => {
	let newStudySet = new StudySet({
		title: req.body.title,
		cards: req.body.cards,
		userId: req.body.userId,
		password: req.body.password,
		description: req.body.description,
		visibility: req.body.visibility,
		privileges: req.body.privileges,
		id: req.body.id
	});

	StudySet.addStudySet(newStudySet)
		.then(response => {
			res.json({
				success: true,
				msg: 'created',
				studyset: response
			})
		})
		.catch(err => {
			res.json({
				success: false,
				msg: 'Failed to create'
			})
		})
});

//good
//GET A STUDY SET BY IT'S NAME (IN THE REQUEST BODY)
router.post('/studyset', (req, res, next) => {
	const title = req.body.title;
	StudySet.getStudySetByTitle(title)
		.then(studyset => {
			if (!studyset) {
				return res.json({
					success: false,
					msg: 'Study set not found'
				})
			} else {
				res.json({
					success: true,
					studyset: studyset
				})
			}
		})
		.catch(err => {
			next(err)
		})
})

router.get('/:userId', (req, res, next) => {
	const userId = req.params.userId;
	StudySet.getStudySetByOwner(userId)
		.then(studyset => {
			if (!studyset) {
				return res.json({
					success: false,
					msg: 'Study set not found'
				})
			} else {
				res.json({success: true, studyset: studyset})
			}
		})
		.catch(err => {
			next(err)
		})
})

router.get('/studySetId/:studySetId', (req, res, next) => {
	console.log("At correct endpoint")
	const studySetId = req.params.studySetId;
	StudySet.getStudySetById(studySetId)
		.then(studyset => {
			if (!studyset) {
				return res.json({
					success: false,
					msg: 'Study set not found'
				})
			} else {
				console.log(studyset)
				res.json({
					success: true,
					msg: 'Study set Found',
					studyset: studyset
				})
			}
		})
		.catch(err => {
			next(err)
		})
})

router.put('/update', (req, res, next) => {
	const studySetId = req.body.id
	const update = req.body
	StudySet.updateStudySet(studySetId, update)
	.then(studyset => {
		if (!studyset) {
			res.json({msg: "Study set not found"})
		} else {
			res.json({msg: "Study set updated", studyset: studyset})
		}
	})
	.catch(err => {

	})
})
router.get('/all/:searchTerm', (req, res, next) => {
	StudySet.find({$text: {$search : req.params.searchTerm}})
	.then(studyset => {
		if(!studyset) {
			return res.json({success: false, msg: 'Study set not found'})
		} else {
			res.json({success: true, studyset: studyset})
		}
	})
	.catch(err => {
		next(err)
	})
})

router.get('/:userId/:searchTerm', (req, res, next) => {
	StudySet.find({userId: req.params.userId, $text: {$search : req.params.searchTerm}})
	  .then(studyset => {
			if(!studyset){
				return res.json({success: false, msg: 'Study set not found'})
			} else {
				res.json({success: true, studyset: studyset})
			}
		})
		.catch(err => {
			next(err)
		})
})






router.delete('/:studySetId/delete', (req, res, next) => {
	const studySetId = req.params.studySetId;
	StudySet.deleteStudySet(studySetId)
	.then(result => {
		res.json({
			success: true,
			msg: 'Study set deleted'
		})
	})
	.catch(err => {
		res.status(500).json(err)
	})
})

router.get('/', (req, res, next) => {
	StudySet.getAllStudySets()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(err => {
		res.status(500).json(err)
	})
})


router.put('/newtitle/:studySetId', (req, res, next) => {
	const studySetId = req.params.studySetId;
	const newTitle = req.body.title
	StudySet.updateStudySetTitle(studySetId, newTitle)
		.then(studyset => {
			if (!studyset) {
				return res.json({
					success: false,
					msg: 'Study set not found'
				})
			} else {
				res.json({
					success: true,
					msg: 'Study set updated'
				})
			}
		})
		.catch(err => {
			next(err)
		})
})


router.get('/', (req, res, next) => {
	StudySet.getAllStudySets()
		.then(response => {
			res.status(200).json(response)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})
	//good
router.get('/:userId', (req, res, next) => {
	const userId = req.params.userId;
	StudySet.getStudySetByOwner(userId)
		.then(studyset => {
			if (!studyset) {
				return res.json({
					success: false,
					msg: 'Study set not found'
				})
			} else {
				res.json({
					success: true,
					studyset: studyset
				})
			}
		})
		.catch(err => {
			next(err)
		})
})



module.exports = router;
