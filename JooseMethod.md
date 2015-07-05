# Class: Joose.Method #

# Description #

Joose.Method is the default meta class for methods. There is one instance of Joose.Method for each method in Joose.

See also [Joose.ClassMethod](JooseClassMethod.md)

# Methods #

## Method: getName() ##

Returns the name of the method

## Method: getBody() ##

Returns the actual JavaScript function that is represented by this method.

## Method: getProps() ##

Returns optional properties of the method

## Method: isFromSuperClass() ##

Returns true if the method was inherited from a super class.

## Method: isClassMethod() ##

Returns true if the method is a class method.

## Method: asFunction() ##

Returns the JavaScript function that will be executed if this method is exectued. By default this returns getBody().

## Method: copy() ##

Makes a copy of this method object

## Methods: after, before, around, override, augment ##

These method wrap the method (and its underlying JavaScript function) in a certain way.

See [MethodModifiers](MethodModifiers.md)