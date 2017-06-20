-----------------------------------------------------------------
# Akirix Logging Standards _(draft)_
-----------------------------------------------------------------
## Contents
  - [General Potential Properties](#general-potential-properties)
  - [Debug Log Structure](#debug-log-structure)
  - [Info Log Structure](#info-log-structure)
  - [Warning Log Structure](#warning-log-structure)
  - [Error Log Structure](#error-log-structure)
  - [Critical Log Structure](#critical-log-structure)
  - [Security Log Structure](#security-log-structure)
-----------------------------------------------------------------


### General Potential Properties
| Property      | Data-Type     |
| ------------- |:-------------:|
| timestamp   | datetime in utc |
| level       | string (lowercase)          |
| endpoint    | string          |
| callStack    | string          |
| message    | string          |
| httpMethod    | string          |
| ip    | string          |
| user    | object, (no restriction on values)          |
| records    | array of objects          |
| data    | object, (no restriction on values)        |
| file    | string          |
| function    | string          |
| id    | string          |
  

### Debug Log Structure
  _General Ideas:_ 
> Debug is to better provide the team of developers information.
> Debug is utilized to hold detailed records of decissions and data.
> Debug's connotation is usually a **neutral** one, while debug may be used in conjuction with other logs; the general premise is neutral.
> Debug is not intended to be used in production, unless it is needed for one reason or another, then - at that point it will be turned on.

  _Logged File Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "debug",
    "message": "Querying for account"
    "records": null,
    "data": {
      "account": {
        "model": "Account",
        "model_id": "12456-7890-abcde-fghij"
      }
    },
    "file": "controllers/accounts.js",
    "function": "view( req, res, next )",
    "id": "012345679abcdefghijk"
  }
```
  
### Info Log Structure 
  _General Ideas:_ 
> Info is to better provide the team successful actions/operations.
> Info is leveraged for general records, **good-to-know** actions/operations.

 _Logged File Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "info",
    "message": "Successful query for account"
    "records": [
      {
        "id": "123432-kfsja-293dk-23jkla",
        "currency_id": "USD",
        "name": "Awesome USD Account",
        "type": 0,
        "status": 1
      }
    ],
    "data": {
      "account": {
        "model": "Account",
        "model_id": "12456-7890-abcde-fghij"
      }
    },
    "user": {
      "email": "sweetemailaddy@gmail.com",
      "company_id": "09876-a4b3-cd21e",
      "id": "1034-cdeb-32as-g922a"
    },
    "file": "controllers/accounts.js",
    "function": "view( req, res, next )",
    "id": "012345679abcdefghijk"
  }
```

### Warning Log Structure 
  _General Ideas:_ 
  
> Warn is basically items that should have attention payed to.
> Warn is used for 4XX (*400 errors*), items/operations on their way to a 'threshold', and potentially anything else that may need attention before something mayhaps hit a critical state.

 _Logged File Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "warn",
    "message": "Can not find Uber Document"
    "records": null,
    "data": {
      "uberDocument": {
        "id": "98765-7890-edcba-fghij"
      }
    },
    "user": {
      "email": "uberuser@akirix.com",
      "id": "4321-cdeb-32as-f922b"
    },
    "file": "controllers/uber_documents.js",
    "function": "view( req, res, next )",
    "id": "987654321abcdefghijk"
  }
```

### Error Log Structure 
  _General Ideas:_ 
  
> Error is to represent errors within our code/operations/services.
> Error should be used for 5XX (*500 errors*).
> Error should return as much info as possible.

 _Logged File Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "error",
    "endpoint": "/fees/:fee_id",
    "httpMethod": "PUT",
    "message": "uncaughtException: Validation of Fee failed, Wire must have a default value",
    "records": null,
    "data": {
      "fee": {
        "id": "zxkv-39ls-40ef-g234",
        "company_id": "09876-a4b3-cd21e",
        "fee_data": {
            "invoice": {
              "in": 0.0025,
              "out": 0.0025
            },
            "loan": 0.0025,
            "book_transfer": 0.01,
            "wire": {
              "USD": {
                  "default": {
                      "speedwire": 20,
                      "in_ach": 25,
                      "out_ach": 30,
                      "in_wire": 25,
                      "in_percent": 0,
                      "out_wire": 30,
                      "out_percent": 0
                  }
              },
              "GBP": {
                  "default": {
                      "speedwire": 15,
                      "in_ach": 27,
                      "out_ach": 31,
                      "in_wire": 27,
                      "in_percent": 0,
                      "out_wire": 31,
                      "out_percent": 0
                  }
              },
              "EUR": {
                  "default": {
                      "speedwire": 15,
                      "in_ach": 31,
                      "out_ach": 36,
                      "in_wire": 31,
                      "in_percent": 0,
                      "out_wire": 36,
                      "out_percent": 0
                  }
              }
    },
    "fx": {
        "0": 0.015,
        "50001": 0.012,
        "100001": 0.01
        }
      }
    }
    },
    "callStack": [
       "File: /Users/yourusername/Dev/uber-api/lib/akx.util.js:27",
      "Error at Object.exports.log (/Users/yourusername/Dev/uber-api/lib/akx.logger.js:186:23)",
      "at Object.exports.error (/Users/yourusername/Dev/uber-api/lib/akx.logger.js:246:11)",
      "at Object.exports.handleError (/Users/yourusername/Dev/uber-api/lib/akx.util.js:27:12)",
      "at Object.<anonymous> (/Users/yourusername/Dev/uber-api/controllers/fees.js:117:17)",
      "at Object.<anonymous> (/Users/yourusername/Dev/uber-api/models_uber/fee.js:233:29)",
      "at tryCatch1 (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/util.js:64:19)",
      "at Promise$_callHandler [as _callHandler] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:708:13)",
      "at Promise$_settlePromiseFromHandler [as _settlePromiseFromHandler] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:724:18)",
      "at Promise$_settlePromiseAt [as _settlePromiseAt] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:896:14)",
      "at Promise$_rejectPromises [as _rejectPromises] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:1033:14)",
      "at Async$_consumeFunctionBuffer [as _consumeFunctionBuffer] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/async.js:64:12)",
      "at Async$consumeFunctionBuffer (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/async.js:37:14)",
      "at nextTickCallbackWith0Args (node.js:489:9)",
      "at process._tickDomainCallback (node.js:459:13)"
    ],
    "ip": "75.148.97.234",
    "user": {
      "email": "uberuser@akirix.com",
      "id": "4321-cdeb-32as-f922b"
    },
    "file": "controllers/fees.js",
    "function": "update( req, res, next )",
    "id": "239248asdkj23912"
  }
```



### Critical Log Structure 
  _General Ideas:_ 
  
> Critical is used to represent vitally important issues.
> This could be things like maybe a save on a database failed.
> Critical should return as much info as possible.

 _Logged File Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "critical",
    "endpoint": "/institutionUsers",
    "httpMethod": "POST",
    "message": "Critical: Failed To Save Record",
    "records": null,
    "data": {
      "institutionUser":{
        "email":"personawesomeemail@company.com",
        "first_name":"PersonFirstName",
        "last_name":"PersonLastName",
        "company_id":"33bf6590-d59d-11e3-a0a6-5317e33d8803",
        "phone_mobile":"8018675309",
        "status":null
      }
    },
    "callStack": [
      "File: /Users/yourusername/Dev/uber-api/lib/akx.util.js:27",
      "Error at Object.exports.log (/Users/yourusername/Dev/uber-api/lib/akx.logger.js:186:23)",
      "at Object.exports.critical (/Users/yourusername/Dev/uber-api/lib/akx.logger.js:246:11)",
      "at Object.exports.handleError (/Users/yourusername/Dev/uber-api/lib/akx.util.js:27:12)",
      "at Object.exports.handleError (/Users/yourusername/Dev/uber-api/controllers/institution_users.js:62:10)",
      "at /Users/yourusername/Dev/uber-api/controllers/institution_users.js:490:19",
      "at tryCatch1 (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/util.js:64:19)",
      "at Promise$_callHandler [as _callHandler] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:708:13)",
      "at Promise$_settlePromiseFromHandler [as _settlePromiseFromHandler] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:724:18)",
      "at Promise$_settlePromiseAt [as _settlePromiseAt] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:896:14)",
      "at Promise$_rejectPromises [as _rejectPromises] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/promise.js:1033:14)",
      "at Async$_consumeFunctionBuffer [as _consumeFunctionBuffer] (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/async.js:64:12)",
      "at Async$consumeFunctionBuffer (/Users/yourusername/Dev/uber-api/node_modules/sequelize/node_modules/bluebird/js/main/async.js:37:14)",
      "at nextTickCallbackWith0Args (node.js:489:9)",
      "at process._tickDomainCallback (node.js:459:13)"
    ],
    "ip": "75.148.97.234",
    "user": {
      "email": "uberuser@akirix.com",
      "id": "4321-cdeb-32as-f922b"
    },
    "file": "controllers/institution_users.js",
    "function": "create( req, res, next )",
    "id": "b932dk9234920ka12"
  }
```


### Security Log Structure 
