# Introduction #

Joose allows easy probing, introspection and extention of classes and their objects.

All Joose objects have a property called meta that can be used to access the object's meta object. Classes and their instances share the same meta object and thus have the same meta interface. All method's decribed on this page may be called on the meta object of classes and instances. Unless you use [Prototypes](BuildingAPrototype.md) they will always affect the class as well as all instances.


---


# Probing #

## Method: can(methodName) ##

Returns true if there is an instance method called _methodName_

```
// Query whether a instances of MyClass could execute a method called methodName
MyClass.meta.can(methodName)
// Query whether an instance could execute a method called methodName
myObject.meta.can(methodName)
```

## Method: classCan(methodName) ##

Returns true if there is a class method called _methodName_

```
// Query whether MyClass could execute a method called methodName
MyClass.meta.classCan(methodName)
```

## Method: isa(classObject) ##

Returns true if the object or class is of the same class or a sub class of _classObject_.

```
// Query whether MyClass is a subclass of SuperClass
MyClass.meta.isa(SuperClass)
// Query whether the class of myObject is a subclass of SuperClass
myObject.meta.isa(SuperClass)
```

## Method: does(role) ##

Returns true if the object or class implements the _role_.

```
// Query whether MyClass implements the role MyRole
MyClass.meta.does(MyRole)
// Query whether myObject implements the role MyRole
myObject.meta.does(MyRole)
```


---


# Instance Creation #

## Method: instantiate(optionalParameters) ##

This is an alternative way to create new instances of a class. The _optionalParameters_ will be passed to the initializer of the class.

```
var object1 = MyClass.meta.instantiate()
var object2 = object1.meta.instantiate()
```



---



# Introspection #

## Method: getMethodObject(methodName) ##

This method will return the method of name _methodName_ if it exists. The returned method object will be of the type [Joose.Method](JooseMethod.md).

## Method: getAttribute(attrName) ##

This method will return the attribute of name _attrName_ if it exists. The returned attribute object will be of the type [Joose.Attribute](JooseAttribute.md).

## Method: getAttributes() ##

This method returns a map of attribute names and [attributes objects](JooseAttribute.md).

## Method: getClassObject() ##

Returns the class object that is represented by the meta object.

## Method: getInstanceMethods() ##

Returns an array of [instance method objects](JooseMethod.md) with all instance methods of the class (including methods from super classes).

## Method: getClassMethods() ##

Returns an array of [class method objects](JooseClassMethod.md) with all class methods of the class (including methods from super classes).

## Method: getSuperClass() ##

Returns an array of the direct super class of the class.

## Method: getSuperClasses() ##

Returns an array of all direct super classes of the class. (Joose does not directly support multiple inheritance, so this should usually only return an array of size one)

## Method: getRoles() ##

Returns and array of all roles that the class implements.


---


# Class Extention #

## Method: addMethod(name, function, properties) ##

This method will add a method of name _name_ with the function body _function_ to the class and all instances. The _properties_ will be passed to the method metaclass (currently none are supported.

**Existing** methods will be replaced.

## Method: addAttribute(name, properties) ##

This will add an attribute of name _name_ to the class and all instances. The _properties_ have the same form as those which are passed to the has-keyword during [class-building](BuildingAClass.md).

Existing attributes will be replaced, but their values will stay intact.

## Method: addSuperClass(classObject) ##

Make _classObject_ a super class of the class and all instances. This will not override any existing methods or attributes.


---


# Instance Extention #

## detach ##

You may at any time detach an instance from its class by calling _detach()_ directly on the instance. The instance now has its own meta object. Calling methods on this meta object will not have any effect one the former class of the instance because the objects receives its own meta object.

`instance.detach`

## instance role applicaton ##

You may also apply a role to an instance. This will automatically detach the instance from its class.

`Role.meta.apply(anInstance)`