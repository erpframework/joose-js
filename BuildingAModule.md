# Synopsis #

```
Module("com.test.module", function (m) {
    Class("Test", {
        methods: { world: function () { return "hello" } }
    });
    Class("Test2", {
        methods: { world: function () { return "hello" } }
    })
})
```

# Module(name, function) #

The global Module-function makes creating namespaces for your classes, roles and prototypes very easy.

The module will automatically create the namespace called _name_. The classes that are created within the function that is passed to the Module function, will be automatically put into the namespace of the module.

In the above example the class "Test" will be globally known under the name `com.test.module.Test`. This reduces the risk of name conflicts.