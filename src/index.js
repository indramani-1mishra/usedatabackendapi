const express = require('express');
const { PORT } = require('./config/serverconfig');
const connectdb = require('./config/databaseconfig');
const apirouter = require('./routes/apirouter');
const cookieParser = require("cookie-parser");
const app = express();

// ✅ Always add body parsers first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // for parsing cookies

// ✅ Then add your routes
app.use("/api", apirouter);

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; background-color:gray ">Hello World!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    connectdb(); // connect only after server starts
});
