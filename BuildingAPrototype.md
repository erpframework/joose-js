# Synopsis #

```
Prototype("Proto", {
    methods: {
        one: function () { return 1 }
    }
})
```

# Prototype(name, properties) #

The global Prototype-function is Joose's facility for prototype-based object-oriented programming. It supports the same features as the [Class-builder](BuildingAClass.md) with one important difference:

All instances of the prototype get their own meta-object. That means, when you manipulate an instance of a prototype using the meta interface, these changes will only effect that very instance.

When you instantiate the manipulated prototype ` var proto2 = new proto1.constructor() `, the new prototype-instance will receive all the changes, though.

The creation of the instance-meta-object is done lazily, so you only pay a performance price when you actually do meta programming.