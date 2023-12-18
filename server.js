const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const {serverPort} = require('./config/key');
const app = express();

require('dotenv').config();

// Connect to the database
connectDB();

app.use(cors());

const userRoutes = require('./app/routes/userRoutes');

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // app.use(static('flexion-ui/build'));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'flexion-ui', 'build', 'index.html'));
    // });
// }
app.use('/api/users', userRoutes);

const port = process.env.PORT || serverPort;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});