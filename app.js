var express = require('express'),
  mongoose = require('mongoose'),
  promisify = require('es6-promisify'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  flash = require('connect-flash'),
  Plainte = require('./models/plainte'),
  Investigation = require('./models/investigation'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  User = require('./models/user'),
  htmltoText = require('html-to-text'),
  nodemailer = require('nodemailer'),
  juice = require('juice')

require('dotenv').config()

var plainteRoute = require('./routes/plaints'),
  investigationRoute = require('./routes/investigations'),
  indexRoute = require('./routes/index'),
  excelRoute = require('./routes/convertxls')

//++++++++++++++++++
// APP CONFIGURATION
//++++++++++++++++++

var app = express()

// SERVING THE CSS SHEETS
app.use(express.static('public'))

// EJS FILE

app.set('view engine', 'ejs')

//BDY PARSER(passing form body value)

app.use(bodyParser.urlencoded({ extended: true }))

//   CONNECT FLASH
app.use(flash())

// PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'I Love Nodes',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// getting current user from passport , then passing it up to all the templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  res.locals.info = req.flash('info')
  res.locals.some = req.flash('some')

  next()
})

//++++++++++++++++++
//DATABASE CONNECTION
//++++++++++++++++++

// When you need a backup when the environment variables get messed up!
//var url = process.env.DATABASEURL || "mongodb://alice:C0ncern!@ds125073.mlab.com:25073/crm";

mongoose.connect(process.env.DB, { useNewUrlParser: true })

//mongoose.connect("mongodb://alice:C0ncern!@ds125073.mlab.com:25073/crm");

app.use(methodOverride('_method'))

// Routes config

app.use(plainteRoute)
app.use(investigationRoute)
app.use(indexRoute)
app.use(excelRoute)

// import  invironmental variables rom our variables env file
require('dotenv').config({ path: 'variables.env' })

// MAIL SERVER

//SERVER CONFIG
app.listen(8000, process.env.IP, function () {
  console.log('The CRM app is up!')
})
