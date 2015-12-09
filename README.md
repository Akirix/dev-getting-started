![Akirix.com](https://raw.githubusercontent.com/Akirix/dev-getting-started/master/assets/img/logo-gradient-sm.png)

# Developer Getting Started Guide

## Welcome!

Welcome to Akirix! We are excited to have you aboard. So now you have gotten all the paperwork taken care of, let's get down to business. This guide is here to help you get started as a developer so you can quickly integrate into our development team.

Before we get into the details, a few things you should keep in mind about Akirix:

* We want rock stars, what's more important to us is a great team.   
* Your ideas are valuable. There are no dumb questions or suggestions. Just speak up.
* Do make mistakes. The fear of making mistakes kills creativity.

## Things You Will Need

These are the basic things you will need. See your supervisor about obtaining the neccesary accounts and licenses.

* A Mac
* Akirix E-mail account
* Akirix Git repository account
* [Slack](https://itunes.apple.com/us/app/slack/id803453959?mt=12). Download the app and ask your supervisor for an invite.
* [IntelliJ Ultimate 14](https://download.jetbrains.com/idea/ideaIU-14.1.5.dmg)
* [Tower Git Client](http://www.git-tower.com/)
* [XCode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)


## Things You Should Know

Here are the basics you should already know.

* [SCRUM](https://en.wikipedia.org/wiki/Scrum_(software_development)). The team depends on SCRUM to get things done. Get a copy of the SCRUM book from your supervisor if you have not yet got one.
* Version control with Git. [Pro Git](https://git-scm.com/book/en/v2) is a free book you can download.
* Understand [REST API](http://www.restapitutorial.com/)
* Understand how package management system works. Such as NPM, Bower, Ruby Gems.
* [Markdown Syntax](https://guides.github.com/features/mastering-markdown/)
* [YUIDoc](http://yui.github.io/yuidoc/)
* [APIDoc](http://apidocjs.com/)

## SCRUM & Development Cycle

* Sprint lenght is 2 weeks
* Thursday Code Review
* Friday Retrospective


## Coding Style
To make your life easier, the coding style settings for IntelliJ can be found under _**settings/IntelliJ/coding_style.jar**_. You can import the file directly into IntelliJ.
 
Below is an example Javascript snippet of the style:
  
```javascript
function foo( x, y, z ){
    bar( 1, b );
    var i = 0;
    var x = { 0: "zero", 1: "one" };
    var a = [ 0, 1, 2 ];
    var foo = function(){
    }
    if( !i > 10 ){
        for( var j = 0; j < 10; j++ ){
            switch( j ){
                case 0:
                    value = "zero";
                    break;
                case 1:
                    value = "one";
                    break;
            }
            var c = j > 5 ? "GT 5" : "LE 5";
        }
    } 
    else{
        var j = 0;
        try{
            while( j < 10 ){
                if( i == j || j > 5 ){
                    a[ j ] = i + j * 12;
                }
                i = ( j << 2 ) & 4;
                j++;
            }
            do{
                j--;
            } while( j > 0 )
        } 
        catch( e ){
            alert( "Failure: " + e.message );
        } 
        finally{
            reset( a, i );
        }
    }
}
```
 
## Documentation / Comments

We use [YUIDoc](http://yui.github.io/yuidoc/syntax/index.html) and [APIDoc](http://apidocjs.com/) for documentation generation. 

### YUIDoc

Things to keep in mind when writing YUIDocs:

* Think from the perspective of a newly hired Akirix developer who is trying to learn our program.
* Focus on how things work under the hood
  
Each source file should have the following comments if applicable:

* Overall description of the file
* @module
* @class
* @property
* @method for each method

Each method should have the following tags and comments

* What it does
* How to use it
* Example usage if needed
* @param
* @return

Below is an example fo a well documented source file:

```javascript
/**
@module ember
@submodule ember-templates
*/

import shouldDisplay from 'ember-views/streams/should_display';
import decodeEachKey from 'ember-htmlbars/utils/decode-each-key';

/**
  The {{#each}} helper loops over elements in a collection. It is an extension
  of the base Handlebars {{#each}} helper.
  The default behavior of {{#each}} is to yield its inner block once for every
  item in an array.
  javascript
  var developers = [{name: 'Yehuda'},{name: 'Tom'}, {name: 'Paul'}];
  
  handlebars
  {{#each developers key="name" as |person|}}
    {{person.name}}
    {{! this is whatever it was outside the #each }}
  {{/each}}
  
  The same rules apply to arrays of primitives.
  javascript
  var developerNames = ['Yehuda', 'Tom', 'Paul']
  
  handlebars
  {{#each developerNames key="@index" as |name|}}
    {{name}}
  {{/each}}
  
  Specifying Keys
  The key option is used to tell Ember how to determine if the array being
  iterated over with {{#each}} has changed between renders. By helping Ember
  detect that some elements in the array are the same, DOM elements can be
  re-used, significantly improving rendering speed.
  For example, here's the {{#each}} helper with its key set to id:
  handlebars
  {{#each model key="id" as |item|}}
  {{/each}}
  
  When this {{#each}} re-renders, Ember will match up the previously rendered
  items (and reorder the generated DOM elements) based on each item's id
  property.
  By default the item's own reference is used.
  {{else}} condition
  {{#each}} can have a matching {{else}}. The contents of this block will render
  if the collection is empty.
  handlebars
  {{#each developers as |person|}}
    {{person.name}}
  {{else}}
    <p>Sorry, nobody is available for this task.</p>
  {{/each}}
  
  @method each
  @for Ember.Templates.helpers
  @public
*/

export default function eachHelper(params, hash, blocks) {
  var list = params[0];
  var keyPath = hash.key;

  if (shouldDisplay(list)) {
    forEach(list, (item, i) => {
      var key = decodeEachKey(item, keyPath, i);

      blocks.template.yieldItem(key, [item, i]);
    });
  } else if (blocks.inverse.yield) {
    blocks.inverse.yield();
  }
}

function forEach(iterable, cb) {
  return iterable.forEach ? iterable.forEach(cb) : Array.prototype.forEach.call(iterable, cb);
}
```

### APIDoc

APIDoc is used to generate public API documentations. Things to keep in mind while writing API docs:

* Think from the perspective of someone who does not work for Akirix but wants to utilize our public API.
* What are the input parameters? What are required and what are optional?
* What are the outputs? 
* What are the possible HTTP Status codes?
* What are the error messages may be returned?
* Give some examples if necessary


**@api**
For the description part, things should follow the examples below. Description is based on the HTTP method and the endpoints.

```
POST /users          -> @api {post} /users Create a user
GET /users           -> @api {get} /users Retrieve all users
GET /users/:user_id  -> @api {get} /users/: user_id Retrieve a user
PUT /users/:user_id  -> @api {put} /users/: user_id Update a user
DEL /users/:user_id  -> @api {del} /users/:user_id Delete a user
```

Although above rule will cover most of the API calls, but not all. In other cases, use a short description. For example:

```
GET /accounts/:account_id/download   -> Download Account transactions
POST /invoices/:invoice_id/markPaid    -> Mark invoice paid
```

**@apiName**
It's derived directly from function names. Example:

```
accounts.js/exports.index -> @apiName AccountsIndex
documents.js/exports.checkPermissions -> @apiName DocumentsCheckPermissions
```

**@apiParam**
There are two types of parameters can be submitted in a request: query params and request body params. Make sure you cover both types.

For example. The user_id below is a query param while the entire JSON payload is the request body param.

```javascript
POST /users/:user_id 
{
     first_name: XXX
     last_name: XXXX
     email: XXXX
}
```

