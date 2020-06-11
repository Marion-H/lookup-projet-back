const express = require("express");

const carousel = express.Router();
const Carousel = require("../model/carousel.model")

carousel.post("/carousels", async (req, res) =>{
    const { title, description, link, picture } = req.body;
    try{
        const carousel = await Carousel.create({
            title, description, link, picture,
        });
        res.status(201).json(carousel);
    }catch(err){
        res.status(422).json(err);
    }
});
