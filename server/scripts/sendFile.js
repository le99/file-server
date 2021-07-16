const axios = require('axios');
const fsPromises = require('fs').promises;
var FormData = require('form-data');


(async () => {

  let f = await fsPromises.readFile('./testImage/image.png');
  try{

    let data = new FormData();

    data.append( 'file', f, {
      contentType: 'img/png',
      name: 'file',
      filename: 'image.png',
    });

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
    if(err.response){
      console.log(err.response.data);
    }
    else{
      console.log(err.message);
    }
  }
  

})();