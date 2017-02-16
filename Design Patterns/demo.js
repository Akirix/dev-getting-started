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
        } ).catch( function( err ){
        console.log( err );
        return next();
    } );
};


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