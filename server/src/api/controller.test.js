require('dotenv').config();

const app = require('../../app');
const _ = require('underscore');
const fs = require('fs').promises;
const CryptoJS = require('crypto-js');
const crypto = require('crypto');

//https://mochajs.org
//https://www.chaijs.com/guide/styles/#assert
const assert = require('chai').assert;

const request = require('supertest');


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
      
    let hash = res.body.hash;

    assert.isTrue(!_.isUndefined(hash));


    let f = await fs.readFile('./testImage/image.png');

    res = await request(app)
      .get(`/api/file/${hash}`)
      .expect(200);
    
    assert.deepEqual(f, res.body);    
  });

  it('success 2 files', async ()=>{
    let f = await fs.readFile('./testImage/image.png');
    let f2 = await fs.readFile('./testImage/image2.jpg');

    let h1 = crypto.createHash('sha256');
    h1.update(f);
    h1 = h1.digest('hex');


    let h11 = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(f)).toString(CryptoJS.enc.Hex);
    assert.equal(h1, h11);

    let h2 = crypto.createHash('sha256');
    h2.update(f2);
    h2 = h2.digest('hex');

    let res = await request(app)
      .post('/api/file')
      .attach('file', './testImage/image.png')
      .set('Content-Type', 'multipart/form-data;')
      .expect(200);
      
    let hash = res.body.hash;
    assert.equal(hash, h1);

    let res2 = await request(app)
      .post('/api/file')
      .attach('file', './testImage/image2.jpg')
      .set('Content-Type', 'multipart/form-data;')
      .expect(200);
      
    let hash2 = res2.body.hash;
    assert.equal(hash2, h2);


    res = await request(app)
      .get(`/api/file/${hash}`)
      .expect(200);
    
    assert.deepEqual(f, res.body);    


    res = await request(app)
      .get(`/api/file/${hash2}`)
      .expect(200);
    
    assert.deepEqual(f2, res.body);   
  });


});