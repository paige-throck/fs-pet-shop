let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let express = require('express');
let router = express.Router();
let app = express();
let port = process.env.PORT || 8000;
let bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(bodyParser.json());

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.set('Content-Type', 'text/plain');
      return res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {

    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }
    res.set('Content-type', 'application/json')
    let pets = JSON.parse(petsJSON);
    let petAge = req.body.age;
    let petKind = req.body.kind;
    let petName = req.body.name;

    let pet = {
      age: petAge,
      kind: petKind,
      name: petName
    };


    if (Number.isNaN(petAge) || !petAge || !petKind || !petName) {
      res.set('Content-type', 'text/plain')
      res.sendStatus(400);

    } else {

      pets.push(pet);
      res.set('Content-type', 'application/json');
      res.send(pet);
    }

    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(err, petsJSON) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      }
      res.send(pets)
    });

    res.end();
    console.log(pets);
  });
});

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);



    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    let petAge = req.body.age;
    let petKind = req.body.kind;
    let petName = req.body.name;
    let pet = pets[id];

    let petKeys = Object.keys(req.body);
      for (i=0; i < petKeys.length; i++){
      pet[petKeys[i]] = req.body[petKeys[i]];
      }

     

    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});

app.delete('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    let pet = pets.splice(id, 1)[0];
    let newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});


app.use(function(req, res) {
  res.set('Content-type', 'text/plain');
  res.sendStatus(404);
  console.log('wtf');
});


app.listen(port, function() {
  console.log('Listening on port', port);
});



module.exports = app;
