console.log("backbone testing!");

define(["jquery", "underscore", "backbone-amd"], function ($, _, Backbone) {

        console.log("$: " + typeof $);
        console.log("_: " + typeof _);
        console.log("Backbone: " + typeof Backbone);

        // Real Testing starts here!

        // LEVEL 1 -------------------------------------
        
        // Model
        var Puppy = Backbone.Model.extend({}); // watch out the CASE!!!

        // View
        var PuppyView = Backbone.View.extend({
          // set parent (default is div)
          tagName: 'dl',

          render: function(){
            var html = '<dt>Name</dt><dd>' + this.model.get('name') + '</dd>' +
                        '<dt>Age</dt><dd>' + this.model.get('age') + '</dd>';
            // insert into parent <dl> (evey view has a top level 'EL'ement)
            $(this.el).html(html);
          }
        });

        // Instantiating a new puppy
        var pluto = new Puppy();
        pluto.set({name: 'pluto'});
        pluto.set({age: 5});

        // Creating the view
        var plutoView = new PuppyView({model: pluto});

        // Rendering the view
        plutoView.render();
        $('#container').html(plutoView.el);

        // One year passed, pluto is grown!
        pluto.set({age: pluto.get('age') + 1 });

        // Re-render the view
        plutoView.render();

        // LEVEL 2 -------------------------------------

        // Set default attributes of a Model
        var Kitten1 = Backbone.Model.extend({
          defaults: {
            name: 'no-name',
            age: 0,
            birthday: new Date()
          }
        }); // however this won't work.
        // Every new Appointment you create has the same exact date,
        // instead of the date and time of when the Appointment instance
        // was created.
        // This is because new Date() is evaluated once, when the
        // Appointment model is first created, 
        // and not re-evaluated every time a new instance is created.
        // Here's how to fix this:
        var Kitten = Backbone.Model.extend({
          // set defaults
          defaults: function(){
            return {
              name: 'Anonymous Kitty',
              age: 0,
              //description: '',
              birthday: new Date(),
              is_wild: true
            }
          },
          // URL to web service
          urlRoot: 'http://localhost:3000/kittens'
        });

        // Fetch a RESTful Web Service
        var ketty = new Kitten({id: 1});
        var xhr = ketty.fetch({
          success: function() {
            console.log('ketty fetched successfully:');
            console.log(ketty.toJSON());
          }
        });

        ketty.on('change', function(){
          // alert('ketty dataset changed!');
          kettyKittyView.render();
        });

        $('#add-year').on('click', function(){
          ketty.set({
            age: ketty.get('age') + 1
          });
          ketty.save();
        });

        // Create a new instance of KittyView (ViewModel)
        var kettyKittyView = new PuppyView({model: ketty});
        kettyKittyView.render();
        $('#container').append(kettyKittyView.el);

        // LEVEL 3 -------------------------------------

        // THE MODEL
        var CoolKitten = Backbone.Model.extend({

          // URL to web service
          urlRoot: 'http://localhost:3000/kittens',

          // set defaults
          defaults: function(){
            return {
              name: 'Anonymous (but cool) Kitty',
              age: 0,
              description: '',
              birthday: new Date(),
              is_wild: true
            }
          }
        });

        // THE VIEW
        var CoolKittenView = Backbone.View.extend({
          // set parent $el attributes
          tagName: 'ul',
          className: 'cool-kitten',

          // use the underscore template
          template: _.template('<li>Name: <%= name %></li>' + 
            '<li>Age: <%= age %></li>' +
            '<li><%= description %></li>' +
            '<li><%= birthday %></li>' +
            '<li><input type="checkbox"> <%= is_wild %></li>'),

          // the render function
          render: function(){
            var attributes = this.model.toJSON();
            // binding attributes to the template
            this.$el.html(this.template(attributes));
          },

          // some simple events
          events: {
            'dblclick li': 'alertSomethingVeryShitty' 
          },

          // custom function
          alertSomethingVeryShitty: function(){
            alert("Something very shitty!");
          }
        });

        // instantiate a new CoolKitten
        var coolKitten = new CoolKitten({
          name: 'Gatto Simpatico',
          age: 16,
          is_wild: false
        });

        // instantiate a new CoolKittenView
        var coolKittenView = new CoolKittenView({model: coolKitten});

        // render the view
        coolKittenView.render();
        $('#kittens').html(coolKittenView.el);
    }
);
