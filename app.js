const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pasienRoutes = require("./routes/pasien"); 
app.use("/pasien", pasienRoutes);

const pasienLocalRouter = require('./routes/pasienlocal');
app.use('/local', pasienLocalRouter);

app.get('/', (req, res) => {
    res.render('index', { title: 'Halaman Utama' });
});

const port = process.env.PORT || 4000; 
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
