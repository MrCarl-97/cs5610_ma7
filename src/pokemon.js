const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Haoyuan Chen"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    res.status(200).json(myPokemon);
});

router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200
    const {name, health, level} = req.body;
    if (myPokemon.some(p=>p.name === name)) {
        return res.status(400).json({error:"Pokemon already exists"});
    }

    const newPokemon = {
        id: uuid(),
        name,
        health: health ?? Math.floor(Math.random() * 91)+10,
        level: level ?? Math.floor(Math.random * 10) + 1
    };
    myPokemon.push(newPokemon);
    res.status(200).json(newPokemon);
});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const pokemon = myPokemon.find(p=>p.id===req.params.pokemonId);
    if(pokemon){
        res.status(200).json(pokemon);
    } else {
        res.status(404).json({error:"Not Found"});
    }
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId
    const {pokemonId} = req.params;
    const {name, health, level} = req.body;
    const pokemonIndex = myPokemon.findIndex(p=>p.id===pokemonId);
    if(pokemonIndex === -1){
        return res.status(404).json({error:"Not Fount"});
    }  
    myPokemon[pokemonIndex] = {
        ...myPokemon[pokemonIndex],
        ...(name && {name}),
        ...(health && {health}),
        ...(level && {level})
    };
    res.status(200).json(myPokemon[pokemonIndex]);
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id
    const{pokemonID} = req.params;
    const index=myPokemon.findIndex(p=>p.id===pokemonID);
    if(index !== -1){
        myPokemon.splice(index, 1);
        res.status(200).json();
    }
})

module.exports = router;