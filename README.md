# An Unofficial TrueVault API wrapper For Node.js

## Installation

```
npm install truevault
```

## Example Usage

```
var truevault = require('truevault')('your-user-api-key');
```

Each resource call returns a q promise and accepts an optional callback argument:

 ```
 var promise = truevault.documents.retrieve({
    'vault_id' : 'my-vault-uuid',
    'id' : 'my-document-uuid'
 }, function myCallback(err, document){
    //err is null if response is a success
 });

 ```

### Documents

- list
- retrieve
- create
- update
- del
- search

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