var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var fs = require('fs');
var _basePath = 'file:///' + __dirname + '/public/';
var options = {
    format: 'A4',
    base: _basePath,
    "header": {
        "height": "65px",
    },
    "footer": {
        "height": "50px",
        "margin": "1cm",
        "contents": {
            default: '<div class="footer-pdf"><div class="footer-pdf__text">Цей документ призначений для широкого загалу та людей, які живуть із серцевою недостатністю. Для отримання більш докладної інформації перейдіть за посиланням</div><a class="footer-pdf__link" href="https://stopsn.com.ua/" style="">https://stopsn.com.ua/</a><div class="footer-pdf__date">UA-4428 Approved June 2023</div><div>'
        }
    },
};

//init app
var app = express();

//set the templat engine
app.set('view engine', 'ejs');

//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('empty');
});

app.post('/risk', (req, res) => {
    res.render('risk',
        {
            more_60: req.body.more_60,
            infarct: req.body.infarct,
            coronary_heart: req.body.coronary_heart,
            congenital_heart: req.body.congenital_heart,

            heart_valves: req.body.heart_valves,
            high_cholesterol: req.body.high_cholesterol,
            high_blood_pressure: req.body.high_blood_pressure,
            other_heart_rhythm_disorders: req.body.other_heart_rhythm_disorders,

            diabetes: req.body.diabetes,
            copd: req.body.copd,
            chronic_kidney: req.body.chronic_kidney,
            respiratory_disorders: req.body.respiratory_disorders,

            smoking: req.body.smoking,
            alcohol: req.body.alcohol,
            weight: req.body.weight,
            low_phisical_activity: req.body.low_phisical_activity
        },
        function (err, html) {
            pdf.create(html, options).toFile('./public/uploads/risk.pdf', function (err, result) {
                if (err) {
                    return console.log(err);
                }
                else {
                    // console.log(res);
                    // console.log('_basePath:');
                    // console.log(_basePath);
                    var datafile = fs.readFileSync('./public/uploads/risk.pdf');
                    res.header('content-type', 'application/pdf');
                    res.send(datafile);
                }
            });
        });
});

// var _basePath = 'file:///' + __dirname + '\\Media\\';
// app.post('/test', (req, res) => {
//     res.render('demopdf', { data: req.body.article }, function (err, html) {
//         // res.send(data)
//     })
// })

app.post('/test', (req, res) => {
    res.render('risk',
        {
            article: req.body.article,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        function (err, html) {
            res.send(html);
        });
});

app.get('/test', (req, res) => {
    res.render('test');
});

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