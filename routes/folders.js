const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const Folder = require('../models/Folder');

function isAuthorized(req, res, next) {
  if (!req.session || !req.session.user) {
    return next("Unauthorized")
  }
  return next()
}

router.get('/', isAuthorized, (req, res, next) => {
  Folder.getFolderByUserId(req.session.user._id)
  .then(folders => {
    if (!folders) {
      return res.status(200).json([])
    }
    res.send(folders)
  })
})

router.post('/', isAuthorized, (req, res, next) =>{
  req.body.userId = req.session.user._id
  const newFolder = new Folder(req.body)
  newFolder.save()
  .then(response => {
    res.send(response)
  })
})

router.put('/:folderId/:setId', isAuthorized ,(req, res, next) =>{
  Folder.findByIdAndUpdate(req.params.folderId, {$addToSet: {studysets: req.params.setId}}, {new: true})
  .then(response => {
    res.send(response)
  })
})

module.exports = router
