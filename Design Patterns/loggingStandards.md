-----------------------------------------------------------------
# Akirix Logging Standards (draft)
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


### Warning Log Structure 



### Error Log Structure 




### Critical Log Structure 



### Security Log Structure 
