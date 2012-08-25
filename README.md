
# JavaScript framework shootout

---

## What is a framework anyway?

__Library__:

* A set of tools

__Framework__:

---

## MVC? WTF?

* __Model__:
* __View__:
* __Controller__:

![MVC overview](images/mvc.png)

---

## Single page applications

![Overview](images/tsa_overview.png)

---

## [TodoMVC](http://todomvc.com/)

The same Todo application implemented using MV\* concepts in most of the popular JavaScript MV\*
frameworks of today.
<img src="images/todomvc.png" alt="TodoMVC" style="float: right; margin: 3em;" />

* Backbone
* Ember
* AngularJS
* Spine
* KnockoutJS
* DOJO
* ...

---

## Backbone

Pork

---

## [JavaScriptMVC](http://javascriptmvc.com)

<img src="images/javascriptmvc.png" alt="JavaScriptMVC" style="float: right; margin-left: 2em;" />
One of the first client side JavaScript MVC frameworks first released about 5 years ago.

Provides full application stack with dependency manager, MVC framework (formerly jQueryMX),
functional testing library and documentation engine:

* [CanJS](http://canjs.us) - Client side MVC framework
* [jQuery++](http://jquerypp.com) - Useful DOM helpers and special events for jQuery
* [StealJS](http://javascriptmvc.com/docs.html#!stealjs) - JavaScript file dependency manager
* [Funcunit](http://funcunit.com) - A QUnit and jQuery based functional testing library
* [DocumentJS](http://javascriptmvc.com/docs.html#!DocumentJS) - A JavaScript documentation engine

---

## [CanJS](http://canjs.us)

Client side MVC framework for building rich web applications. Supports *jQuery*, *Zepto*, *Mootools*,
*Dojo*, *YUI*.

* __can.Construct__ - inheritable constructor functions
* __can.Observe__ - observable objects
* __can.Model__ - observes connected to a RESTful JSON interface
* __can.view__ - template loading, caching, rendering
* __can.EJS__ - live binding templates
* __can.Control__ - declarative event bindings
* __can.route__ - back button and bookmarking support

---

## CanJS - View

Views are defined as live binding Embedded JavaScript (EJS):

	!html
	<script type="text/ejs" id="todos">
    <ul>
      <% todos.each(function(todo) { %>
        <li><%= todo.attr('name'); %></li>
      <% }) %>
    </ul>
	</script>

---

## CanJS - Model

	!javascript
	var Todo = can.Model({
	  findAll : 'GET /todos',
	  findOne : 'GET /todos/{id}',
	  create  : 'POST /todos',
	  update  : 'PUT /todos/{id}',
	  destroy : 'DELETE /todos/{id}'
	}, {});

	var model = new Todo({ name : 'Do dishes' });
	model.attr('name', 'Do something else');

---

## CanJS - Control

	!javascript
	var Control = can.Control({
		'button click' : function() {
			document.findElementById('mydiv').innerHtml =
          can.view(this.options.view, {
            todos : Todo.findAll()
          });
		}
	});

	new Control('#element', {
	  view : 'todos'
	});

---

## Resources

* [Comparison from Throne of JS](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/)

---

## Ember

Sirloin

---

## ExtJS

Amen
