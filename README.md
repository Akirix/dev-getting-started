# Akirix Developer Getting Started Guide

## Welcome!


## Things You Will Need

These are the basic things you will need. See your supervisor about obtaining the neccesary accounts and licenses.

* A computer (DUH!)
* Akirix E-mail account
* Akirix Git repository account
* [Slack](https://itunes.apple.com/us/app/slack/id803453959?mt=12) account. Download the Slack app from Mac App Store
* [IntelliJ Ultimate](https://www.jetbrains.com/idea/)
* [Tower Git Client](http://www.git-tower.com/)
* [XCode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
* [Node.js](https://nodejs.org)
* [YUIDoc](http://yui.github.io/yuidoc/) Javascript Documentation tool
* [Homebew](http://brew.sh/)


## Things You Should Know

Here are the basics you should already know.

* [SCRUM](https://en.wikipedia.org/wiki/Scrum_(software_development)). The team depends on SCRUM. Get a SCRUM book from your supervisor if you haven't.
* Version control with Git. [Pro Git](https://git-scm.com/book/en/v2) is a free book you can download.
* Understand how package management system works. Such as NPM, Bower, Ruby Gems.
* [Markdown Syntax](https://github.com/gitlabhq/gitlabhq/blob/master/doc/markdown/markdown.md)

## Coding Style
To make your life easier, the coding style settings for IntelliJ can be found under _**Settings/IntelliJ/coding_style.jar**_. You can import the file directly into IntelliJ.
 
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
    } else{
        var j = 0;
        try{
            while( j < 10 ){
                if( i == j || j > 5 ){
                    a[ j ] = i + j * 12;
                }
                i = (j << 2) & 4;
                j++;
            }
            do{
                j--;
            } while( j > 0 )
        } catch( e ){
            alert( "Failure: " + e.message );
        } finally{
            reset( a, i );
        }
    }
}
```
 
## Documentation / Comments

We use [YUIDoc](http://yui.github.io/yuidoc/syntax/index.html) for documentation generation. 

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

## Testing
TBD


