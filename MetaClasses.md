**Warning:**
No need to read this if you are not interested in funky meta programming. Joose works perfectly well without this.

# Meta classes #

The following concepts are represented by meta classes or meta objects in Joose
  * Classes: See Joose.Class in documented in [Basic Class Introspection](BasicClassIntrospection.md)
  * Attributes: See [Joose.Attribute](JooseAttribute.md)
  * Methods: See [Joose.Method](JooseMethod.md)

This means for each class that you create with Joose you will receive an instance of Joose.Class (wich you can reach through .meta). This object will hold references to instances of Joose.Attribute and Joose.Method objects for each attribute and method that you add to the class.