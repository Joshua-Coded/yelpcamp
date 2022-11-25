const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');
const Campground = require('../models/campgrounds')

mongoose.connect('mongodb+srv://Josh-Dev:Alana_2001@joshua.wbl0vjk.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i <50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state},
             ${cities[random1000].state}`,
             title: `${sample(descriptors)} ${sample(places)}`,

        })
        await camp.save();
    }   
}


seedDB().then(() => {
    mongoose.connection.close();
});