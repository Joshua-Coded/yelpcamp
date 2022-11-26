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


app.use(express.urlencoded({extended: true}));



app.get('/', (req, res) => {
res.render('home')
})

app.get('/campgrounds', async (req, res) => {
const campgrounds =  await Campground.find({})
res.render('campgrounds/index', {campgrounds});
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async (req, res) => {   
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});

});


app.listen(3000, () => {
    console.log('listening on port 3000')
})