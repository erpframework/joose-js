Joose uses some of the same global function names that are also used by Prototype and Mootools.
Thus when you use these libraries you need to use different names for the Joose functions.

Instead of writing
```
Class("MyClass", {
   methods: {
      test: function () {}
   }
})

```

prefix the the Class-function name with Joose like this:

```
JooseClass("MyClass", {
   methods: {
      test: function () {}
   }
})
```