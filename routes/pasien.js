const express = require("express");
const router = express.Router();
const db = require("../database/db");


router.get("/", (req, res) => {
  db.query("SELECT * FROM pasien", (err, pasien) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    res.render("pasien", {
      title: "Daftar Pasien",
      pasien: pasien,
    });
  });
});


router.get("/add", (req, res) => {
  res.render("addpasien", { title: "Tambah Pasien" });
});


router.post("/add", (req, res) => {
  const { nama, jeniskelamin, notelpon } = req.body;

  if (!nama || !jeniskelamin || !notelpon) {
    return res.status(400).send("Semua data (nama, jenis kelamin, dan no telpon) wajib diisi");
  }

  db.query(
    "INSERT INTO pasien (nama, jeniskelamin, notelpon) VALUES (?, ?, ?)",
    [nama.trim(), jeniskelamin.trim(), notelpon.trim()],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      res.redirect("/pasien"); 
    }
  );
});


router.put("/:id", (req, res) => {
  const { nama, jeniskelamin, notelpon } = req.body;

  if (!nama || !jeniskelamin || !notelpon) {
    return res.status(400).send("Semua data (nama, jenis kelamin, dan no telpon) wajib diisi");
  }

  db.query(
    "UPDATE pasien SET nama = ?, jeniskelamin = ?, notelpon = ? WHERE id = ?",
    [nama.trim(), jeniskelamin.trim(), notelpon.trim(), req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      if (result.affectedRows === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.json({ id: req.params.id, nama, jeniskelamin, notelpon });
    }
  );
});


router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM pasien WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Internal server error");
      if (result.affectedRows === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.status(204).send(); 
    }
  );
});

module.exports = router;
