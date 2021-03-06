const { createServer } = require('http');

const createRoutes  = require('./routes/routes');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();
const cs = require('./core/socket');



const app = express();

app.use(cors());
app.use(bodyParser.json());


const http = createServer(app);
const io = cs(http);

createRoutes(app, io);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    http.listen(port, () => console.log(`Server started on port: ${port}`));
});
