const express  = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds')

mongoose.connect('mongodb+srv://Josh-Dev:Alana_2001@joshua.wbl0vjk.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})
 
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
res.render('home')
})

app.get('/campgrounds', async (req, res) => {
const campgrounds =  await Campground.find({})
res.render('campgrounds/index', {campgrounds});
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})