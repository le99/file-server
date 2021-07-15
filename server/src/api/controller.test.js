require('dotenv').config();

const app = require('../../app');
const _ = require('underscore');
const fs = require('fs').promises;

//https://mochajs.org
//https://www.chaijs.com/guide/styles/#assert
const assert = require('chai').assert;

const request = require('supertest');
const { default: axios } = require('axios');


describe('/file POST', ()=>{

  before(async () => {
  });

  after(async () => {
  });

  it('success', async ()=>{
    let res = await request(app)
      .post('/api/file')
      .attach('file', './testImage/image.png')
      .set('Content-Type', 'multipart/form-data;')
      .expect(200);
      
    let id = res.body.id

    assert.isTrue(!_.isUndefined(id));


    let f = await fs.readFile('./testImage/image.png');

    res = await request(app)
      .get(`/api/file/${id}`)
      .expect(200);
    
    assert.deepEqual(f, res.body);    
  });

});