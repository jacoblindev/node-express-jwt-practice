const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const corsOption = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

// Routs
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Jacob's node api...!!!" });
});

require('./routes/auth_routes')(app);
require('./routes/user_routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
};