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
    }
);
