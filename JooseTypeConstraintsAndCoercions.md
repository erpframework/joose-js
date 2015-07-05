# Introduction #

**This feature was introduced in Joose 2.0**

Joose now includes support for type constraints and coercions for attributes in Joose classes and parameters of methods.

Joose type constraints are only somewhat related to static types in the traditional sense of computer science. They allow the programmer to define a set of contraints which a value that is stored in a variable will have to fulfil. As they apply to values rather than containers these checks are performed at runtime rather than compile time.

Type coercions enable automatic conversion of values to your desired type. Especially JavaScript client side programming deals with a lot of user provided string data that needs to be validated and converted to domain values. With type coercions, once you have defined your types (or the use the built-in types), input validation and conversion is completely transparent to your code.

# Declaration of a Simple Type #

A simple Joose.TypeConstraint is defined like this:

```
Type('MySmallNumber', {
    uses: Joose.Type.Int, // this is a specilization of the Joose.Type.Int Class
    where: function (value) {
        if ( value > 1 && value < 5 ) { // we only accept Ints between 1 and 5
            return true;
        }
        return false;
    }       
});
```

By providing a list of coercions (see the coerce: statement) you can define how values can be converted to your desired type from other (more generic) types. In this example strings are converted to MySmallNumbers. This is a very powerful feature because it saves you from having to worry about data conversion and validation and centralizes these functions.

```
Type('MySmallNumber', {
    uses: Joose.Type.Int, // this is a specilization of the Joose.Type.Int Class
    where: function (value) {
        if ( value > 1 && value < 5 ) { // we only accept Ints between 1 and 5
            return true;
        }
        return false;
    },
    coerce: [{  // optional coercion definition list
                from: Joose.Type.Str, // coercion from string to number
                via: function(str) {
                    return new Number(Str); // perform our coercion
                }
            }]
            
});

```

## Type Properties ##

You can define a type with a property like this:

```
Type('MyPropertyType', {
    uses: [Joose.Type.NotNull],
    message: function(i) {
        return "item: "+i+" is not: "+this.getProps.someProp;
    },
    where: function(i) {
       if (this.getProps().someProp == i)
           return true;
       return false;
    },
    someProp: 'foo'
});
```

Now types that use MyPropertyType in their `uses`-declaration can set their own someProp attribute and change the constraint but inherit the message and constraint checking code. See Joose.Type.Enum and the accompanying tests in [tests/19\_types.t.js](http://code.google.com/p/joose-js/source/browse/trunk/tests/16_types.t.js?r=442) for examples of this.

## Declaring Types inside Modules ##

When you declare a type inside a module it will be put into that module and can be accessed accordingly. For example in the next code block the type `MyTypes.MySmallNumber` is created.

```
Module("MyTypes", function () {
    Type('MySmallNumber', {
        uses: Joose.Type.Int, // this is a specilization of the Joose.Type.Int Class
        where: function (value) {
            if ( value > 1 && value < 5 ) { // we only accept Ints between 1 and 5
                return true;
            }
            return false;
        }       
    });
});
```

# Using Types #

## Types for Attributes ##

You can then use the type constraint in a class like this:

```
Class('MyClass', {
    has: {
        attr1: {
            is: 'rw',                      // TypeConstraints only work for rw attributes
            isa: Joose.Type.MySmallNumber, // use the  MySmallNumber constraint
            coerce: true,                  // turn on coercions for this attribute
            nullable: true                 // This attribute may be set to null
        }
    }
})
```

The MyClass will enforce your constraint in the setter method for attr1 and will coerce strings into MySmallNumbers for you. Because coercions do carry some runtime overhead with them you have to explicitly enable the feature by saying `coerce: true` in the attribute definition.

When calling a setter for a typed attribute like ` setAttr1() ` in the above example, Joose will throw an exception when a invalid value is passed to the setter. This validation is also enforced during initialization ` new MyClass({ attr1: "1" }) `

You may also pass a callback to the setter method as a second parameter that is used as an error handler if you prefer.

When setting the nullable property in the attribute definion null-Values are accepted as values for the attribute.

## Types for Method Parameters ##

You may also declare types for method parameters

```
   // Make a class thats adds to its instance variable "amount"
   Class("Adder", {
       has: {
           amount: { is: "rw" }
       },
       methods: {
           // add is a method with a signature
           add: {
               signature: [Joose.Type.Int], // the first parameter must be an integer
               method:    function add (num) {
                   return num + this.amount // add the argument num to our instance var amount
               },
               coerce:    true // enable coercions for arguments
           }
       }
   })
  
   // Make an adder that always adds 3
   var addTo3 = new Adder({ amount: 3 })
  
   // add 3 to the value of the input field
   alert(addTo3.add(form.addMe.value));
```

In the example above the method `add` is declared to take one parameter of type `Joose.Type.Int`. Coercion is enabled so that strings that look like integers are automatically converted to integers.

You can, of course, add constraints for more parameters by putting extra type declarations into the signature array.

# Default Joose Built-in types #

Joose comes with a set of default types that you can use as is or build you own types off of them.

![http://joose-js.googlecode.com/svn/trunk/doc_images/Joose_Type_Hierarchy.png](http://joose-js.googlecode.com/svn/trunk/doc_images/Joose_Type_Hierarchy.png)
Diagram of the default type hierarchy.

You may also view the [default type source code](http://code.google.com/p/joose-js/source/browse/trunk/lib/Joose/Types.js) as an inspiration for your own types.

## Further Reading ##

  * [Introduction to type constraints and type coercions](http://joose-js.blogspot.com/2009/01/type-contraints-and-type-coercions-in.html)
  * [Typed Method Signatures in Joose/JavaScript (parseInt never again)](http://joose-js.blogspot.com/2009/01/typed-method-signatures-in.html)