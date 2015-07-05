#The default types build in to Joose

# Introduction #

Joose has a set of default types defined for you to use when building your objects.

# Details #

All of the types live in the Joose.Type.**namespace.**

  * Any - anything including null
    * Null - only null
    * NotNull - can't be null
      * Enum - special base enum type uses the value feature of type descriptions
      * Obj - must be an object
        * Func - must be a function
        * Array - must be an array
        * Date - must be a date
        * Joose - must be a joose object
      * Str - must be a string
      * Num - must be a number
        * Int - must be an integer
      * Bool - must be a boolean

