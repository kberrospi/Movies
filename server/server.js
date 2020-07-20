const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const Element = require('./models/element');
const Category = require('./models/category');
const Review = require('./models/review')
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const category = require('./models/category');
app.use(cors());
app.use(bodyParser.json());


app.listen(port, ()=> {
    console.info(`Server is running on ${port}`)
})

mongoose.connect( process.env.MONGODB_URL || 'mongodb://localhost:27017/movies', {
    useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB connected');
});


app.post('/',  async (req, res)=>{
    
    const img = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${req.body.poster_path}`;
    let cat = await Category.findOne({name: req.body.category});
    if(!cat){
        cat = await Category.create({name: req.body.category })
    }

    Element.findOne({name: req.body.original_title}, async function (err,data){
        if(!data){
            const el = await Element.create({idp: req.body.id, name:  req.body.original_title, image: img, category: cat, overview: req.body.overview})
            await Review.create({description: req.body.overview, overall_score: req.body.popularity, element: el })
            res.json(`Save to ${req.body.category}`);
        }else{
            let catElem = await data.category.map((e)=>{return e.name})
            console.log(catElem.indexOf(req.body.category)> - 1)

            if(catElem.indexOf(req.body.category)> - 1 === false ){
                console.log(cat)
                await Element.update({name: req.body.original_title}, { $push:{ category: cat } })
                res.json(`Save to ${req.body.category}`)
            }else{
                res.json(`This movie already exists in ${req.body.category}`)
            }
        }


    });
});


app.post('/deleteFavorites', async(req,res)=>{
    console.log(req.body.name)
    const cat = await Category.findOne({name: "Favorite"})
    const ele = await Element.findOne({name:req.body.name, category: cat})
    await Element.updateOne({name: req.body.name}, { $pull:{ category: cat } }, (err, data)=>{
        if(err) return res.json('Error')
        return res.json('Removed for Favorites')
    })

})



app.get('/favorite', async (req, res)=>{
    const cat = await Category.findOne({name: "Favorite"});
    const ele = await Element.find({category: cat})

    res.send(JSON.stringify(ele))
})

app.get('/later', async (req, res)=>{
    const cat = await Category.findOne({name: "See later"});
    const ele = await Element.find({category: cat})

    res.send(JSON.stringify(ele))
})


