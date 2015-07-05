# Introduction #

The Joose object system makes writing object-oriented code in JavaScript more productive. It is not a general purpose JavaScript framework.
Joose
  * has no methods to traverse or manipulate the DOM
  * does not enforce a particular component framework
  * could run in any JavaScript environment (not just the browser, but also on the server side or within Flash (as ActionScript))

Thus we recommend to use Joose together with a JavaScript library that facilitates DOM access.

# Joose has been tested with these well known JS frameworks #

| Name   | Status |
|:-------|:-------|
| jQuery | Works  |
| YUI    | Works  |
| Dojo   | Works  |
| ExtJS   | Works [(There is also a experimental Bridge for "joosifying" all of ExtJS)](http://extjs.com/forum/showthread.php?t=55968)  |
| Prototype | Works [(but follow these instructions)](JooseWithPrototypeAndMootools.md) |
| Mootools  | Works [(but follow these instructions)](JooseWithPrototypeAndMootools.md) |
| PureMVC   | Works [(There is also a experimental Bridge for "joosifying" all of PureMVC)](http://joose-js.blogspot.com/2009/01/joosifying-puremvc.html)  |


# Joose has been tested with these Browsers and JavaScript Engines #

## Browsers ##

| Name | Status |
|:-----|:-------|
| Firefox 2 | Works  |
| Firefox 3 | Works  |
| Firefox 3.1 | Works  |
| Safari 3 | Works  |
| Chrome/V8 | Works  |
| Internet Explorer 8 | Works  |
| Internet Explorer 7 | Works  |
| Internet Explorer 6 | Works  |
| Konqueror | Works  |

## JavaScript Engines ##

| Name | Status |
|:-----|:-------|
| Rhino | Works ([RhinoUserGuide](RhinoUserGuide.md)) |
| V8   | Untested, but most likely works |
| JScrip.NET | Works (see [playground/jscript.net/test.bat](http://code.google.com/p/joose-js/source/browse/trunk/playground/jscript.net/test.bat)) |