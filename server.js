const express = require('express');

global.fetch = require('node-fetch');
const config = require('universal-config');
const Unsplash = require('unsplash-js').default;
const unsplashToJson = require('unsplash-js').toJson;

//---------------without universal config-------------------

// const api = require('./config/server');

// const unsplash = new Unsplash({
//     applicationId: api.applicationId,
//     secret: api.secret,
//     callbackUrl: api.callbackUrl
// });

//------------------------config unsplash api using universal config-----------------------
// learn this way from brad

const unsplash = new Unsplash({
    applicationId: config.get('applicationId'),
    secret: config.get('secret'),
    callbackUrl: config.get('callbackUrl')
});

//------------------start express--------------------



const app = express();

//@router Get api/images
//@desc Getting Photo From Api And Sending To Client Side
//access public
app.get('/api/images' , (req , res) => {
    const {startImage , countImage} = req.query;
    unsplash.photos.listPhotos(startImage , countImage , "latest")
    .then(unsplashToJson)
    .then(photos =>{
        res.json(photos);
    });
});


//running server
const port = process.env.Port || 5000;
app.listen(port , () => {
    console.log(`server in up in port : ${port}`)
});