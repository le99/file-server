import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import axios from 'axios';

function Home(){

  let [message, setMessage] = useState('-');

  async function onClick(){
    let res = await axios.get('/api');
    setMessage(JSON.stringify(res.data));
  }

  return (
    <div>
      Hello
      <button onClick={() => onClick()}>
        API
      </button>

      {message}
    </div>
  );
}

export default Home;