var express = require('express');
var app = express();

var DAO = require('./model/nedb');
var dbFile = 'database.nedb.db';

var mustache = require('mustache-express'), path = require('path');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'mustache'));

app.set('port', process.env.PORT || 3000);

let dao = new DAO(dbFile);
//Landing Page
app.get("/", function (request, response) {
    response.status(200);
    response.type('text/html');
    dao.all().then
        (
            (list) => 
            {
                response.render("entries",
                {
                    "PageTitle": "Landing Page",
                    "entries": list
                }
                );
            }
        )
            .catch
        (
            (list) =>
            {
                console.log('Error: ')
                console.log(JSON.stringify(err))    
            }
        );
});

//Guests page
app.get("/guests", function(request, response) 
{
    response.render("guests",
    {
        'title':'Guests',
        'entries': 
        [
            {
                'Item':'Cool program skills',
                'Price' : 'Time.'
            },
            {
                'Item':'Digital lock',
                'Price' : '£3.00'
            },
            {
                'Item':'Shoelaces',
                'Price' : '£0.00'
            }
        ]
    });
});

//404 Page
app.use(function(request, response)
{
    response.type('text/plain');
    response.status(404);
    response.send('Bad Luck, 404');
});

app.listen(app.get('port'), function() 
{
    console.log('Server Running, ctrl+c to stop');
});