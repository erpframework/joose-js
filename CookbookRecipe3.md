# Synopsis #
```
Class("BinaryTree");

Class("BinaryTree", {
    has: {
        node: {
            is: rw
        },
        parent: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasParent"
        },
        left: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasLeft",
            lazy:      true,
            init:      function () { return new BinaryTree({ parent: this })}
        },
        right: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasRight",
            lazy:      true,
            init:      function () { return new BinaryTree({ parent: this })}
        }
    },
    before: {
        setLeft:  function (left)  { left.setParent(this) },
        setRight: function (right) { right.setParent(this) },
    }
})
```
# Description #

In this recipe we take a closer look at attributes, and see how some of their more advanced features can be used to create fairly complex behaviors.

The class in this recipe is a classic binary tree, each node in the tree is represented by an instance of the BinaryTree class. Each instance has a node slot to hold an arbitrary value, a right slot to hold the right node, a left slot to hold the left node, and finally a parent slot to hold a reference back up the tree.

Now lets look at the code. The first thing that springs into view is the double declaration of the BinaryTree class
```
Class("BinaryTree");

Class("BinaryTree", {
```

This is not a bug, but it allows us to refer to the BinaryTree class from within it's own declaration because it already exists at that point.

## Predicates ##
```
parent: {
    is:        rw,
    isa:       BinaryTree,
    predicate: "hasParent"
},
```

As you already know, this code tells you that parent gets a read/write accessor (named ` getParent ` and ` setParent `) and is constrained to only accept instances of BinaryTree. You will of course remember from the second recipe that the BinaryTree type constraint is automatically created for us by Joose.

The next attribute option is new, though: the predicate option. This option creates a method which can be used to check whether a given slot (in this case parent) contains a defined value. In this case it will create a method called hasParent. Quite simple, and quite handy too.

Now, onto the left and right attributes. They are essentially identical, save for different names, so I will just describe one here:

## Attribute Initializers ##

```
left: {
    is:        rw,
    isa:       BinaryTree,
    predicate: "hasLeft",
    lazy:      true,
    init:      function () { return new BinaryTree({ parent: this })}
},
```

You already know what the is, isa and predicate options do, but now we have two new options. These two options are actually linked together, in fact: you cannot use the lazy option unless you have set the init option. Class creation will fail with an exception.

Before I go into detail about how lazy works, let me first explain how init works, and in particular why it is wrapped in a function.

In the [second recipe](CookbookRecipe2.md) the BankAccount's balance slot had a default value of 0. Since JavaScript will copy strings and numbers by value, this was all we had to say. But for any other item (Arrays, Objects, Functions, ...) you would need to wrap it in a function reference, so you actually get a new copy on each initialization. The function will be applied to the object that is being initialized, so you can use this to refer to the current object.

The default value being generated is a new BinaryTree instance for the left (or right) slot. Here we set up the correct relationship by passing the current instance as the parent argument to the constructor.

# Lazy Initilaizers #

Now, before we go on to the lazy option, I want you to think for a moment. When an instance of this class is created, and the slots are being initialized, the "normal" behavior would be for the left and right slots to be populated with a new instance of BinaryTree. In creating that instance of the left or right slots, we would need to create new instances to populate the left and right slots of those instances. This would continue in an infinitely recursive spiral of death until you had exhausted all available memory on your machine.

This is, of course, not good :)

Which brings us to the lazy attribute option. The lazy option does just what it says: it lazily initializes the slot within the instance. This means that it waits till absolutely the latest possible moment to populate the slot. So if you, the user, store a value in the slot, everything works normally, and what you pass in is stored. However, if you read the slot before storing a value in it, then at that exact moment (and no sooner), the slot will be populated with the value of the default option.

This option is what allows the BinaryTree class to instantiate objects without fear of the infinitely recursive spiral of death mentioned earlier.

So, we have described a quite complex set of behaviors here, and not one method had to be written. But wait, we aren't quite done yet; the autogenerated right and left accessors are not completely correct. They will not install the parental relationships that we need. We could write our own accessors, but that would require us to implement all those features we got automatically (type constraints, lazy initialization, and so on). Instead, we use method modifiers again:

```
before: {
    setLeft:  function (left)  { left.setParent(this) },
    setRight: function (right) { right.setParent(this) },
}
```

These are before modifiers, just like we saw in the second recipe, but with one slight difference. We are not wrapping an inherited method anymore, but instead a method of our own local class. Wrapping local methods is no different, the only requirement is that the wrappee be created before the wrapper (after all, you cannot wrap something which doesn't exist, right?).

Now, as with all the other recipes, you can go about using BinaryTree like any other JavaScript class. A more detailed example of its usage can be found in tests/cookbook/03\_recipe3\_tree.js


# Credits #

This cookbook entry is based on [Stevan's entry for Moose](http://search.cpan.org/~stevan/Moose-0.40/lib/Moose/Cookbook/Recipe3.pod). Thank you so much!