# Design Patterns

## Javascript Promises

#### What is a Javascript Promise?

A promise is a representation of the result to an asynchronous operation. It acts as a placeholder until there is a successful or failed result. 

A promise has three different states:

* pending - The initial state of a promise.
* fulfilled - The state of a promise representing a successful operation.
* rejected - The state of a promise representing a failed operation.

Once a promise is fulfilled or rejected, it is immutable (i.e. it can never change again).

Using .then is a promise as well as calling new Promise.

#### Why use Promises?

Promises provide a simple alternative for executing, composing, and managing asynchronous operations when compared to traditional callback-based approaches. 
When there are too many callback your code will end up in a callback hell.


#### What is Callback Hell? 

The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom (line by line).
When your code looks like a pyramid on its side, that is essentially call back hell. 

#### Example of callback hell

```language-javascript
function buildHouse(){
    var foundation = 'Concrete';
    var frame = 'Frame';
    var roof = 'Shingles';
    var walls = 'Sheet and paint';
    var doorsAndWindows = 'Doors and Windows';
    
    console.log( 'Need to pour foundation first' );
    foundation.save().then( function(){
        console.log( 'Next, its needs framing' );
        frame.save().then( function(){
            console.log( 'Needs a roof' );
            roof.save().then( function(){
                console.log( 'Finish up the insides with the walls' );
                walls.save().then( function(){
                    console.log( 'And at last put in the windows and doors' );
                    doorsAndWindows.save().then( function(){
                        console.log( 'The house has been built' );
                    } )
                } )
            } )
        } )
    } )
}
```

We want to avoid Callback hell by utilizing promises in the correct way. 

#### How to correctly write a Javascript Promise

Using .catch is the way to catch erros from a Promise. .catch will only catch the errors that are on the same level as the .then.
If it is outside or nested in another level from the .then you will have to add another catch statement. 

You will wrap your code into a new Promise if the result is not a promise. If it is a premise you will just return that promise. 

You can use any of these methods to return, resolve, or even reject a promise 

* return Promise.rejct(2)
* return 2;
* return new Promise (resolve, reject){ resolve(2)};


 
 .then will ALWAYS return the previous return result. It will not return anything above that return. 


#### Example of correct Javascript promises 

```language-javascript
   exports.test = function( req, res, next ){
       var errors = [];
       Promise.resolve().then( function(){
           console.log( 0 );
       } ).then( function(){
           console.log( 1 );
           return next();
       } ).then( function(){
           console.log( 2 );
           throw 'things';
       } ).then( function(){
           console.log( 3 );
       } ).then( function(){
           console.log( 4 );
       } ).catch( function( err ){
           console.log( err );
           res.send( 200, {} );
           return next();
       } );
   };
```