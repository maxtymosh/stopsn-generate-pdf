var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var fs = require('fs');
var _basePath = 'file:///' + __dirname + '/Media/';
var options = {
    format: 'A4', 
    base: _basePath 
};

//init app
var app = express();

//set the templat engine
app.set('view engine', 'ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home')
});

app.post('/', (req, res) => {
    res.render('demopdf', { article: req.body.article, firstname: req.body.firstname, lastname: req.body.lastname }, function (err, html) {
        pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function (err, result) {
            if (err) {
                return console.log(err);
            }
            else {
                // console.log(res);
                console.log('_basePath:');
                console.log(_basePath);
                var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
                res.header('content-type', 'application/pdf');
                res.send(datafile);
            }
        });
    })
})

// var _basePath = 'file:///' + __dirname + '\\Media\\';
// app.post('/test', (req, res) => {
//     res.render('demopdf', { data: req.body.article }, function (err, html) {
//         // res.send(data)
//     })
// })

app.post('/test', (req, res) => {
    res.render('demopdf', { article: req.body.article, firstname: req.body.firstname, lastname: req.body.lastname  }, function (err, html) {
        res.send(html)
    })
})

app.get('/test', (req, res) => {
    res.render('test')
})

// var options = { filename: './businesscard.pdf', format: 'Letter', width: '210mm', height: '297mm', border: '10mm', timeout: 120000 };

// pdf.create(html, options, function(err, buffer) {
//     if (err) return console.log(err);
//     console.log("Converted successfully.");
// });

// app.get('/test2', function (req, res) {
//     res.render('demopdf', { data: req.body }, function (err, html) {
        
//     })
//   });

//   app.get('/test3', function(req, res, next) {
//     res.render('demopdf', {title: 'POST test'});
// });



//assign port
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));