# Source #

```
Module("Bank", function (m) {
    Class("Account", {
        has: {
            balance: {
                is: "rw",
                init: 0
            }
        },
        methods: {
            deposit: function (amount) {
                this.setBalance(this.getBalance() + amount)
            },
            withdraw: function (amount) {
                if(this.getBalance() < amount) {
                    throw "Account overdrawn"
                }
                this.setBalance(this.getBalance() - amount);
                return this.getBalance();
            }
        }
    });
    
    Class("CheckingAccount", {
        isa: m.Account,
        has: {
            overdraftAccount: {
                isa: m.Account,
                is: "rw"
            }
        },
        before: {
            withdraw: function (amount) {
                var overdraftAmount = amount - this.getBalance()
                
                if(this.overdraftAccount && overdraftAmount > 0) {
                   this.overdraftAccount.withdraw(overdraftAmount);
                   this.deposit(overdraftAmount);
                }
            }
        }
    })
})
```

# Description #

In the first recipe we demonstrated the construction of basic Joose classes whose attributes had various accessor schemes and builtin type constraints. However, our objects were very data- oriented, and did not have many behavioral aspects (i.e. methods) to them. In this recipe, we will expand upon the concepts from the first recipe and give a more realistic scenario of more behavior oriented classes.

We are using the example of a bank account, which has a standard account (you can deposit money, withdraw money and check your current balance), and a checking account which has optional overdraft protection. The overdraft protection will protect the owner of the checking account by automatically withdrawing the needed funds from the overdraft account to ensure that a check will not bounce.

Now, onto the code. The Module-function introduces a new feature Modules:

```
Module("Bank", function (m) {
...
}
```

The Module-function creates a namespace called "Bank". It takes a function as the second parameter in which we will create our banking classes. The function gets the module object as parameter, that we will later use for easy access to other classes of the namespace inside the Module.

# Type Contraints #

```
has: {
    overdraftAccount: {
        isa: m.Account,
        is: rw
    }
},
```

Here we introduce a new attribute for the CheckingAccount class called overdraftAccount. Using the isa-keyword we put a type contraint on the attribute that is checked every time the setOverdratAccount-setter is used (which is created because we define the attribute as rw (read/write).

# before Method Modifier #

```
before: {
    withdraw: function (amount) {
        var overdraftAmount = amount - this.getBalance()
				
        if(this.overdraftAccount && overdraftAmount > 0) {
            this.overdraftAccount.withdraw(overdraftAmount);
            this.deposit(overdraftAmount);
        }
    }
}
```

Here we introduce another method modifier. The withdraw method is augmented with a before method which is called every time the withdraw method is called. It will beposit money from the savings account in the checkings account if the balance is not sufficient for the withdrawal.

# override Method Modifier #

Another possible implementation would be to use the override method modifier which allows to call the super class method using ` this.SUPER() `:

```
override: {
    withdraw: function (amount) {
        var overdraftAmount = amount - this.getBalance()
                
        if(this.overdraftAccount && overdraftAmount > 0) {                
           this.overdraftAccount.withdraw(overdraftAmount);
           this.deposit(overdraftAmount);
        }
        
        this.SUPER(amount)
    }
}
```


# Object Instantiation #

All Joose obects receive a standard initializer that lets you initialize the objects using named arguments for the constructor:

```
var savingsAccount  = new Bank.Account({ balance: 100 });
var checkingAccount = new Bank.CheckingAccount({ 
    balance:          200, 
    overdraftAccount: savingsAccount
});
```

# Credits #

This cookbook entry is based on [Stevan's entry for Moose](http://search.cpan.org/~stevan/Moose-0.40/lib/Moose/Cookbook/Recipe2.pod). Thank you so much!