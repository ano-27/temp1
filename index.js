// creating server using express

const express = require('express');
const { dbConnection } = require('./model/index.js');
const cookie = require('cookie-parser');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Uncomment these when you create your route files
const apiRouter = require('./route/apiRoutes.js');
// const viewRouter = require('./route/viewRoutes.js');

const app = express();

app.use(cors({
    origin: 'http://192.168.0.127:8089',
    credential: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Uncomment these when you create your route files
app.use('/api', apiRouter);
// app.use('/', viewRouter);

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running successfully!' });
});

const startServer = async () => {
    try {
        await dbConnection(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
        app.listen(8089, '0.0.0.0', () => {
            console.log('Server is running at:', 8089);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
}

startServer();