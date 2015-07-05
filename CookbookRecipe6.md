
```
Role("Eq", {
    requires: "equalTo",
    
    methods: {
        notEqualTo: function (other) {
            return !this.equalTo(other)
        }
    }
})

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

Role("Printable", {
    requires: "toString"
})

Module("US", function () {
    Class("Currency", {
        does: [Comparable, Printable],
        
        has:  {
            amount: {
                is: rw,
                init: 0
            }
        },
        
        methods: {
            compare: function (other) {
                if(this.getAmount() == other.getAmount()) return 0
                if(this.getAmount() >  other.getAmount()) return 1
                return -1
            },
            
            toString: function () {
                return ""+this.getAmount()+" USD"
            }
        }
        
        
    })
})
```

In this recipe we examine the role (or [trait](http://www.iam.unibe.ch/~scg/cgi-bin/scgbib.cgi?query=nathanael+traits+composable+units+ecoop)) support provided in Joose. "Roles" may be described in many ways, but there are two main ways in which they are used: as interfaces, and as a means of code reuse. This recipe demonstrates the construction and incorporation of roles that define comparison and display of objects.

Let's start by examining Eq. You'll notice that instead of the familiar `Class` you might be expecting, here we use `Role` to make it clear that this is a role. We encounter a new keyword, requires:
` requires: "equalTo", `

What this does is to indicate that any class which "consumes" (that is to say, "includes using does", as we'll see a little later) the Eq role must include an equalTo method, whether this is provided by the class itself, one of its superclasses, or another role consumed by the class.

In addition to requiring an equalTo method, Eq defines a notEqualTo method, which simply inverts the result of equalTo. Defining additional methods in this way, by using only a few base methods that target classes must define, is a useful pattern to provide maximum functionality with minimum effort.

After the minimal Eq, we next move on to Comparable. The first thing you will notice is another new keyword, does:
` does: Eq, `

` does ` is used to provide a list of roles which this class (or role) consumes. Here, Comparable only consumes one role (Eq). In effect, it is as if we defined a notEqualTo method within Comparable, and also promised to fulfill the requirement of an equalTo method.

Comparable itself states that it requires compare. Again, it means that any classes consuming this role must implement a compare method.
` requires: "compare", `

Comparable defines an equal\_to method which satisfies the Eq role's requirements. This, along with a number of other methods (greaterThan, lessThan, greaterThanOrEqualTo, and lessThanOrEqualTo) is simply defined in terms of compare, once again demonstrating the pattern of defining a number of utility methods in terms of only a single method that the target class need implement.

```
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
```

Next up is Printable. This is a very simple role, akin to Eq. It merely requires a toString method (Which is actually available to all JavaScript objects :).

# Classes using Roles #

Finally, we come to US.Currency, a class in the US module that allows us to reap the benefits of our hard work. This is a regular Joose class, so we include the normal ` Class() ` constructor. It consumes both Comparable and Printable, as the following line shows:
` does: [Comparable, Printable], `

It also defines a regular Joose attribute with the rw-trait (so we get getAmount and setAmount) which will be initialized to 0:
```
        has:  {
            amount: {
                is: rw,
                init: 0
            }
        },
```

Now we come to the core of the class. First up, we define a compare method:
```
            compare: function (other) {
                if(this.getAmount() == other.getAmount()) return 0
                if(this.getAmount() >  other.getAmount()) return 1
                return -1
            },
```

As you can see it simply compares the amount attribute and returns values according to the Comparable-convention. With the single definition of this method, we gain the following methods: greaterThan, lessThan, greaterThanOrEqualTo, and lessThanOrEqualTo.

We end the class with a definition of the to\_string method, which formats the amount attribute for display

```
            toString: function () {
                return ""+this.getAmount()+" USD"
            }
```

# Conclusion #

This recipe has shown that roles can be very powerful and immensely useful, and save a great deal of repetition.


# Credits #

This cookbook entry is based on [Stevan's entry for Moose](http://search.cpan.org/~stevan/Moose-0.40/lib/Moose/Cookbook/Recipe6.pod). Thank you so much!