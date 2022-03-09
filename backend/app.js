const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patients.route");

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/Patient", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  app.use((req, res, next) => {
    // res.setHeader("Content-Type': 'application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist/UI/googelSignin')));
app.use("/api", patientRoutes);
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/googelSignin/index.html'));
// });

app.use('/show-patient', (req, res)=>{
    res.send('Hi')
  }
)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
})
