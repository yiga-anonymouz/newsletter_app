require('dotenv').config()
const express = require('express')
const { render } = require('ejs')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

const mailchimp = require("@mailchimp/mailchimp_marketing");


mailchimp.setConfig({
  apiKey: process.env.APIKEY,
  server: "us21",
});

app.get('/', (req , res) => {
    res.render(`index`)
})

app.post('/', (req , res) => {

  const mailchimp = require("@mailchimp/mailchimp_marketing");

  mailchimp.setConfig({
    apiKey: process.env.APIKEY,
    server: "us21",
  });
  
  const firstName = req.body.name 
  const email = req.body.email

  const run = async () => {
    const response = await mailchimp.lists.addListMember("2855e0f6ef", {
      email_address: email,
      status: "pending",
      merge_fields: {
        FNAME: firstName,
      }
    });
    console.log(response);
    render('index')
};

run();

})

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();

app.listen(PORT, () => {
    console.log('Server Up and running')
})