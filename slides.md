# JavaScript Framework Shootout

---

## Library vs. Framework

__Library__:

* A set of tools to reduce overhead and improve application consistency by providing reusable pieces of code.
* A library provides useful tools for a specific purpose (functions, helper libs) so you can build your app your way.

__Framework__:

* A **more opinionated** set of tools to reduce overhead and improve application consistency by providing reusable pieces of code.
* Inversion of control. Frameworks specify how you should write your app.

---

## Single page applications

![Overview](images/tsa_overview.png)

---
## MV\*? WTF?

* MVC, MVVM, MVP, MVW, MOVE all follow MV\*
* Quite a few different patterns being used in client side JS.
* Most are based off of MVC in some fashion.
* They are all really based on the [Observer Pattern](http://en.wikipedia.org/wiki/Observer_pattern).


---

## Client side MVC

Separates the representation of information from the user's interaction with it
<img src="images/mvc.png" alt="MVC overview" style="float: right; margin: 2em;" />

* __Controller__: Updates both, view and model according to user interaction
* __Model__: The data/domain model
* __View__: Creates a representation of the model


---

## Client side MVVM

* Model: The data/domain model
* View: The view and view logic (buttons, templates, UI events)
* View Model: Converting model data to view data and back (data-binding)

![MVVM overview](images/mvvm.png)

---

## Client side MVP

* Model: The data/domain model
* View: The view (buttons, templates, routes UI events to presenter)
* Presenter: The middle-man between the view and the model (logic goes here!)

![MVP overview](images/mvp.png)
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

## BackboneJS

A client side MVC style framework to structure JavaScript applications, created by [Jeremy Ashkenas](http://ashkenas.com/) and maintained by [Document Cloud](http://documentcloud.github.com/):

* __Backbone.Model__ - Contains interactive data and the logic connected to it
* __Backbone.Collection__ - An ordered set of models providing list events and methods
* __Backbone.Router__ - Provides linkable and bookmarkable URLs
* __Backbone.View__ - Combines controllers and view

---

## BackboneJS - Photo gallery I

	!javascript
	var Photo = Backbone.Model.extend({

	    // Default attributes for the photo
	    defaults: {
	      // Ensure that each photo created has an `src`.
	      src: "placeholder.jpg",
	      caption: "A default image",
	      viewed: false
	    },

	    initialize: function() {
	    }

	});

---

## BackboneJS - Photo gallery II

	!javascript
	var PhotoGallery = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: Photo,

        // Filter down the list of all photos that have been viewed
        viewed: function() {
          return this.filter(function(photo){ return photo.get('viewed'); });
        },

        // Filter down the list to only photos that have not yet been viewed
        unviewed: function() {
          return this.without.apply(this, this.viewed());
        }

    });

---

## [JavaScriptMVC](http://javascriptmvc.com)

<img src="images/javascriptmvc.png" alt="JavaScriptMVC" style="float: right; margin-left: 2em;" />
One of the first client side JavaScript MVC frameworks first released in 2008.

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
      <% for( var i = 0; i < this.length; i++ ) { %>
        <li><%= this[ i ].name %></li>
      <% } %>
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

## Some Great Resources

* [Comparison from Throne of JS](http://blog.stevensanderson.com/2012/08/01/rich-javascript-applications-the-seven-frameworks-throne-of-js-2012/)
* [TODO MVC](http://todomvc.com/)
* [Journey Through The JavaScript MVC Jungle](http://coding.smashingmagazine.com/2012/07/27/journey-through-the-javascript-mvc-jungle/)
* [The Top 10 Javascript MVC Frameworks Reviewed](http://codebrief.com/2012/01/the-top-10-javascript-mvc-frameworks-reviewed/)
