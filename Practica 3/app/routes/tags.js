"use strict";

const express = require('express');
const router = express.Router();
const dataHandler = require('./../controllers/data_handler');

router.route('/')
    .get((req, res) => {
        let tags;
        try{
            tags = res.json(dataHandler.getTags());
        } catch (e) {
            res.status(400).send("Error")
        }
        res.status(200).json(tags);
    })

router.route('/')
    .post((req, res) => {
        let tag = req.body;
        let num = 0;
        try {
            for(let property in tag) {
                if(!(['title', 'description'].includes(property))) continue;
                else num = num+1;
            }
            if(num == 0){
                let nom = dataHandler.createTag(tag);
                res.status(201).send(`Tag ${nom.title} created`);
            }
        } catch(e) {
            res.status(400).send(`Invalid properties. ${num} missing properties`);
        }
});

router.route('/:id')
    .put((req, res) => {
        let id = req.params.id;
        let tag = req.body;
        try {
            let nom = dataHandler.updateTag(id, tag);
            if(nom != -1){
                res.type('text/plain; charset=utf-8');
                res.status(200).send(`Tag ${nom.title} was updated!`);
            }
            else {
                res.status(404).send(`Tag not found`);
            }
        } catch(e) {
            res.status(400).send(`Tag cannot be updated`);
        }
    })
    .delete((req, res) => {
        let uuid = req.params.id;
        let toDelete = dataHandler.deleteTag(uuid);

        if(toDelete != -1) {
            res.type('text/plain; charset=utf-8');
            res.status(200).send(`Tag ${toDelete.title} was deleted!`);
        } else {
            res.status(404).send(`Tag not found`);
        }
    });

module.exports = router;