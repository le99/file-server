const express = require('express');
var router = express.Router();

const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

const {
  get,
  post
} = require('./controller');


router.get('/file/:id', get);
router.post('/file', upload.single('file'), post)

router.use('/*', function(req, res){
  res.status(404).json({msg: 'Resource not found'});
});

module.exports = router;

