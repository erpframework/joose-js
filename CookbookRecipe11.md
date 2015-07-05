# Synopsis #

```
Module("MyApp.Meta.Attribute", function () {
    Class("Labeled", {
        isa: Joose.Attribute,
        has: {
            label: {
                is: rw,
                predicate: "hasLabel"
            }
        },
        
        after: {
            handleProps: function () {
                this.handleLabel()
            }
        },
        
        methods: {
            handleLabel: function () {
                var props = this.getProps();
                
                if(props.label != null) {
                    this.setLabel(props.label)
                }
            }
        }
    })
});

Module("MyApp", function () {
    Class("Website", {
        has: {
            url: {
                metaclass: MyApp.Meta.Attribute.Labeled,
                is: rw,
                label: "The site's URL"
            },
            name: {
                is: rw
            }
        },
        methods: {
            dump: function () {
                var dumpValue = "";
                
                var attributes = this.meta.getAttributes();
                
                var me = this;
                
                Joose.O.each(attributes, function (attribute, name) {
                    if(attribute.meta.isa(MyApp.Meta.Attribute.Labeled) && attribute.hasLabel()) {
                        dumpValue += attribute.getLabel()
                    } else {
                        dumpValue += name;
                    }
                    
                    var getter = attribute.getterName();
                    dumpValue += ": " + me[getter]()+"; "
                })
                
                return dumpValue
                
            }
        }
    })
})

var app = new MyApp.Website({ url: "http://www.google.com", name: "Google" });

app.dump();
```

# Summary #

In this recipe, we begin to really delve into the wonder of meta-programming. Some readers may scoff and claim that this is the arena only of the most twisted Joose developers. Absolutely not! Any sufficiently twisted developer can benefit greatly from going more meta.

The high-level goal of this recipe's code is to allow each attribute to have a human-readable "label" attached to it. Such labels would be used when showing data to an end user. In this recipe we label the "url" attribute with "The site's URL" and create a simple method to demonstrate how to use that label.

# Real Attributes 101 #

All the attributes of a Joose-based object are actually objects themselves. These objects have methods and (surprisingly) attributes. Let's look at a concrete example.

```
    has: {
        x: {is: ro},
        y: {is: rw},
    },
```

Ahh, the veritable x and y of the Point example. Internally, every Point has an x object and a y object. They have methods (such as "getValue") and attributes (such as "isLazy"). What class are they instances of? Moose::Meta::Attribute. You don't normally see the objects lurking behind the scenes, because you usually just use point.x and point.y and forget that there's a lot of machinery lying in such methods.

So you have a point object, which has x and y attributes. How can you actually access the objects behind these attributes? Here's one way:

`point.meta.getAttributes()`

returns an Object that maps attribute names to attribute objects.

So to actually beef up attributes, what we need to do is:

  * Create a new attribute metaclass
  * Create attributes using that new metaclass

Let's start dissecting the recipe's code.

# Dissection #


```
Module("MyApp.Meta.Attribute", function () {
    Class("Labeled", {
        isa: Joose.Attribute,
        
        has: {
            label: {
                is: rw,
                predicate: "hasLabel"
            }
        },

```

Here we create a class called Labeled in the MyApp.Meta.Attribute namespace that is inheriting to the attribute base class Joose.Attribute. Our new attributes will always have an attribute called label.

```
        after: {
            handleProps: function () {
                this.handleLabel()
            }
        },
        
        methods: {
            handleLabel: function () {
                var props = this.getProps();
                
                if(props.label != null) {
                    this.setLabel(props.label)
                }
            }
        }
```

When you declare an attribute using the has-keyword, you map a name to a property object.

By creating an after method modifier for handleProps we can augment the attributes initialization process based on the property object. We we call the method handleLabel() which will the set the label-attribute of the attribute-object based on the label-key in the property object :)

## Using the new attribute meta class ##

Note that we're done defining the new metaclass! Only a few of code, and not particularly difficult lines, either. Now to start using the metaclass.

```
Module("MyApp", function () {
    Class("Website", {
        has: {
            url: {
                metaclass: MyApp.Meta.Attribute.Labeled,
                is: rw,
                label: "The site's URL"
            },
            name: {
                is: rw
            }
        },
```

Ah ha! Now we're using the metaclass. We're adding a new attribute, url, to MyApp.Website. `has` lets you set the metaclass of the attribute. Ordinarily (as we've seen), the metaclass is Joose.Attribute.

Finally, we see that has is setting our new meta-attribute, label, to "The site's URL". We can access this meta-attribute with:
`  website.meta.getAttribute('url')->getLabel() `

Well, back to the code:
```
            name: {
                is: rw
            }
```
You don't have to use the meta class on **all** new attributes.

Now we begin defining a method that will dump the MyApp.Website instance for human readers.

```
        methods: {
            dump: function () {
                var dumpValue = "";
                
                var attributes = this.meta.getAttributes();
                
                var me = this;
                
                Joose.O.each(attributes, function (attribute, name) {
```

The variable attributes now includes a map of all attributes of the website. `Joose.O.each()` is a utility function to interate over objects. The function in the second parameter will be invoked for each property of the map passing the attribute and the name.

```
                   if(attribute.meta.isa(MyApp.Meta.Attribute.Labeled) && attribute.hasLabel()) {
                        dumpValue += attribute.getLabel()
                    } else {
                        dumpValue += name;
                    }
```

Here we check whether the attribute is actually labeled. If it is, we append the actual label to the dumpValue instead of just the attribute name.
```
                    var getter = attribute.getterName();
                    dumpValue += ": " + me[getter]()+"; "
                })
```

The getterName() method of the attribute returns the name of the getter method for the atrribute. **me** is a reference to the website (because this is changed in the iterating function). We call the getter method using the fetched name and append the value to the dumpValue
```
                return dumpValue
                
            }
        }
```

And we wrap up the example with a script to show off our newfound magic.

```
var app = new MyApp.Website({ url: "http://www.google.com", name: "Google" });

app.dump();
```


# Conclusion #

Why oh why would you want to go through all of these contortions when you can just print "The site's URL" directly in the dump method? For one, the DRY (Don't Repeat Yourself) principle. If you have it in the dump method, you'll probably also have it in the asForm method, and toFile, and so on. So why not have a method that maps attribute names to labels? That could work, but why not include the label where it belongs, in the attribute's definition? That way you're also less likely to forget to add the label.

More importantly, this was a very simple example. Your metaclasses aren't limited to just adding new meta-attributes. For example, you could implement a metaclass that expires attributes after a certain amount of time. You might use it as such:

```
    has: {
        siteCache: 
            metaclass:    TimedExpiry,
            expiresAfter: { hours: 1 },
            refreshWith:  function () { return AJAXRequest.fetch(this.getURL()) },
            is:           'ro'
        }
    }
```

The sky's the limit!