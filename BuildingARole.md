# Synopsis #
```
Role("Comparable", {
    requires: "compare",
    does: Eq,
    
    methods: {
        equalTo:     function (other) { return this.compare(other) == 0 },
        greaterThan: function (other) { return this.compare(other) == 1 },
        lessThan:    function (other) { return this.compare(other) == -1 },
        
        greaterThanOrEqualTo: function (other) {
            return this.greaterThan(other) || this.equalTo(other)
        },
        
        lessThanOrEqualTo: function (other) {
            return this.lessThan(other) || this.equalTo(other)
        }
    }
})

// Using the role
Class("Currency", {
    does: Comparable,
    ... class declaration ...
})

```
# Role(name, properties) #

Roles are units of reusable behavior. You can also think of them as Java-interfaces on steroids. Classes and other roles declare that they implement a role using the does-keyword. When something does a role, it receives all the methods implemented by the class. If the implementing class already has a method of the same name, it will not be overidden.

For more info see CookbookRecipe6.

## requires: methodName or [Array](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array) of methodNames ##

Using the requires-keyword you declare that classes and roles that implement this role, need to provide methods named _methodName_. By passing an array of _methodNames_ to the keyword you can require multiple method names.
```
requires: ["compare", "asNumber"]
```

## methods ##

The declared methods will be exported to all classes implementing this role.

# Caveats #

  * Roles are currently implemented as classes. This will change, so do not rely on it
  * The conflict resolution for method importing is currently very simple: if something is there already, it won't be overridden.