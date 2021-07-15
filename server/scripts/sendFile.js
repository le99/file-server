const axios = require('axios');
const fsPromises = require('fs').promises;

const fs = require('fs');

const { Readable } = require('stream');
var FormData = require('form-data');

const {Duplex} = require('stream'); // Native Node Module 

function bufferToStream(myBuuffer) {
  let tmp = new Duplex();
  tmp.push(myBuuffer);
  tmp.push(null);
  return tmp;
}

(async () => {

  let f = await fsPromises.readFile('./testImage/image.png');
  let s = fs.createReadStream('./testImage/image.png');
  try{

    let data = new FormData();

    data.append( 'file', s );

    let headers = {
      ...data.getHeaders(),
    };
    console.log(headers);


    let r = await axios.post(
      `http://localhost:3001/api/file`, 
      data,
      {
        headers
      }
    );
  
    // console.log(r.data);
    console.log('OK');
  }
  catch(err){
    console.log(err.response.data);
  }
  

})();