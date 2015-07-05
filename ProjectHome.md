![http://joose-js.googlecode.com/svn/trunk/logo/joose.png](http://joose-js.googlecode.com/svn/trunk/logo/joose.png)

<font size='5'><b>Please note</b>:<br>
<blockquote>This wiki contains the documentation specific to the Joose 2. For the more general introduction to the Joose project and information about Joose 3, please refer to <a href='http://joose.it'>http://joose.it</a></blockquote>

Joose 3 documentation can be found at: <a href='http://bit.ly/joose_manual'>http://bit.ly/joose_manual</a>

</font>

Joose is a self-hosting meta object system for JavaScript with support for **classes, inheritance, mixins, traits, method modifiers** and more.

Joose makes object-oriented programming with JavaScript **easy, declarative and very productive**.
The Joose meta-object system is multi-paradigm. It supports class-based and prototype-based programming styles as well as class-based inheritance and role-based extention.

The Joose framework has been successfully used in multiple **production systems** for twelve months now and has been proven to be very stable. Joose is being tested using an automated unit-test suite that is being run in all major browsers (Firefox, IE, Safari, Opera and Chrome).


To get started check out how [programming with Joose compared to standard JavaScript](BeforeAndAfter.md) or read the [getting started guide](GettingStartedGuide.md).

Join us on IRC:

Web client: [#joose](http://webchat.freenode.net/?randomnick=1&channels=joose&prompt=1)

IRC client: [irc://irc.freenode.org/joose](irc://irc.freenode.org/joose)


## Documentation ##

  * [Installation](Installation.md)
  * [Getting started Guide](GettingStartedGuide.md)
  * [Getting Help and getting in Touch](GettingHelpAndGettingInTouch.md)
  * [Before and After](BeforeAndAfter.md): Joose for JavaScript programmers
  * Building Things
    * [Building a Class](BuildingAClass.md)
    * [Building a Module](BuildingAModule.md)
    * [Building a Role](BuildingARole.md)
    * [Building a Prototype](BuildingAPrototype.md)
    * [Building and using Types](JooseTypeConstraintsAndCoercions.md)
    * [Building Singletons](Singletons.md)
  * Meta-Interface
    * [Basic class introspection and extention](BasicClassIntrospection.md)
    * [Advanced meta programming](AdvancedMetaProgramming.md)
    * [Meta Classes](MetaClasses.md)

## The World of Joose ##

  * [Compatibility to JavaScript Engines and Browsers (jQuery, Prototype, Dojo, Mootools, etc.)](JooseAndOtherFrameworks.md)
  * [Joose and Google Gears](JooseOnGears.md)
  * [Joose in the Media](JooseInTheMedia.md)
  * [More Reading](MoreReading.md)
  * [Hacking on Joose](Hacking.md)

## The Joose Cookbook ##

  * [Recipe 1: The Point Example](CookbookRecipe1.md)
  * [Recipe 2: Bank Account Example](CookbookRecipe2.md)
  * [Recipe 3: A lazy BinaryTree Example](CookbookRecipe3.md)
  * [Recipe 6: The Role/Traits Example](CookbookRecipe6.md)
  * [Recipe 7: The augment/inner Example](CookbookRecipe7.md)
  * [Recipe 11: Attribute Meta Classes](CookbookRecipe11.md)

## Examples ##

### blok - Visio-Style Drawing Software ###

[blok](http://blok.appspot.com) is a Google App Engine based project for collaborative editing of user interface prototypes using simple rectangles to represent parts of the ui. blok is mostly written in JavaScript using the Joose Framework and jQuery.

### Class Browser ###

Joose provides very easy to use introspection facilities for Joose classes, modules and prototypes. The [class browser example](http://it.test.avantaxx.de/xssinterface/projects/Joose/examples/class_browser.html) uses these facilities to show you information about the classes which are currently loaded. Its layout is based on the good old class browser included with VisualWorks Smalltalk.

### Object-Relational Mapper ###

This [example](JooseOnGears#Database.md) demonstrates a simple object relational mapper for the client-side SQLite database provided by Google Gears or HTML5.

## Credits ##

Joose was heavily inspired by [Moose](http://www.iinteractive.com/moose/), the post-modern object system for Perl 5.

## Licencing ##

The licence for Joose and all pages in this wiki can be found on the [licence page](Licence.md).