const mongoose = require('mongoose')

const FolderSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studysets: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'StudySet',
    }
  ],
  userId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
		required: true
	}
})

const Folder = module.exports = mongoose.model('Folder', FolderSchema)

module.exports.getFolderByUserId = function(userId){
	const query = {userId: userId}
	return Folder.find(query)
  .populate('userId')
}
