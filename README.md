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
- `options.full_document` if true, return full document instead of uuid
- `callback` is optional, this method returns a q promise

```javascript
truevault.documents.list({
  'vault_id':'my-vault-uuid',
  'per_page':50, 
  'page':1, 
  'full_document': false //true to return full documents vs uuids
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
}, function(myCallback, transaction) {
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
- `options.id` document uuid to update
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
- `option.filter` - js object of field filters
- `option.case_sensitive` - true or false
- `option.page` - an integer of the page results you want
- `option.per_page` - an integer of the number of results you want from each page
- `option.filter_type` - a string specifying the filter type
- `option.full_document` - boolean (id vs full obj)
- `option.sort` - An object of field name and sort directions.
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

- retrieve
- create
- update
- delete

### Schemas

- retrive
- create
- update
- delete

## License

MIT
