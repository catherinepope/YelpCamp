const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
   for (let i = 0; i < 300; i++) {
       const random1000 = Math.floor(Math.random() * 1000);
       const price = Math.floor(Math.random() * 20) + 10;
       const camp = new Campground({
           author: '6172e987197928cb6a7d713a',
           location: `${cities[random1000].city}, ${cities[random1000].state}`,
           title: `${sample(descriptors)} ${sample(places)}`,
           description: 'LoLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt pulvinar sagittis. Donec posuere, odio sed imperdiet dignissim, nisl lorem ullamcorper nulla, non lacinia mauris mi at arcu. Etiam ornare ultricies lobortis. Sed pharetra purus at magna finibus, vitae molestie diam dignissim. In rutrum tristique erat sit amet accumsan. Nulla id consequat enim, a mattis justo. Curabitur fermentum tempor ex, eu pellentesque sem dapibus eget.',
           price,
           geometry: {
             type: "Point",
             coordinates: [
               cities[random1000].longitude,
               cities[random1000].latitude,
              ]
           },
           images: [
            {
              url: 'https://res.cloudinary.com/deeeyjrkx/image/upload/v1635324533/YelpCamp/bc0rluopridmvk11zwdz.jpg',
              filename: 'YelpCamp/bc0rluopridmvk11zwdz'
            },
            {
              url: 'https://res.cloudinary.com/deeeyjrkx/image/upload/v1635324533/YelpCamp/izhpf7nrzsrhynppkves.jpg',
              filename: 'YelpCamp/izhpf7nrzsrhynppkves'
            },
            {
              url: 'https://res.cloudinary.com/deeeyjrkx/image/upload/v1635324533/YelpCamp/hpvd9v2bi6vvjhztgpii.jpg',
              filename: 'YelpCamp/hpvd9v2bi6vvjhztgpii'
            }
          ]
       })
       await camp.save();
   }
}

seedDB().then(() => {
    mongoose.connection.close();
});