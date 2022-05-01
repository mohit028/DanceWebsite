const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
app.use(express.json());
 mongoose.connect('mongodb://localhost/contactDance');

const port = 80;

//define mongoose schema
const contactSchema = new mongoose.Schema({
   name: {type: String,
    require: true },

    address: {type: String,
        require: true },

    phone: {type: Number,
            require: true }

  });
const contact = mongoose.model('contact', contactSchema);


// For serving static files
app.use('/static', express.static('static'))
//app.use(express.urlencoded())
app.set('view engine', 'pug')//set the template engine as pug


// Set the views directory
app.set('views', path.join(__dirname, 'views'))

//our pug demo endpoint

app.get('/',(req, res)=>{
    const params ={  } 
    res.status(200).render('index.pug', params)
})

app.get('/contact',(req, res)=>{
    
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
    const {name,phone}=req.body
    console.log(req.body)
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
});
    //res.status(200).render('contact.pug');

})
app.listen(port, ()=>{
    console.log(`The application started successfully at port ${port}`)
})
