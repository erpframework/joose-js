Joose provides a standard role to build singletons. Just use `does: [Joose.Singleton]` in a class definition to declare your class to be a singleton. Your class will receive a clas method `getInstance()` that returns the instance. You will no longer be able to create instances with the new operator.

## Example ##

```
    Class("MySingleton", {
        does: [Joose.Singleton],
    
        has: {
            test: {
                init: function () { return [] }
            }
        }
    })

    var single = MySingleton.getInstance();
```