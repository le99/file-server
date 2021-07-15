# File Server

Stores files on disk saves them only based on their SHA256 hash

```js
//POST
var form = new FormData();
form.append('file', file, file.name);
let res = await axios.post( '/api/file',
  form,
  {
    headers: {'Content-Type': 'multipart/form-data;'}
  }
)

//GET
axios.get(`/api/file/${res.body.id}`);
```