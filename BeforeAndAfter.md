# Introduction #

This page
  * shows you how to transform standard JavaScript code into Joose (very helpful if you already know JavaScript
  * shows how Joose code can be more concise and readable

# A Point class #

A simple class with two attributes (x and y) using the namespace Test

## Before Joose ##
```
if(Test == null) {
    Test = {};
}

Test.StandardPoint = function (x, y) {
    this.x = x || 0
    this.y = y || 0
}

Test.StandardPoint.prototype = {
    getX: function () {
        return this.x
    },
    setX: function (x) {
        this.x = x
    },
    getY: function () {
        return this.y
    },
    setY: function (y) {
        this.y = y;
    },
    clear: function () {
        this.setX(0)
        this.setY(0)
    }
}
```

## After Joose ##
```
Module("Test", function (m) {
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
})
```

# A 3D Point Class #

Make a sub class of your point classes and add the attribute z for the third dimension.

## Before Joose ##
```
// We need a utility function to do the inheritance
function inherit(superClass, subClass) {
    for(var i in superClass.prototype) {
        subClass.prototype[i] = superClass.prototype[i]
    }
}

Test.StandardPoint3D = function (x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
}

// Make Test.Standard the super class of Test.StandardPoint3D
inherit(Test.StandardPoint, Test.StandardPoint3D)

// we cant assign a new prototype because we already have the one from the super
Test.StandardPoint3D.prototype.getZ = function () {
    return this.z
}

Test.StandardPoint3D.prototype.setZ = function (z) {
    this.z = z;
}

var superMethod = Test.StandardPoint3D.prototype.clear;
Test.StandardPoint3D.prototype.clear = function () {
    superMethod.apply(this);
    this.z = 0;
}
```

## After Joose ##
```
Module("Test", function (m) {
    Class("Point3D", {
        isa: m.Point,
        has: {
            z: {
                is: "rw",
                init: 0
            }
        },
        after: {
            clear: function () {
                this.setZ(0)
            }
        }
    })
})
```

To learn more about Joose, we recommend reading the [cookbook](CookbookRecipe1.md)