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
| stack    | string          |
| message    | string          |
| httpMethod    | string          |
| ip    | string          |
| user    | object, (no restriction on values)          |
| records    | array of objects          |
| data    | object, (no restriction on values)        |
| file    | string          |
| function    | string          |
|  requestID   | string          |
  

### Debug Log Structure
  _General Ideas:_ 
> Debug is to better provide the team of developers information.
> Debug is utilized to hold detailed records of decissions and data.
> Debug's connotation is usually a **neutral** one, while debug may be used in conjuction with other logs; the general premise is neutral.
> Debug is not intended to be used in production, unless it is needed for one reason or another, then - at that point it will be turned on.

  _ELK Stack Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "debug",
    "message": "Debug: Querying for account"
    "records": null,
    "data": {
      "account": {
        "model": "Account",
        "model_id": "12456-7890-abcde-fghij"
      }
    },
    "file": "controllers/accounts.js",
    "function": "view( req, res, next )",
    "requestID": "012345679abcdefghijk"
  }
```
  
### Info Log Structure 
  _General Ideas:_ 
> Info is to better provide the team successful actions/operations.
> Info is leveraged for general records, **good-to-know** actions/operations.

 _ELK Stack Example Content:_
  
```
{
  "_index": "testing_2017.07.11",
  "_type": "json",
  "_id": "AV0zxs15SNZ4X5a0vK1S",
  "_version": 1,
  "_score": null,
  "_source": {
    "records": [],
    "level": "info",
    "label": "test",
    "message": " token 8d57dae0-6688-11e7-9793-37d1f5f3d702 was deleted",
    "httpMethod": "POST",
    "type": "json",
    "endPoint": "/tokens/revoke",
    "@timestamp": "2017-07-11T22:30:53.000Z",
    "file": "tokens.js",
    "port": 60145,
    "requestID": "9ebdbab9-47e4-41e5-98d5-a88436d9243e",
    "@version": "1",
    "host": "127.0.0.1",
    "user": "{\"id\":\"dd3bd782-3909-11e4-aec5-42fe33057e69\",\"email\":\"pink@akxdev.com\",\"company_id\":\"f74057d8-3905-11e4-aec5-42fe33057e69\",\"access\":{\"GET /info/status\":true,\"GET /info/now\":true,\"GET /info/permissions\":true,\"POST /utilities/sendInvite\":true,\"POST /tokens\":true,\"DELETE /tokens\":true,\"POST /tokens/renew\":true,\"GET /tokens/two_factor\":true,\"GET /announcements\":true,\"GET /currencies\":true,\"GET /currencies/:currency_id\":true,\"GET /fxRequests\":true,\"GET /fxRequests/:fx_request_id\":true,\"POST /accounts/:account_id/transfer\":true,\"PUT /accounts/:account_id\":true,\"GET /accounts\":true,\"GET /accounts/:account_id\":true,\"GET /accounts/:account_id/download\":true,\"GET /accountAliases\":true,\"GET /users/:user_id\":true,\"PUT /users/:user_id\":true,\"POST /users/forgot\":true,\"POST /users/password_reset\":true,\"GET /userSettings\":true,\"GET /userSettings/:user_setting_id\":true,\"PUT /userSettings/:user_setting_id\":true,\"GET /companies\":true,\"GET /companies/:company_id\":true,\"PUT /companies/:company_id\":true,\"GET /investors/:company_id\":true,\"POST /projects\":true,\"GET /projects\":true,\"GET /projects/:project_id\":true,\"POST /projects/:project_id/add_buyer\":true,\"POST /projects/:project_id/add_supplier\":true,\"GET /commissions\":true,\"GET /commissions/:commission_id\":true,\"GET /commissionPayments\":true,\"GET /commissionPayments/:commission_payment_id\":true,\"GET /commissionPaymentItems\":true,\"GET /commissionPaymentItems/:commission_payment_item_id\":true,\"POST /nodes\":true,\"GET /nodes\":true,\"GET /nodes/:node_id\":true,\"GET /nodes/:node_id/can_invoice\":true,\"POST /nodes/:node_id/point_funds\":true,\"POST /nodes/:node_id/return_funds\":true,\"PUT /nodes/:node_id\":true,\"POST /nodes/:node_id/accept\":true,\"POST /nodes/:node_id/decline\":true,\"GET /nodeItems\":true,\"POST /nodeItems\":true,\"GET /nodeItems/:node_item_id\":true,\"PUT /nodeItems/:node_item_id\":true,\"POST /invoices\":true,\"GET /invoices\":true,\"GET /invoices/:invoice_id\":true,\"GET /invoices/external/:invoice_id\":true,\"GET /invoices/:invoice_id/can_create_child\":true,\"PUT /invoices/:invoice_id\":true,\"DELETE /invoices/:invoice_id\":true,\"POST /invoices/:invoice_id/activate\":true,\"POST /invoices/:invoice_id/recall\":true,\"POST /invoices/:invoice_id/markPaid\":true,\"POST /invoices/:invoice_id/pay\":true,\"GET /invoices/:invoice_id/pdf\":true,\"GET /invoiceItems\":true,\"POST /invoiceItems\":true,\"PUT /invoiceItems/:invoice_item_id\":true,\"DELETE /invoiceItems/:invoice_item_id\":true,\"GET /transactions\":true,\"POST /wires\":true,\"GET /wires\":true,\"POST /wires/sendInstructions\":true,\"GET /wires/:wire_id\":true,\"POST /wires/:wire_id/cancel\":true,\"GET /wires/:wire_id/pdf\":true,\"POST /wireTemplates\":true,\"GET /wireTemplates\":true,\"GET /wireTemplates/:wire_template_id\":true,\"PUT /wireTemplates/:wire_template_id\":true,\"DELETE /wireTemplates/:wire_template_id\":true,\"GET /documents\":true,\"GET /documents/:document_id\":true,\"GET /documents/:document_id/download\":true,\"GET /documents/:document_id/stream\":true,\"POST /documents\":true,\"PUT /documents/:document_id\":true,\"DELETE /documents/:document_id\":true,\"POST /authenticators\":true,\"POST /authenticators/:authenticator_id/activate\":true,\"POST /authenticators/auth\":true,\"POST /authenticators/sms\":true,\"GET /authenticators\":true,\"PUT /authenticators/:authenticator_id\":true,\"DELETE /authenticators/:authenticator_id\":true,\"GET /authenticators/qr\":true,\"POST /funds\":false,\"GET /funds\":false,\"GET /funds/:fund_id\":false,\"PUT /funds/:fund_id\":false,\"POST /funds/:fund_id/add_project\":false,\"POST /funds/:fund_id/remove_project\":false,\"POST /funds/:fund_id/send\":false,\"POST /funds/:fund_id/accept\":false,\"POST /funds/:fund_id/decline\":false,\"POST /funds/:fund_id/withdraw\":false,\"POST /amendments\":true,\"GET /amendments\":true,\"GET /amendments/:amendment_id\":true,\"PUT /amendments/:amendment_id\":true,\"GET /statements\":true,\"GET /statements/:statement_id/download\":true,\"GET /stats/:type\":true,\"GET /tickets\":true,\"POST /tickets\":true,\"GET /tickets/:ticket_id\":true,\"POST /tickets/:ticket_id/close\":true,\"POST /tickets/:ticket_id/open\":true,\"GET /ticketMessages\":true,\"POST /ticketMessages\":true,\"GET /fees\":true,\"GET /infoRequests\":true,\"GET /infoRequests/:info_request_id\":true,\"PUT /infoRequests/:info_request_id\":true,\"POST /tokens/revoke\":true}}"
  },
  "fields": {
    "@timestamp": [
      1499812253000
    ]
  },
  "sort": [
    1499812253000
  ]
}
```

### Warning Log Structure 
  _General Ideas:_ 
  
> Warn is basically items that should have attention payed to.
> Warn is used for 4XX (*400 errors*), items/operations on their way to a 'threshold', and potentially anything else that may need attention before something mayhaps hit a critical state.

 _ELK Stack Example Content:_
  
```
 {
   "_index": "testing_2017.07.11",
   "_type": "json",
   "_id": "AV0zQ2vSSNZ4X5a0vKz-",
   "_version": 1,
   "_score": null,
   "_source": {
     "records": [
       {
         "model": "token",
         "id": "8d1f55d0-6674-11e7-bac7-3f287da0a9ac"
       },
       {
         "model": "user",
         "id": "f3a4347c-7299-11e5-9263-0ad83d26a2e3"
       }
     ],
     "level": "warn",
     "label": "test",
     "httpMethod": "POST",
     "message": "user.access f3a4347c-7299-11e5-9263-0ad83d26a2e3 parsing failed",
     "type": "json",
     "endPoint": "/tokens",
     "@timestamp": "2017-07-11T20:07:22.000Z",
     "file": "tokens.js",
     "port": 52963,
     "requestID": "1c630ec7-e09d-494c-af97-faba7b0da5ae",
     "@version": "1",
     "host": "127.0.0.1",
     "user": "{\"id\":\"f3a4347c-7299-11e5-9263-0ad83d26a2e3\",\"email\":\"userf@akxdev.com\",\"first_name\":\"User\",\"last_name\":\"f\",\"company_id\":\"d010d40c-7299-11e5-9263-0ad83d26a2e3\",\"phone_mobile\":\"5555555555\",\"access\":\"badjsonthing{\\\"dog\\\":\\\"rhodesian ridgeback\\\"}\",\"created_at\":\"2014-06-02T16:11:46.000Z\",\"updated_at\":\"2016-09-02T17:48:36.000Z\",\"status\":1}"
   },
   "fields": {
     "@timestamp": [
       1499803642000
     ]
   },
   "sort": [
     1499803642000
   ]
 }
```

### Error Log Structure 
  _General Ideas:_ 
  
> Error is to represent errors within our code/operations/services.
> Error should be used for 5XX (*500 errors*).
> Error should return as much info as possible.

 _ELK Stack Example Content:_
  
```
 {
   "_index": "testing_2017.07.11",
   "_type": "json",
   "_id": "AV0zxYDYSNZ4X5a0vK1N",
   "_version": 1,
   "_score": null,
   "_source": {
     "data": "pink@akxdev.com",
     "records": [
       {
         "model": "user",
         "email": "pink@akxdev.com"
       }
     ],
     "level": "error",
     "label": "test",
     "message": "user pink@akxdev.com was not found",
     "httpMethod": "POST",
     "type": "json",
     "endPoint": "/tokens",
     "@timestamp": "2017-07-11T22:29:27.000Z",
     "file": "tokens.js",
     "port": 59369,
     "requestID": "cc09f35e-1ecc-4072-b5ba-09811410969f",
     "@version": "1",
     "host": "127.0.0.1"
   },
   "fields": {
     "@timestamp": [
       1499812167000
     ]
   },
   "sort": [
     1499812167000
   ]
 }
```
> OR:
```
{
  "_index": "testing_2017.07.11",
  "_type": "json",
  "_id": "AV0zeGk_SNZ4X5a0vK0i",
  "_version": 1,
  "_score": null,
  "_source": {
    "stack": "SyntaxError: Unexpected token b\n    at Object.parse (native)\n    at Function.<anonymous> (/Users/michael/Dev/api/controllers/tokens.js:271:55)\n    at bound (domain.js:287:14)\n    at Function.runBound (domain.js:300:12)\n    at null.<anonymous> (/Users/michael/Dev/api/node_modules/sequelize/lib/emitters/custom-event-emitter.js:105:15)\n    at emitOne (events.js:77:13)\n    at emit (events.js:169:7)\n    at module.exports.CustomEventEmitter.emit (/Users/michael/Dev/api/node_modules/sequelize/lib/emitters/custom-event-emitter.js:61:33)\n    at null.<anonymous> (/Users/michael/Dev/api/node_modules/sequelize/lib/dao.js:436:25)\n    at Hooks.runHooks (/Users/michael/Dev/api/node_modules/sequelize/lib/hooks.js:41:15)\n    at null.<anonymous> (/Users/michael/Dev/api/node_modules/sequelize/lib/dao.js:432:30)\n    at bound (domain.js:287:14)\n    at runBound (domain.js:300:12)\n    at emitOne (events.js:77:13)\n    at emit (events.js:169:7)\n    at module.exports.CustomEventEmitter.emit (/Users/michael/Dev/api/node_modules/sequelize/lib/emitters/custom-event-emitter.js:61:33)",
    "level": "error",
    "label": "test",
    "message": "SyntaxError: Unexpected token b",
    "httpMethod": "POST",
    "type": "json",
    "endPoint": "/tokens",
    "@timestamp": "2017-07-11T21:05:15.000Z",
    "file": "tokens.js",
    "port": 55095,
    "requestID": "15614c65-873b-4457-a1c7-175afdc9e7a2",
    "@version": "1",
    "host": "127.0.0.1"
  },
  "fields": {
    "@timestamp": [
      1499807115000
    ]
  },
  "sort": [
    1499807115000
  ]
}
```


### Critical Log Structure 
  _General Ideas:_ 
  
> Critical is used to represent vitally important issues.
> This could be things like maybe a save on a database failed.
> Critical should return as much info as possible.

 _ELK Stack Example Content:_
  
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
    "stack": [
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
    "requestID": "b932dk9234920ka12"
  }
```


### Security Log Structure 
  _General Ideas:_ 
  
> Security is it's own entity.
> Security should be treated to try to capture things like potential brute force attemps (like *429 HTTP Responses*).
> Security may and may not be based around a given threshold.  
> Security could be used in conjunction with other logs.
> Security should always have negative connotation associated with it.

 _ELK Stack Example Content:_
  
```
  {
    "timestamp": "2017-06-16 16:13:11",
    "level": "critical",
    "endpoint": "/uberTokens",
    "httpMethod": "POST",
    "message": "Security: Potential brute force",
    "records": null,
    "data": {
      "email":"personawesomeemail@company.com",
      "password": "trying@llP@zz4urds"
    },
    "stack": [
      "Error: Too Many Requests",
      "at Object.exports.AkxRateLimit (/Users/yourusername/Dev/uber-api/config/ratelimit.js:50:9)
    ],
    "ip": "75.148.97.234",
    "user": null,
    "file": "config/ratelimit.js",
    "function": "limitLow( req, res, next )",
    "requestID": "324jkadfj29123k"
  }
```
