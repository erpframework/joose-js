# Introduction #

Method modifiers are an elegant way to wrap methods in Joose. In class declarations this can be used to override or extend methods defined in a parent class or role.

# Types of Method Modifiers #

There are 5 types of method modifiers:

## before ##

Methods declared as "before" will be called before the overridden method. The return value will be discarded.

```
Class("Test") {
    isa: SuperClass,
    before: {
        add: function () { this.result += "3" }
    }
}
```

## after ##

Methods declared as "after" will be called after the overridden method. The return value will be discarded.

## around ##

Methods declared as around will receive the overridden method as the first parameter.

## override ##

The override method modifier is very powerful because it allows overiding of methods of super classes with the ability to call the method of the super class by calling `this.SUPER()`. This is otherwise not possible in JavaScript.

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

## augment ##

The augment method modifier is like override but the other way around. The most-super method will be called first, but it can call method of the sub class using ` this.INNER() `. For an example, see CookbookRecipe7.

# Applying method modifiers at runtime #

You may also apply new method modifiers after class declaration. Simply call ClassOrObject.meta.wrapMethod(methodName, wrappingStyle, wrapperFunction). This wraps the method called methodName with the wrappingStyle (before, after, around, override or augment) and the function wraperFunction.

# Method modifiers and roles #

Method modifiers may also be used in [roles](Role.md). If you define a method modifier in a role, it will be applied to the class that implements a role.

This can be used to implement a very nice plugin interface. If your class implements a certain set of methods, you may apply as many roles as you want which all augment the class behavior with their method modifiers.


# Examples #

See CookbookRecipe2