const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 8000;
const mongoose = require('mongoose');


app.use(cors());
app.use(express.json());

// let data = [{
//               name: "Node.js E-Commerce App REST API with MongoDB | Shopping API with Stripe & JWT",
//               desc: "Node MongoDB eCommerce Rest API using Stripe payment method. Node.js shopping API tutorial using express, MongoDB, and JWT for beginners.",
//               imgUrl: "https://i.ytimg.com/vi/rMiRZ1iRC0A/maxresdefault.jpg",
//               ytLink: "https://www.youtube.com/watch?v=rMiRZ1iRC0A",
//             },
//             {
//               name: '2021 YEAR END MASHUP - SUSH & YOHAN (BEST 130+ SONGS OF 2021)',
//               desc: `Goodbye, 2021.  "We've all gone through some of our darkest times this year, but we have also found our own ways to keep going. This year might not be the best year for some of us as it broke you but healed as well, resisted your growth but not you.  The new year wouldn't change anything, but it definitely brings a sense of optimism  - to escape our undeniable reality into our dream world, of our own!"`,
//               imgUrl: 'https://i.ytimg.com/vi/uX7PFOsG4F4/maxresdefault.jpg',
//               ytLink: 'https://www.youtube.com/watch?v=uX7PFOsG4F4'
//             }
// ];

const schema = new mongoose.Schema({
  title: String,
  desc: String,
  img: String,
  tag: String,
  channel: String,
});


var YtPosts = mongoose.model('ytposts',schema);

app.get('/', (req, res) => {
  YtPosts.find({},(err,result)=>{res.status(200).json(result.reverse())});
})

app.get('/user', (req, res) => {
  res.json('Rahul Jaikar');
//   res.sendFile(path.join(__dirname, 'index.html'));
})

const CONNECTION_URL = 'boom';

app.post('/post', (req, res) => {
  const { title, imageUrl, desc, channel, tag, } = req.body; 
  // const img = req.body.img;
  console.log(req.body);
  // console.log(img);
  // console.log(req.body.img);

  const ytpost = new YtPosts(
      {
        title,
        desc,
        img: imageUrl,
        tag,
        channel,
      }
    );

  // const ytpost = new YtPosts( req.body );


  ytpost.save().then(() => {
    res.json(req.body);
  }).catch((err) => res.json({error : "Can't save to mongo!"}));
})

app.listen(port , ()=> {
  console.log(`Example app listening at http://localhost:${port}`)
  mongoose.connect(CONNECTION_URL,{
      useNewUrlParser: true ,
      useUnifiedTopology: true
  }).then(()=>{
      console.log('Connection Succesful !!!')
  }).catch((err)=> console.log(err))
})
