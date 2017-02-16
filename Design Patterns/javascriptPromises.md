# Design Patterns

## Javascript Promises

#### What is a Javascript Promise?

A promise is a representation of the result to an asynchronous operation. It acts as a placeholder until there is a successful or failed result. 

A promise has three different states:

* pending - The initial state of a promise.
* fulfilled - The state of a promise representing a successful operation.
* rejected - The state of a promise representing a failed operation.

Once a promise is fulfilled or rejected, it is immutable (i.e. it can never change again).

#### Why use Promises?

Promises provide a simple alternative for executing, composing, and managing asynchronous operations when compared to traditional callback-based approaches. 
When there are too many callback your code will end up in a callback hell.


#### What is Callback Hell? 

The cause of callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom (line by line).
When your code looks like a pyramid on its side, that is essentially call back hell. 

#### Example of callback hell

```language-javascript
   Here is the code example
```

We want to avoid Callback hell by utilizing promises in the correct way. 

#### How to correctly write a Javascript Promise

* Using a catch for errors
* When do you wrap in a "New Promise"?
* is the return value a promise?
* resolve/reject and return 
* then() without return 







#### Example of correct Javascript promises 

```language-javascript
   Here is the code example
```