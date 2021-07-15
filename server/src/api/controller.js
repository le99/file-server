const _ = require('underscore');

const CryptoJS = require('crypto-js');
const fs = require('fs').promises;
const path = require('path');
const FILE_DIR = './files';

module.exports.get = async function(req, res) {
  const id = req.params.id;
  res.sendFile(path.join(__dirname, '..', '..', FILE_DIR, id));
  // res.set('Content-Type', 'image/png');
};


module.exports.post = async function(req, res) {
  const file = req.file; 
  if(!file){
    return res.status(400).json({msg:"no file"});
  }
  try{
    let md5 = CryptoJS.SHA256(file.buffer).toString();
    await fs.writeFile(path.join(FILE_DIR, md5), file.buffer);
    res.json({id: md5});
  }
  catch(err){
    return res.status(500).json(err);
  }
};