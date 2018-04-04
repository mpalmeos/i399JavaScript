'use strict';

const express = require('express');
const app = express();
const Dao = require('./dao.js');
const dao = new Dao();
const bodyParser = require('body-parser');
app.use(express.static('Public'));
app.use(bodyParser.json());

const url = 'mongodb://maie:123456@ds237858.mlab.com:37858/i399';

app.get('api/contacts', getContacts);
app.get('api/contacts/:id', getContact);
app.delete('api/contacts/:id', deleteContact);
app.post('api/contacts', saveContact);
app.post('api/contacts/delete', deleteContacts);
app.put('api/contacts/:id', updateContact);

app.use(errorHandler);

dao.connect(url)
    .then(() => {
        app.listen(3000, () => console.log('Server is running on port 3000'));
    }).catch(err => {
        console.log("MongoDB connection failed: ");
        console.log(err);
});


function errorHandler(error, request, response, next){
    response.status(500).json( {error: error.toString()} );
}

function getContacts(request, response, next){
    dao.findAll().then(data => {response.json(data)}).catch(next);
}

function getContact(request, response, next){
    var id = request.params.id;
    dao.findById(id).then(data => {response.json(data)}).catch(next);
}

function deleteContact(request, response, next){
    var id = req.params.id;

    dao.remove(id).then(data => {
        response.status(200).end("Deleted");
    }).catch(next);
}

function saveContact(request, response, next){
    var contact = request.body;

    var cleanContact = {
        "name": contact.name,
        "phone": contact.phone
    };

    dao.insert(cleanContact).then((data) => {
        response.location("/api/contacts/" + data.insertedId);
        dao.findById(data.insertedId).then(insertedContact => {
            response.json(insertedContact);
        });
    }).catch(next);
}

function deleteContacts(request, response, next){
    var contactIDs = req.body;

    dao.removeMany(contactIDs).then(data =>{
        response.status(200).json("Deleted");
    }).catch(next);
}

function updateContact(request, response, next){
    var id = request.params.id;
    var contact = request.body;

    var cleanContact = {
        "name": contact.name,
        "phone": contact.phone
    };

    dao.update(id, cleanContact).then(data => {
        response.status(200).end("Changed");
    }).catch(next);
}