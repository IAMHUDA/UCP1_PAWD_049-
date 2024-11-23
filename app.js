const express = require("express");
const app = express();
const path = require("path");
// Menggunakan middleware body-parser
const bodyParser = require("body-parser");


// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk parsing body form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route untuk pasien
const pasienRoutes = require("./routes/pasien"); // Mengarahkan ke rute pasien
app.use("/pasien", pasienRoutes);

const pasienLocalRouter = require('./routes/pasienlocal');
app.use('/local', pasienLocalRouter);

// Route untuk halaman utama (index)
app.get('/', (req, res) => {
    res.render('index', { title: 'Halaman Utama' });
});

// Menentukan port yang akan digunakan
const port = process.env.PORT || 4000; // Menggunakan port 4000
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
