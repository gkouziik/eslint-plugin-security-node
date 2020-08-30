# Detect html injection (detect-html-injection)
### Introduction to HTML Manipulation Function
When a method or operation allows HTML manipulation if it is possible to control, even partially, an argument, then it is possible to manipulate, to some extent the HTML and consequently gain control of the user interface or execute JavaScript using classic Cross Site Scripting attacks.

Data flow starts from Sources(input data that could be tainted) and ends to Sinks (functions potentially dangerous).

In software security the **Sources[*]** are to be considered starting points where untrusted input data is taken by an application.

There are two types of input sources
* Direct
* Indirect

So we will analyze the various types of Direct/Indirect input and how malicious JavaScript code can cause damage by exploiting incorrect programming techniques.

In software security the **Sinks[*]** are meant to be the points in the flow where data depending from sources is used in a potentially dangerous way resulting in loss of Confidentiality, Integrity or Availability.

This means that a function is a Sink if its behavior is generally safe but would be dangerous with a tainted input data.

To understand the difference between Source and tainted Source take a look to the following code:
```javascript
<script>
var name = document.URL.indexof("name=") + 5; <- TAINTED SOURCE
document.wirte("Welcome " + 
document.URL.substring(name, document.URL.length)); <- SINK
</script>
```
**Source**: document.URL

**Sink**: document.write()

**Result**: document.write("<script>alert(docuemnt.cookie)</script>");

The exploit will take place when visiting the following URL:

   http://example.tld/page.html#name=<script>alert(document.cookie)</script>

* Glossary:  
Sources: Sources are all the DOM Properties that can be influenced by an attacker. 
Sinks: Sinks are all the DOM Properties, JavaScript functions, and other Client-side entities that can lead to or influence Client-side code execution. 

###Table of dangerous JavaScript functions/properties for HTML manipulation
 Here below we report a table with the principal sinks that allow HTML manipulation which likely will result in JavaScript execution.

Function Name | Browser | Example
------------- | ------- | -------
document.write | All | document.write(“<b>” + userControlledVal + “</b>”);
document.writeln | All | document.writeln("<b>" + userControlledVal + "</b>");
anyElement.innerHTML | All | divElem.innerHTML = “Hello ” + userControlledVal
anyElement.outerHTML | All | divElem.outerHTML =  "<div>Hello " + userControlledVal
+ "</div>"
anyElement.insertAdjacentHTML | All | divElem.insertAdjacentHTML("","<b>"+ userControlledVal + "</b>");)

### Difference between document.write functions and properties like innerHTML
The document.write method: 

Let's take functions like document.write (or document.writeln) as an example to explain better the Sink and let's see the difference between this function and for example, the property innerHTML.

As we can see, the document.write goes to operate in a direct way as Sink writing (output) the malicious code entered by a user who checks the value, going, in fact, to the following URL:  

     http://example.tld/page.html#?foo=<script>alert(document.cookie)</script>

 And, by analyzing the page code: 

```javascript
<script>
var pos = document.URL.indexOf("foo=") + 4; <- TAINTED SOURCE
document.write(document.URL.substring(pos, document.URL.length)); <- SINK
</script>
```
We can see that the Sink in question, therefore, the document.write will have the task of printing screen the data value inserted into the function as an argument, and though having passed the user argument of malicious JavaScript code, then the function will only unintentionally execute writing in the DOM code in question, then:

```javascript
alert(document.cookie);
```

Building up the browser side, then Client-side, a popup containing the cookie values of the current user session.

**The innerHTML method:**
Concerning the use of the innerHTML method, and, of how this can be abused by an object controlled directly by a user, we can make a more detailed example, then let’s take the following code:
```javascript
<div id="nm">John Doe</div>
<script>
var name = window.localStorage.name; <- SOURCE
document.getElementById("nm").innerHTML = name;
</script>
```
As you can see, if we call the innerHTML method to retrieve the information, nothing happens, even in the case that instead of the name "John Doe" there has been the malicious JavaScript code; Instead let’s take another example: 
```javascript
<div id ="nm">John Doe</div>
<script>
var pos = document.URL.indexOd("name=") + 5;
var name = document.URL.substring(pos,document.URL.length);
document.getElementById("nm").innerHTML = name; <- SNIK
</script>
```

Following this example script and browsing its URL:

     http://example.tld/page.html?name=<script>alert(document.cookie)</script>

In this case, the browser will return us a window that is to show us that our JavaScript code passed to the URL parameter name, was executed. 

### Examples of vulnerable source code for the HTML Manipulation vulnerabilities
At this point we can do is give a few examples so you can see the various existing possibilities that allow you to identify and subsequently Exploiting a vulnerability in HTML Manipulation type, then:
* DOM Based XSS
* Stored DOM Based XSS
* Others

###DOM Based Cross-Site-Scripting(DOM XSS)
So,to explain this type of vulnerabality,we can also take one of the above examples that made it very simple:
Taking the following vulnerable code:
```javascript
<script>
var pos = document.URL.indexOf("foo=") + 4;
document.write(document.URL.substring(pos, document.URL.length));
</script>
```
* Source: document.URL
* Sink: document.write()
* Result: document.write(“<script>alert(document.cookie)</script>”); 

The attack is possible to a Client-side level (this due to the # fragment identifier).

To exploiting this attack just go to the following URL and specify the malicious code in the “foo=” parameter:

     http://example.tld/page.html#foo=<script>alert(document.cookie)</script>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

// fill me in

```

Examples of **correct** code for this rule:

```js

// fill me in

```

## Further Reading
[link 1](http://blog.blueclosure.com/2017/09/javascript-dangerous-functions-part-1.html)
