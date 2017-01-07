var express = require('express');
var app = express();
var path = require("path");
var mongojs = require("mongojs");
var db = mongojs('cma', ['userDetails', 'customerDetails']);
var bodyParser = require("body-parser");
var session = require('express-session');

app.set('trust proxy', 1) // trust first proxy
app.use(express.static(__dirname + "/public")); //making public folder static
app.use(bodyParser.json()); //returns middleware that only parses json
app.use(session({

    secret: 'keyboard cats',
    maxAge: 2000000,
    resave: false,
    saveUninitialized: true,
}));

app.post('/login', function(req, res, next) {

    var userDetails = req.body;
    db.userDetails.findOne({

        email: userDetails.email,
        password: userDetails.password
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (!docs) {
            res.send("true");
        }

        if (docs) {
            req.session.email = docs.email;
            console.log(req.session.email);
            res.json(docs);
        }
    });
});

app.get('/customers', function(req, res, next) {

    db.customerDetails.findOne({
        email: req.session.email
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            res.json(docs);
        }
    });
});

app.post('/addCustomer', function(req, res, next) {

    var newCustomer = req.body;
    db.customerDetails.update({

        email: req.session.email
    }, {
        $push: {
            customerDetails: newCustomer
        }
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            console.log(docs);
            res.json(docs);
        }
    });
});

app.post('/customers/editCustomer', function(req, res, next) {

    var customer = req.body;
    // console.log(customer.email);
    // db.customerDetails.findAndModify({

    // query: {
    //     email: req.session.email,
    //     "customerDetails.email":customer.email
    // },
    // update:{$set:{
    //     "customerDetails.$.firstName":customer.firstName,
    //     "customerDetails.$.lastName":customer.lastName,
    //     "customerDetails.$.gender":customer.gender,
    //     "customerDetails.$.email":customer.email,
    //     "customerDetails.$.address":customer.address,
    //     "customerDetails.$.state":customer.state,
    //     "customerDetails.$.city":customer.city,
    //     "customerDetails.$.zip":customer.zip,
    //     "customerDetails.$.pic":customer.pic
    // }}
    db.customerDetails.update({
        email: req.session.email,
        'customerDetails.email': customer.email
    }, {
        $set: {
            "customerDetails.$.firstName": customer.firstName,
            "customerDetails.$.lastName": customer.lastName,
            "customerDetails.$.gender": customer.gender,
            "customerDetails.$.email": customer.email,
            "customerDetails.$.address": customer.address,
            "customerDetails.$.state": customer.state,
            "customerDetails.$.city": customer.city,
            "customerDetails.$.zip": customer.zip,
            "customerDetails.$.pic": customer.pic
        }
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            // console.log(docs);
            res.json(docs);
        }
    });
});

app.post('/customers/deleteCustomer', function(req, res, next) {

    var deleteCustomer = req.body;
    // console.log(customer.email);
    db.customerDetails.update({


        email: req.session.email
    }, {
        $pull: {
            customerDetails: {
                email: deleteCustomer.email
            }
        }
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            // console.log(docs);
            res.json(docs);
        }
    });
});

app.post('/customers/details', function(req, res, next) {

    var customerForOrder = req.body;
    // // console.log(customer.email);
    db.customerDetails.find({


        email: req.session.email
    }, {
        customerDetails: {
            $elemMatch: {
                email:customerForOrder.email
            }
        }
    }, function(err, docs) {

        if (err) {
            console.log("err");
            return next();
        }

        if (docs) {
            // console.log(docs);
            res.json(docs);
        }
    });
});


app.listen(3000);
// console.log("Server is running on port 3000")
