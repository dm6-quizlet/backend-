const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Folder = require('../models/Folder');

router.get('/:userId', (req, res, next) => {
  Folder.getFolderByUserId(req.params.userId)
  .then(folders => {
    if (!folders) {
      return res.status(200).json([])
    }
    res.send(folders)
  })
})

router.post('/:userId', (req, res, next) =>{
  req.body.userId = req.params.userId
  const newFolder = new Folder(req.body)
  newFolder.save()
  .then(response => {
    res.send(response)
  })
})

router.put('/:userId/:folderId/:setId' ,(req, res, next) =>{
  Folder.findOneAndUpdate({_id: req.params.folderId, userId: req.params.userId}, {$addToSet: {studysets: req.params.setId}}, {new: true})
  .then(response => {
    res.send(response)
  })
})

module.exports = router
