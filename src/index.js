const express = require('express');
const { PORT } = require('./config/serverconfig');
const connectdb = require('./config/databaseconfig');


const app = express();
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1 style="text-align: center; background-color:gray ">Hello World!</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
    // Connect to the database only when the server is running
    connectdb();
  });