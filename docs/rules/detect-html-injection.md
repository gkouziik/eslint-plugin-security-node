# Detect html injection (detect-html-injection)
### Introduction to HTML Maipulation Function
When a method or operation allows HTML manipulation if it is possible to control,even partially,an argument,then it is possible to manipulate,to some extent the HTML and consequently gain control of the user interface or execute Javascript using classic Cross Site Scripting attacks.

Data flow starts from Sources(input data that could be tainted) and ends to Sinks (functions potentially dangerous).

In Software security the **Sources[*]** are to be considered starting points where untrusted input data is taken by an application.

There are two types of input sources
* Direct
* Indirect

So we will analyze the various types of Direct/Indirect input and how malicious Javascript code can cause damage by exploiting incorrect programming techniques.

In software security the **Sinks[*]** are meant to be the points in the flow where data depending from sources is used in a potentially dangerous way resulting in loss of Confidentiality,Integrity or Availability.

This means that a function is a Sink if its behavior is generally safe but vould be dangerous with a tainted input data.

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
Sinks: Sinks are all the DOM Properties, JavaScript functions and other Client-side entities that can lead to or influence Client-side code execution. 

###Table of dangerous Javascript functions/properties for HTML manipulation
 Here below we report a table with the principal sinks that allow HTML manipulation which likely will result JavaScript execution.

Function Name | Browser | Example
------------- | ------- | -------
document.write | All | document.write(“<b>” + userControlledVal + “</b>”);
document.writeln | All | document.writeln("<b>" + userControlledVal + "</b>");
anyElement.innerHTML | All | divElem.innerHTML = “Hello ” + userControlledVal
anyElement.outerHTML | All | divElem.outerHTML =  "<div>Hello " + userControlledVal
+ "</div>"
anyElement.insertAdjacentHTML | All | divElem.insertAdjacentHTML("","<b>"+ userControlledVal + "</b>");)





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

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
