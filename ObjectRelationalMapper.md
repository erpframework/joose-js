**Note:** This example has been replaced by a [more sophisticated application](JooseOnGears#Database.md).

This example will run the test suite of the example and then display a class browser. This class browser shows the contents of the underlying tables for those classes that represent a table. (These classes live in the MyEntities module.)

# Run the example #

You need to install [Google Gears](http://gears.google.com/). Otherwise there will be no database :)

To tun the example in your web browser [click here](http://it.test.avantaxx.de/xssinterface/projects/Joose/examples/simple_orm.html).

# Code #

The example uses two entities:
  * Person maps to table person
  * Car maps to car

The Person
  * has a mother which is in turn a Person
  * has potentially multiple Cars

The Car
  * has an owner which is a Person

## SQL Create Statements ##

```
create table if not exists person (name TEXT, mother INTEGER, city TEXT);
create table if not exists car (model TEXT, brand TEXT, owner INTEGER)'); 
```
## Entity Declaration ##

```
Module("MyEntities", function (m) {

    Class("Car", {
        isa:  ORM.Entity,

        has: {
            owner: {
                metaclass: ORM.HasOne,
                isa:       function () { return m.Person }
            }
        },

        classMethods: {
            tableName: function () {
                return "car"
            }
        }
    })

    Class("Person", {
        isa:  ORM.Entity,

        classMethods: {
            tableName: function () {
                return "person"
            }
        },

        has: {
            mother: {
                metaclass: ORM.HasOne,
                isa:       function () { return m.Person }
            },

            cars: {
                metaclass:  ORM.HasMany,
                isa:        function () { return m.Car },
                foreignKey: "owner"
            }
        }
    });

}) 
```

## Usage ##

```
// Create the mother
var mother = new MyEntities.Person();
mother.name("elke");
mother.city("Elmshorn");
mother.save()

// Create the son
var person = new MyEntities.Person();
person.name("malte");
person.city("Hamburg");
person.mother(mother); // set the mother
person.save()

// Give the son 10 cars :)
for(var i = 0; i < 10; i++) {
    var car = new MyEntities.Car();
    car.model("3."+i);
    car.brand("bmw");
    car.owner(person);
    car.save()
}

// refetch the person from the db
var personFromDb = Entities.Person.newFromId(person.rowid())

alert(personFromDb.mother().name()) // will alert 'elke'
alert(personFromDb.cars()[0].brand()) // will alert 'bmw'
```