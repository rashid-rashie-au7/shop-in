const express = require('express');
const session = require('express-session');
const morgan =require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator =require('express-validator')
const cors = require('cors');

const app = express();
const PORT = 4000;

require('./config/database');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

const indexRouter = require('./routes/index.route')
const sellerRouter = require('./routes/seller.route')
const buyerRouter = require('./routes/buyer.route')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 15*60*1000 }
    })
)

app.listen(PORT, () => console.log('Listening on Port:', PORT));

app.use('/',indexRouter);
app.use('/',buyerRouter);
app.use('/',sellerRouter);