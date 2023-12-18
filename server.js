import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import connectDB from './config/database';
import { serverPort } from './config/key';

const app = express();

require('dotenv').config();

// Connect to the database
connectDB();

app.use(cors());

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // app.use(static('flexion-ui/build'));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'flexion-ui', 'build', 'index.html'));
    // });
// }

const port = process.env.PORT || serverPort;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});