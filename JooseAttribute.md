# Class: Joose.Attribute #

# Description #

Joose.Attribute is the default meta class for attribute. There is one instance of Joose.Attribute for each attribute in Joose. These objects control how attributes are added to a class and they can be introspected to retrieve information about attributes at runtime.

# Methods #

## Method: getName() ##

Returns the name of the attribute

## Method: getProps() ##

Returns the properties of the attribute. In a declaration like
```
has: {
   is: "rw",
   init: "default value"
}
```
is and init are properties of the attribute.


## Method: addGetter ##

Adds a method called "get"+uppercaseFirst(attributeName) to the class that this attribute belongs to. The getter-method returns the current value of the attribute. If the property "lazy" the attribute will be initialized upon the first call to the getter.

## Method: addSetter() ##

Adds a method called "set"+uppercaseFirst(attributeName) to the class that this attribute belongs to. The setter-method sets the attribute value to its first parameter. If the "isa" property was set on the attribute it will also do a type check.

## Method: initializerNamer() ##

Returns the name of the attribute that will be used in the initializer to initialize an objects upon contruction: `new Example({ initializerName: 3 })`
By default returns the return value of toPublicName()

## Method: getterName() ##

Returns the name of method that would be generated as a getter for this attribute.

## Method: setterName() ##

Returns the name of method that would be generated as a setter for this attribute.

## Method: isPrivate() ##

Returns true if this is a private (as opposed to public) attribute. Returns true if the attribute name starts with an underscore.

## Method: toPublicName() ##

Returns the public name of this attribute. This removes the leading underscore for private attributes.

## Method: isPersistent() ##

Returns false if the property "persistent" was set to false.

## Method: doInitialization(objects, paras) ##

This method is called by the default initializer of Joose.Class when an objects is constructed. The function receives two parameters:
  * object: The object that is being initialized
  * paras: The parameters that were passed to the constructor of the object. Paras must be a simple JavaScript objects like in new Example({field1: 1, field2: 2})

If paras includes a field with the name of the return value of initializerName(), its value will be used as the new value of this attribute in the object. Otherwise if the init property was set for attribute the value of the init property will be used.

## Method: handleIs() ##

Handles the property "is".
  * If the value is "ro" it will call addGetter()
  * If the value is "rw" it will call addGetter() and addSetter()

## Method: handlesHandles() (Experimental) ##

If the value of handles is "**", this will generated methods for all methods of the type of this attribute (declared through the property isa) that delegate to the attribute. This is an extremely easy way to build decorators with Joose.**

## Method: handlePredicate() ##

Handles the property "predicate"

Generates a method in the class that this attribute belongs to (The name will be the value of the property predicate) that returns true if the value of the attribute is defined.