const express = require("express");

const carousel = express.Router();
const Carousel = require("../model/carousel.model")

carousel.get('/', async (req,res)=> {
    const carousels = await Carousel.findAll();
    try{
        res.status(200).json(carousels);
        
    }catch(err){
        res.status(400).json(err)
    }
})

carousel.post("/", async (req, res) =>{
    console.log(req.body)
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

module.exports=carousel;