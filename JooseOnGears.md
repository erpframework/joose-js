![http://joose-js.googlecode.com/svn/trunk/logo/joose.png](http://joose-js.googlecode.com/svn/trunk/logo/joose.png)

# Introduction #

Joose supports several ways to work with [Google Gears](http://gears.google.com/) out of the box. Whenever possible the APIs are implemented in a way that they automatically fall back to alternatives when a user does not have Gears installed. In particular the following APIs are directly supported:

  * [Database](http://code.google.com/apis/gears/api_database.html)
  * [WorkerPool](http://code.google.com/apis/gears/api_workerpool.html)
  * [HttpRequest](http://code.google.com/apis/gears/api_httprequest.html)

# Database #

The Joose distribution includes an object-relational mapper that enables transparent access to the Google Gears database and the HTML5 database (which is currently primarily supported by the Safari browser). You'll find it the examples directory under [examples/simple\_orm/async](http://code.google.com/p/joose-js/source/browse/trunk/examples/simple_orm/async/) and you can try it out with this [demo application](http://joose-js.googlecode.com/svn/trunk/examples/simple_orm_sticky_notes.html).
Declaring a database entity class looks like this:
```
          Class("Person", {
              isa:  ORM.Entity,

              tableName: "person",

              hasOne: {
                  mother: {
                      isa: function () { return m.Person }
                  }
              },

              hasMany: {
                  cars: {
                      isa:        function () { return m.Car },
                      foreignKey: "owner"
                  }
              }
          });
```

The OR-Mapper will use the native HTML5 database if available and use the Gears database as a fallback. If neither is available it will throw an exception.

The OR-Mapper is currently under heavy-development. For more info, check out this [series of blog posts](http://joose-js.blogspot.com/search/label/OR-Mapper). You are encouraged to try it out. Simply [checkout](http://code.google.com/p/joose-js/source/checkout) the latest Joose version from svn.

## Links ##

  * [Demo application](http://joose-js.googlecode.com/svn/trunk/examples/simple_orm_sticky_notes.html)
  * [Unit test suite](http://joose-js.googlecode.com/svn/trunk/examples/simple_orm_async.html)
  * [Post on Ajaxian](http://ajaxian.com/archives/joose-expands-with-new-orm)

# WorkerPool #

You can automatically execute methods of a Joose.Class in a different thread using Google Gears. All you need to do is to use the meta class Joose.Gears and add a worker method. All the Gears-Interfacing is handled for you. If Gears is not present, the worker is executed in the main thread. The workers result will be sent to a method called "on"+uppercaseFirst($worker\_name) if available:

```
    Class("HardWork", {
        meta: Joose.Gears,
        has: {
            data: {is: rw, init: {}}
        },
        methods: {
            onDoWork: function (result) {
                ok(result == 1001, "Gear Worker returns correct result")
            }
        },
        workers: {
            doWork: function (start) {
                var counter = start;
                for(var i = 0; i < 1000; i++) {
                    counter++
                }
                return counter
            }
        }
    })

    var hw = new HardWork();

    hw.doWork(1)
```

If Gears is not available, the method will simply be executed in the main thread.

## Links ##

  * [Post on the Google Gears blog about Joose.Gears](http://gearsblog.blogspot.com/2008/03/joosegears-adding-support-for-workers.html)

# HttpRequest #

Joose includes a simple helper method to do AJAX-requests that automatically use the Google Gears HTTP-Request-API if available which can greatly enhance the performance of pages which make heavy use of AJAX.

Just call ` Joose.Gears.ajaxRequest(method, url, data, callback) ` to initiate a request, where
  * method is either 'GET' or 'POST'
  * url is an URL
  * data is a JavaScript object (consisting of key-value-pairs)
  * callback is the function that receives the response of the AJAX-request as the first parameter

If Gears is not available, the system will perform a regular AJAX request.