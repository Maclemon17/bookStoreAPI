const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const routes = require("./routes/route");


const PORT = process.env.PORT;
const CONN_STR = process.env.URI || process.env.MONGODB_CONN_STR;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);


app.get('/', (req, res) => {
    res.status(200).json({ message: "welcome to Book Store API...." });
})


mongoose.connect(CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(`Error MongoDB cannot connect!!: ${err}`);
    } else {
        console.log("MongoDB Connected Sucessfully!!");
    }
});



app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`)
});