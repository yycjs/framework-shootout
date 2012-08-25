# JavaScript framework shootout

---

## What is a framework anyway?

Bacon

---

## Model, View, Controller

Ipsum

---

## Client side MVC

Sit

---

## TodoMVC

![TodoMVC](images/todomvc.png)

---

## Backbone

Pork

---

## CanJS

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

## CanJS - Example

__A view__

	!html
	<script type="text/ejs" id="todos">
		<ul>
		<% for( var i = 0; i < this.length; i++ ) { %>
			<li><%= this[ i ].name %></li>
		<% } %>
		</ul>
    </script>

__Controls and Models__

	!javascript
	var Todo = can.Model({
	  findAll : 'GET /todos',
	  findOne : 'GET /todos/{id}',
	  create  : 'POST /todos',
	  update  : 'PUT /todos/{id}',
	  destroy : 'DELETE /todos/{id}'
	}, {});

	var Control = can.Control({
		'button click' : function() {
			document.findElementById('mydiv').innerHtml =
        		can.view('todos', Todo.findAll());
		}
	});

---

---

## Resources

* [Comparison from Throne of JS](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/)

---

## Ember

Sirloin

---

## ExtJS

Amen
