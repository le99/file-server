import React, { useState, useEffect, useRef } from 'react';
import _ from 'underscore';
import axios from 'axios';
import CryptoJS from 'crypto-js';
// var FormData = require('form-data');

function Home(){

  let [message, setMessage] = useState('-');
  let [file, setFile] = useState(null);

  let [hash, setHash] = useState(null);
  async function onClick(){
    // let res = await axios.get('/api');
    // setMessage(JSON.stringify(res.data));


    if(file){
      var reader = new FileReader();
      reader.onload = function(event) {
        var binary = event.target.result;
        console.log(typeof binary);
        var md5 = CryptoJS.SHA256(binary).toString();
        console.log(md5);
      };
      // reader.readAsBinaryString(file);
      reader.readAsArrayBuffer(file);

      var form = new FormData();
      form.append('file', file, file.name);

      // console.log(form.getHeaders());
      let res = await axios.post( '/api/file',
        form,
        {
          headers: {'Content-Type': 'multipart/form-data;'}
        }
      )
      setHash(res.data.hash);
    }
    
  }

  function onChangeFile(e){
    setFile(e.target.files[0]);
  }



  return (
    <div>
      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg"
        onChange={onChangeFile}
      >
      </input>

      <hr />
      <button onClick={() => onClick()}>
        Upload Image
      </button>


      <hr />

      {message}

    
      {hash && 
      <React.Fragment>
        <p>
          {hash}
        </p>

        <hr />

        <img src={`/api/file/${hash}`} width={300}></img>
      </React.Fragment>
      }

      
    </div>
  );
}

export default Home;