Install
---------------
npm install

You can also run node fixtures.js to create 3 test user entries in mongo's test db 

Run
---------------
npm start

nodemon - automatically restart server whenever a change is made to one of the app's files; perfect for development

It's mandatory you use 'npm start' to run the server; 'npm start' runs "./node_modules/.bin/nodemon app.js"


Config
---------------
Views go in /views, html format; handlebars works;
We need to set up routes which end up with response.render('viewToRender', {handlebarData: 'someData'});

Aside from views, we'll have to deal other assets such as css files, images, client js (bootstrap, jquery) - all these will be served
from within './public'.
This happens because we set the './public' folder as static for express:
app.use(express.static(__dirname + '/public'));

As a result, './img/ipad.png' is looked up within './public'
<img class="img-responsive" src="img/ipad.png" alt="">

cool
