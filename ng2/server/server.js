'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const Dao = require('./dao.js');
const dao = new Dao();
const app = express();

var url = 'mongodb://maie:123456@ds147975.mlab.com:47975/i399';

app.use(bodyParser.json());
app.use(express.static('ui'));

app.get('/api/contacts', getContacts);
app.get('/api/contacts/:id', getContact);
app.post('/api/contacts', addContact);
app.put('/api/contacts/:id', changeContact);
app.post('/api/contacts/delete', deleteMultipleContacts);
app.delete('/api/contacts/:id', deleteContact);

app.use(errorHandler);

dao.connect(url)
    .then(() => {
        app.listen(3000, () => console.log('Server is running on port 3000'));
    }).catch(err => {
    console.log("MongoDB connection failed: ");
    console.log(err);
});

function errorHandler(error, request, response, next) { // there must be 4 arguments
    console.log(error);
    response.status(500).send('error: ' + error.toString());
}

function getContacts(req, resp) {
    dao.findAll(req.query.q).then(data => {
        resp.json(data);
    }).catch(error => {
        console.log(error);
        resp.end('error' + error);
    });
}

function getContact(req, resp) {
    const id = req.params.id;
    dao.findById(id).then(data => {
        resp.json(data);
    }).catch(err => {
        console.log(err);
        resp.status(404).json(err.toString());
    });
}

function addContact(req, resp, next) {
    dao.insert(req.body).then((data) => {
        resp.json(data);
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

function changeContact(req, resp) {
    const id = req.params.id;
    dao.update(id, req.body).then(data => {
        resp.json(data);
    }).catch(err => {
        console.log(err);
        resp.status(404).end("Contact Not Found");
    });
}

function deleteContact(req, resp) {
    const id = req.params.id;
    dao.remove(id).then(data => {
        resp.json(data);
    }).catch(err => {
        console.log(err);
        resp.status(404).end("Contact Not Found");
    })
}

function deleteMultipleContacts(req, resp) {
    dao.removeMany(req.body).then(data => {
        resp.json(data);
    }).catch(err => {
        console.log(err);
        resp.status(400).json("Failed to delete some of the contacts" + err.toString());
    })

}