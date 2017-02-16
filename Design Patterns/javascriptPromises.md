# Design Patterns

## Javascript Promises

#### What is Callback Hell? 

The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom (line by line).
When your code looks like a pyramid on its side, that is essentially call back hell. 

Refer to [callbackhell.com](http://callbackhell.com/) for more information. 

#### Callback Hell Example

```javascript
exports.create = function( req, res, next ){

    var foundRecipe;
    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } ).then( function( recipe ){
        foundRecipe = recipe;
        Ingredients.findAll( {
            where: {
                ingredient: foundRecipe.ingredient
            }
        } ).then( function( ingredients ){
            var cake = {
                ingredients: ingredients,
                flavor: foundRecipe.flavor,
                bake_time: foundRecipe.time
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

    var foundRecipe;

    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } )
        .then( function( recipe ){
            foundRecipe = recipe;
            return Ingredients.findAll( {
                where: {
                    ingredient: foundRecipe.ingredient
                }
            } );
        } )
        .then( function( ingredients ){
            var cake = {
                ingredients: ingredients,
                flavor: foundRecipe.flavor,
                bake_time: foundRecipe.time
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
  
From this you can see that a recipe variable is initialized before any of the promises return. That is so the recipe that is found can be used in 
promises that are further down the promises chain from where it was initially found. 
  
#### How to Use .catch Correctly 

Using .catch is a way to catch errors from a Promise. .catch will only catch the errors that are on the same level as the .then.
If it is outside or nested in another level from the .then you will have to add another catch statement. 

Check out this example of baking a cake.


#### Incorrect Use of .catch  

```javascript
  exports.create = function( req, res, next ){
  
      var foundRecipe;
  
      Recipe.find( {
          where: {
              flavor: req.params.cake.flavor,
              serving_size: req.params.cake.size
          }
      } )
          .then( function( recipe ){
              foundRecipe = recipe;
              return Ingredients.findAll( {
                  where: {
                      ingredient: foundRecipe.ingredient
                  }
              } );
          } )
          .then( function( ingredients ){
              var cake = {
                  ingredients: ingredients,
                  flavor: foundRecipe.flavor,
                  bake_time: foundRecipe.time
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
   
       var foundRecipe;
       ;
   
       Recipe.find( {
           where: {
               flavor: req.params.cake.flavor,
               serving_size: req.params.cake.size
           }
       } )
           .then( function( recipe ){
               foundRecipe = recipe;
               return Ingredients.findAll( {
                   where: {
                       ingredient: foundRecipe.ingredient
                   }
               } );
           } )
           .then( function( ingredients ){
               var cake = {
                   ingredients: ingredients,
                   flavor: foundRecipe.flavor,
                   bake_time: foundRecipe.time
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

Looking back to the original baking a cake function, what if there are no ingredients, then what should the program do?
 
 
 ```javascript
 exports.create = function( req, res, next ){
 
     var foundRecipe;
     Recipe.find( {
         where: {
             flavor: req.params.cake.flavor,
             serving_size: req.params.cake.size
         }
     } )
         .then( function( recipe ){
             foundRecipe = recipe;
             return Ingredients.findAll( {
                 where: {
                     ingredient: foundRecipe.ingredient
                 }
             } );
         } )
         .then( function( ingredients ){
             var cake = {
                 ingredients: ingredients,
                 flavor: foundRecipe.flavor,
                 bake_time: foundRecipe.time
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

 
 
You would want the program to terminate early because it does not have the necessary ingredients to bake the cake. 
Here is an example of how one would handle that case. 




```javascript
exports.create = function( req, res, next ){

    var foundRecipe;
    Recipe.find( {
        where: {
            flavor: req.params.cake.flavor,
            serving_size: req.params.cake.size
        }
    } )
        .then( function( recipe ){
            foundRecipe = recipe
            return Ingredients.findAll( {
                where: {
                    ingredient: foundRecipe.ingredient
                }
            } );
        } )
        .then( function( ingredients ){
            if( ingredients ){
                return this.bakeCake( foundRecipe, ingredients )
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
exports.bakeCake = function( recipe, ingredients ){
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



