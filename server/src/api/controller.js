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
  try{

    let hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(file.buffer));
    hash = hash.toString(CryptoJS.enc.Hex);
    await fs.writeFile(path.join(FILE_DIR, hash), file.buffer);
    res.json({hash});
  }
  catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
};