const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require('body-parser')
require("./models/User");
require("./services/passport");


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json())

app.use(
  cookieSession({
    // 30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
 
});

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app)

if (process.env.NODE_ENV === 'production') {

  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 3001;
app.listen(PORT);

