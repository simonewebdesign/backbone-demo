console.log('main called');

requirejs.config({
    // If set to true, an error will be thrown if a script loads
    // that does not call define() or have a shim exports string
    // value that can be checked. See Catching load failures in 
    // IE for more information. RequireJS enforceDefine
    //enforceDefine: true,

    // path to external libraries
    baseUrl: "lib",

    // cache busting
    // This only works for the modules; 
    // it does not work for the html file or main.js file.
    // That's why I preferred to create backbone-testing.js:
    // So I don't need to clear cache manually every time!!
    urlArgs: "bust=" + (new Date()).getTime(),  //Remove for prod

    // set timeout for loading scripts
    waitSeconds: 200,

/*  // the shim way works pretty well
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
    }
*/
    paths: {
      // Remember: paths are relative to baseUrl
      "app": "..",

      //The name for the backbone module can be anything,
      // but the name for underscore must be “underscore”
      "underscore": "underscore-amd",
    }
});
 
requirejs(['app/backbone-testing']);
