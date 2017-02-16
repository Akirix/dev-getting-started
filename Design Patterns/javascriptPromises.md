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

Refer to [Mozilla Developer Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for more information. 

#### Why use Promises?

Promises provide a simple alternative for executing, composing, and managing asynchronous operations when compared to traditional callback-based approaches. 
When there are too many callback your code will end up in a callback hell.


#### What is Callback Hell? 

The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom (line by line).
When your code looks like a pyramid on its side, that is essentially call back hell. 

Refer to [callbackhell.com](http://callbackhell.com/) for more information. 

#### Callback Hell Example

```javascript

exports.create = function( req, res, next ){

    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } ).then( function( recipe ){
        Ingredients.findAll( {
            where: {
                ingredient: recipe.ingredient
            }
        } ).then( function( ingredients ){
            var cake = {
                ingredients: ingredients,
                flavor: recipe.flavor,
                bake_time: recipe.time
            };

            Cake.create( cake ).then( function( cake ){
                cake.frosting = req.params.cake.frosting;

                cake.save().then( function(){
                    console.log( 'Now time to eat the cake' );
                    res.send( 200, { cake: cake } );
                    return next();
                } ).catch( function( err ){
                    console.log( err );
                    return next();
                } );
            } ).catch( function( err ){
                console.log( err );
                return next();
            } );
        } ).catch( function( err ){
            console.log( err );
            return next();
        } );
    } ).catch( function( err ){
        console.log( err );
        return next();
    } );

};

```

We want to avoid Callback hell by utilizing promises in the correct way. 

#### Callback Written as a Promise

```javascript
exports.create = function( req, res, next ){

    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } )
        .then( function( recipe ){
            return Ingredients.findAll( {
                where: {
                    ingredient: recipe.ingredient
                }
            } );
        } )
        .then( function( ingredients ){
            var cake = {
                ingredients: ingredients,
                flavor: recipe.flavor,
                bake_time: recipe.time
            };
            return Cake.create( cake );
        } )
        .then( function( cake ){
            cake.frosting = req.params.cake.frosting;
            return cake.save();
        } )
        .then( function(){
            console.log( 'Now time to eat the cake' );
            res.send( 200, { cake: cake } );
            return next();
        } )
        .catch( function( err ){
        console.log( err );
        return next();
    } );
};
```


#### How to correctly write a Javascript Promise

You will wrap your code into a new Promise if the returned result is not a promise. If it is a premise you will just return that promise. 

You can use any of these methods to return, resolve, or even reject a promise 
* return Promise.reject(2)
* return 2;
* return new Promise (resolve, reject){ resolve(2)};
 
 .then will ALWAYS return the previous return result. It will not return anything above that return. 

Using .catch is the way to catch errors from a Promise. .catch will only catch the errors that are on the same level as the .then.
If it is outside or nested in another level from the .then you will have to add another catch statement. 

Check out this example of baking a cake.


#### Incorrect Use of .catch  

```javascript
  exports.create = function( req, res, next ){
  
      Recipe.find( {
          where: {
              flavor: req.params.cake.flavor,
              serving_size: req.params.cake.size
          }
      } )
          .then( function( recipe ){
              return Ingredients.findAll( {
                  where: {
                      ingredient: recipe.ingredient
                  }
              } );
          } )
          .then( function( ingredients ){
              var cake = {
                  ingredients: ingredients,
                  flavor: recipe.flavor,
                  bake_time: recipe.time
              };
  
              if( cake.flavor === "Chocolate" ){
  
                  var milk = {
                      type: 1 //whole milk
                  };
  
                  Milk.create( milk ).then( function(){
                      var ice_cream = {
                          flavor: 'vanilla'
                      };
  
                      return IceCream.create( ice_cream );
                  } )
              }
  
              return Cake.create( cake );
          } )
          .then( function( cake ){
              cake.frosting = req.params.cake.frosting;
  
              return cake.save();
          } )
          .then( function(){
              console.log( 'Now time to eat the cake' );
              res.send( 200, { cake: cake } );
              return next();
          } )
          .catch( function( err ){
              console.log( err );
              return next();
          } );
  };
```

You need to add a catch statement onto the promise chain that is within the if statement. See next example.

#### Correct Use of .catch  

```javascript
   exports.create = function( req, res, next ){
   
       Recipe.find( {
           where: {
               flavor: req.params.cake.flavor,
               serving_size: req.params.cake.size
           }
       } )
           .then( function( recipe ){
               return Ingredients.findAll( {
                   where: {
                       ingredient: recipe.ingredient
                   }
               } );
           } )
           .then( function( ingredients ){
               var cake = {
                   ingredients: ingredients,
                   flavor: recipe.flavor,
                   bake_time: recipe.time
               };
   
               if( cake.flavor === "Chocolate" ){
   
                   var milk = {
                       type: 1 //whole milk
                   };
   
                   Milk.create( milk ).then( function(){
                       var ice_cream = {
                           flavor: 'vanilla'
                       };
   
                       return IceCream.create( ice_cream );
                   } ).catch( function( err ){
                       console.log( err );
                       return next();
                   } )
               }
   
               return Cake.create( cake );
           } )
           .then( function( cake ){
               cake.frosting = req.params.cake.frosting;
   
               return cake.save();
           } )
           .then( function(){
               console.log( 'Now time to eat the cake' );
               res.send( 200, { cake: cake } );
               return next();
           } )
           .catch( function( err ){
               console.log( err );
               return next();
           } );
   };
```

#### Terminating a Promise Early

Looking back to the original baking a cake function, what if there are no ingredients, then what should the program do. 
You would want the program to terminate early because it does not have the necessary ingredients to bake the cake. 
Here is an example of how one would handle that case. 

```javascript
exports.create = function( req, res, next ){

    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } )
        .then( function( recipe ){
            return Ingredients.findAll( {
                where: {
                    ingredient: recipe.ingredient
                }
            } );
        } )
        .then( function( ingredients ){
            if( ingredients ){
                return this.bakeCake( ingredients )
            }
            else{
                return ingredients
            }
        } )
        .catch( function( err ){
            console.log( err );
            return next();
        } );

};

exports.bakeCake = function( ingredients ){
    var cake = {
        ingredients: ingredients,
        flavor: recipe.flavor,
        bake_time: recipe.time
    };
    Cake.create( cake )
        .then( function( cake ){
            cake.frosting = req.params.cake.frosting;
            return cake.save();
        } )
        .then( function(){
            console.log( 'Now time to eat the cake' );
            res.send( 200, { cake: cake } );
            return next();
        } )
        .catch( function( err ){
            console.log( err );
            return next();
        } );

};

```



