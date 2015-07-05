# Synopsis #
```
// Create a class called Point
Class("Point", {
    has: {
        x: {
            is:   "rw",
            init: 0
        },
        y: {
            is:   "rw",
            init: 0
        }
    },
    methods: {
        clear: function () {
            this.setX(0);
            this.setY(0);
        }
    }
})

// Use the class
var point = new Point();
point.setX(10)
point.setY(20);
point.clear();
```

# Class(name, properties) #

The global function **Class(name, properties)** creates a class with the given name. The class is initialized using the properties:
  * isa: Inherits from a super class
  * does: Applies roles to the class
  * has: Creates attributes
  * methods: Creates instance methods
  * classMethods: Creates class methods
  * method-modifiers: before, after, around, override, augment

## Class Initialization Properties ##

### isa ###

Using the isa-keyword you can inherit from other classes:
```
Class("Car", {
    isa: Vehicle
})
```

In the above example Car will inherit all methods and attributes from the class Vehicle.

There is currently no easy way to do multiple inheritance and MI is not officially supported. If you want to shoot yourself in the foot, please use the meta programming interface :)

### does ###

Using the does-keyword you can apply roles (which are sometimes also called traits and which do something similar to mixins) to the class:
```
Class("Integer", {
    does: Comparable
})
```
You may apply multiple roles to the class by passing an array of roles.

See also: [Building a Role](BuildingARole.md)

### has ###

Using the has-keyword, you can add attributes to your class. Joose supports very powerful attribute features, by using attribute properties. The basic attribute properties are:
  * is: tells Joose whether the attribute is writable
  * init: provides an initialization value

```
Class("TestClass", {
    has: {
        foo: {
            is:   "rw",
            init: 0
        },
        bar: {
            is:   "ro",
            init: 0
        }
    }
}
```

By declaring an attribute as "rw" (short for read/write) you tell Joose to generate getter and setter methods for you. For the above example, there will be called:
  * getFoo()
  * setFoo()
  * getBar()

There is no setBar, because bar was declared as "ro" for read-only.

### methods ###

Using the methods-keyword you may add instance methods to your class.

```
    methods: {
        clear: function () {
            this.setX(0);
            this.setY(0);
        },
        stringify: function () {
            return ""+this.getX()+","+this.getY()
        }
    }
```

This will add the methods clear() and stringify() to your class. If you provide your own stringify method, you objects will stringify to its return value.

### classMethods (Static Methods) ###

The classMethods-keywords works similar to the methods keyword, but you will be able to call the methods on the class instead of the instance.
```
    classMethods: {
        makeNew: function () {
            return new Point()
        }
    }
```

This will add the method makeNew to the Point class object and lets you call `Point.makeNew()` to make new points.

### Method Modifiers ###

Method modifiers allow wrapping of already defined methods. See for example [CookbookRecipe2](CookbookRecipe2.md)

For more detailed info see [Method Modifiers](MethodModifiers.md)

#### before ####

Methods declared as "before" will be called before the overridden method. The return value will be discarded.

```
    before: {
        add: function () { this.result += "3" }
    }
```

#### after ####

Methods declared as "after" will be called after the overridden method. The return value will be discarded.

#### around ####

Methods declared as around will receive the overridden method as the first parameter.

#### override ####

The override method modifier is very powerful because it allows overiding of methods of super classes with the ability to call the method of the super class by calling `this.SUPER()`. This is otherwise not easily possible in JavaScript.

```
    override: {
        one: function () { 
            this.result1 += "2"
            this.SUPER();
        },
        two: function () { 
            this.result2 += "2"
            this.SUPER();
        }
    }
```

#### augment ####

The augment method modifier is like override but the other way around. The most-super method will be called first, but it can call method of the sub class using ` this.INNER() `. For an example, see CookbookRecipe7.

## Special Methods ##

### stringify ###

Joose objects stringify to "a ClassName" where ClassName is the name of the class of the object. In order to override this behavior, implement a method called ` stringify ` that returns a string. It is advised not to override the default ` toString ` method directly because there are issues in some JavaScript engines.


### initialize ###

Joose will automatically add an initialize method for your class, that allows initialization of new instance like this:
` var point = new Point({ x: 10, y: 10 }) `

You may add your own custom initialize method to a class to override this behavior. In order to provide your own behavior upon object creation while still keeping the default initialization in place, it can be very helpful to use define an [after-method modifier](http://code.google.com/p/joose-js/wiki/MethodModifiers#after) for the initialize method.