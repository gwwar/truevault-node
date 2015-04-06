# TrueVault Client Library

## Installation

```
npm install truevault
```

## Example Usage

Require truevault:

```javascript
var truevault = require('truevault')('your-user-api-key');
```

Each resource call returns a q promise and accepts an optional callback argument:

```javascript
 truevault.documents.retrieve({
    'vault_id' : 'my-vault-uuid',
    'id' : 'my-document-uuid'
 }, function myCallback(err, document){
    //err is null if response is a success
 });
```
Or with a promise:
```javascript
 truevault.documents.retrieve({
    'vault_id' : 'my-vault-uuid',
    'id' : 'my-document-uuid'
 }).then(function(document){
  //success!
 }, function(err){
  //error!
 });
```

### Documents

#### list(options,callback) - Returns a list of documents
- `options.vault_id` vault uuid
- `options.per_page` items per page
- `options.page` page to return
- `options.full` if true, return full document instead of uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.list({
  'vault_id':'my-vault-uuid',
  'per_page':50, 
  'page':1, 
  'full': false //true to return full documents vs uuids
}, function myCallback(err, document){
    //err is null if response is a success
});
```
#### retrieve(options,callback) - returns a document (js obj)
- `options.vault_id` vault uuid
- `options.id` document uuid, or array of document uuids
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.retrieve({
   'vault_id' : 'my-vault-uuid',
   'id' : 'my-document-uuid'
}, function myCallback(err, document){
   //err is null if response is a success
});
```

#### create(options,callback) - creates a document
- `options.vault_id` vault uuid
- `options.schema_id` schema uuid to index against (optional)
- `options.document` a js obj
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.create({
  'vault_id':'my-vault-uuid',
  'schema_id' : 'my-schema-uuid',
  'document' : {
    'Hello' : 'World'
  }
}, function(err, transaction) {
  //err is null if response is a success
});
```

#### update(options,callback) - updates a document
- `options.vault_id` vault uuid
- `options.schema_id` schema uuid to index against (optional)
- `options.id` document uuid to update
- `options.document` a js obj
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.update({
  'vault_id':'my-vault-uuid',
  'id':'my-document-uuid',
  'document' : {'changed':'wow!'}
},function(err, value) {
  //err is null if response is a success

});
```

#### del(options,callback) - deletes a document
- `options.vault_id` vault uuid
- `options.id` document uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.del({
  'vault_id':'my-vault-uuid',
  'id':'my-document-uuid'
},function(err, value) {
  //err is null if response is a success
});
```

#### search(options,callback) - searches for documents
- `options.vault_id` vault uuid
- `options.schema_id` schema uuid to search against (optional)
- `options.filter` - js object of field filters
- `options.case_sensitive` - true or false
- `options.page` - an integer of the page results you want
- `options.per_page` - an integer of the number of results you want from each page
- `options.filter_type` - a string specifying the filter type
- `options.full_document` - boolean (id vs full obj)
- `options.sort` - An object of field name and sort directions.
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.search({
  'vault_id' : 'my-vault-uuid',
  'schema_id' : 'my-schema-uuid',
  'filter' : { 'first': {
      "type": "wildcard",
      "value": "Hello"
    }
}
}, function(err, value) {
  //err is null if response is a success
});
```

### Blobs

#### retrieve(options,callback) - retrieves a blob
- `options.vault_id` vault uuid
- `options.id` blob uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.blobs.retrieve({
  'vault_id' : 'my-vault-uuid',
  'id' : 'my-blob-uuid'
}, function(err, value) {
   //err is null if response is a success
});
```

#### create(options,callback) - creates a blob
- `options.vault_id` vault uuid
- `options.blob` a Buffer or String
- `callback` is optional, this method returns a q promise

```javascript
 truevault.blobs.create({
   'vault_id' : 'my-vault-uuid',
   'blob' : myBuffer
 }, function(err, value) {
   //err is null if response is a success
 });
```

#### update(options,callback) - updates a blob
- `options.vault_id` vault uuid
- `options.id` blob uuid to update
- `options.blob` Buffer or String
- `callback` is optional, this method returns a q promise

```javascript
truevault.blobs.update({
  'vault_id' : 'my-vault-uuid',
  'id' : 'my-blob-uuid',
  'blob' : myBuffer
}, function(err, value) {
   //err is null if response is a success
});
```

#### del(options,callback) - deletes a blob
- `options.vault_id` vault uuid
- `options.id` blob uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.blobs.del({
  'vault_id' : 'my-vault-uuid',
  'id' : 'my-blob-uuid'
}, function(err, value) {
   //err is null if response is a success
});
```

### Schemas

#### list(options,callback) - lists all schemas
- `options.vault_id` vault uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.schemas.list({
  'vault_id' : 'my-vault-uuid'
}, function(err, value) {
   //err is null if response is a success
});
```

#### listDocuments(options,callback) - Returns a list of documents for schema
- `options.vault_id` vault uuid
- `options.id` schema uuid
- `options.per_page` items per page
- `options.page` page to return
- `options.full` if true, return full document instead of uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.listDocuments({
  'vault_id':'my-vault-uuid',
  'id':'my-schema-uuid',
  'per_page':50,
  'page':1,
  'full': false //true to return full documents vs uuids
}, function myCallback(err, document){
    //err is null if response is a success
});
```

#### retrieve(options,callback) - retrieves a schema
- `options.vault_id` vault uuid
- `options.id` schema uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.schemas.retrieve({
  'vault_id':'my-vault-uuid',
  'id':'my-schema-uuid'
},function(err, value) {
   //err is null if response is a success
});
```

#### create(options,callback) - creates a schema
- `options.vault_id` vault uuid
- `options.schema` js obj
- `callback` is optional, this method returns a q promise

```javascript
truevault.schemas.create({
  'vault_id':'my-vault-uuid',
  'schema' : {
    "name":"test",
    "fields":[
      {
        "name":"first",
        "index":true,
        "type" : "string"
      }
    ]
  }
},function(err, value) {
   //err is null if response is a success
});
```

#### update(options,callback) - updates a schema
- `options.vault_id` vault uuid
- `options.id` schema uuid to update
- `options.schema` a js obj
- `callback` is optional, this method returns a q promise

```javascript
truevault.schemas.update({
  'vault_id':'my-vault-uuid',
  'id' : "my-schema-uuid"
  'schema' : {
    "name":"test",
    "fields":[
      {
        "name":"first",
        "index":true,
        "type" : "string"
      }
    ]
  }
},function(err, value) {
   //err is null if response is a success
});
```

#### del(options,callback) - deletes a schema
- `options.vault_id` vault uuid
- `options.id` schema uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.schemas.del({
    'vault_id':'my-vault-uuid',
    'id':'my-schema-uuid'
}, function(err, value) {
   //err is null if response is a success
});
```

### Users

#### create(userParams, callback) - creates a user
- `userParams.username` string(req’d) - username for the User being created
- `userParams.password` string(req’d) - password for the User being created
- `userParams.attributes` b64 string(optional) - base64 encoded JSON document describing the User attributes
- `userParams.schema_id` uuid(optional) - UUID of the Schema to associate the attributes Document with

```javascript
truevault.users.create({
    username: 'username',
    password: 'password'
}).then(function(res) {
   // do something with response
});
```
## License

MIT
