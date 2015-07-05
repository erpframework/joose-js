# Source #

```
Class("Point", {
    has: {
        x: {is: "ro"},
        y: {is: "rw"},
    },
    methods: {
        clear: function () {
            this.x = 0;
            this.setY(0);
        }
    }
})

Class("Point3D", {
    isa: Point,
    has: {
        z: {}
    },
    after: {
        clear: function () {
            this.z = 0;
        }
    }
})

var point = new Point3D();
```

# Description #

This is the classic point example. In Joose classes are created using the ` Class() ` function. The function takes two parameters: The class name and the class definition which is passed as an object literal (The stuff between the outermost {}).

Classes are defined using an easy to read and easy to write declarative syntax. Keywords like "has", "methods" and "isa" are used to express the different aspects of the class.

## Attributes ##

```
has: {
	x: {is: ro},
	y: {is: rw},
},
```

The first element of the declaration of the Point class is the has-block which defines two attributes of the Point class: x and y. The block ` x: {is: ro} ` defines x as being read only. ` y: {is: rw} ` defines y as being an read/write attribute. Joose will automatically create a getter ` getX ` for x and a getter and setter ` setY ` for y. The names of the accessor methods are created using the camelCase conventions. The first letter of the attribute name is thus automatically uppercased.

## Methods ##

```
methods: {
	clear: function () {
		this.x = 0;
		this.setY(0);
	}
}
```

The methods-block defines the method clear() for the Point class. Of course, one could put many more methods in the methods-block.
Because y was declared as read/write, we can use the setY method to set the y attribute.

## Inheritance ##

```
isa: Point,
```


The isa-clause in the definition of Point3D defines Point3D as being a sub class of Point.

## A Method Modifier ##

```
after: {
	clear: function () {
		this.z = 0;
	}
}
```

Joose supports so-called method modifiers. _after_ is just one of 5 method modifierst that declare methods with special behavior. The after-modifier defines methods which will be called after methods with the same name which are defined in the super class.

# Credits #

This cookbook entry is based on [Stevan's entry for Moose](http://search.cpan.org/~stevan/Moose-0.40/lib/Moose/Cookbook/Recipe1.pod). Thank you so much!