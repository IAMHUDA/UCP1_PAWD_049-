const express = require('express');
const router = express.Router();

let pasienData = [
  { id: 1, nama: 'John Doe', jeniskelamin: 'Laki-laki', notelpon: '081234567890' },
];


router.get('/', (req, res) => {
  res.render('local', {
    pasien: pasienData,
    title: 'Daftar Pasien Local'
  });
});


router.get('/add', (req, res) => {
  res.render('addpasienlocal', {
    title: 'Tambah Pasien Baru'
  });
});

// Route to handle form submission and add a new patient
router.post('/add', (req, res) => {
  const { nama, jeniskelamin, notelpon } = req.body;

  // Validation checks
  if (!nama || !jeniskelamin || !notelpon) {
    return res.status(400).send('Semua field harus diisi');
  }

  // Simulate adding the new patient to local data
  const newPasien = {
    id: pasienData.length + 1,
    nama,
    jeniskelamin,
    notelpon,
  };
  pasienData.push(newPasien);

  res.redirect('/local'); // Redirect to the patient list after adding
});

// Route to handle editing a patient's details
router.put('/:id', (req, res) => {
  const pasienId = parseInt(req.params.id);
  const { nama, jeniskelamin, notelpon } = req.body;

  const pasienIndex = pasienData.findIndex(pasien => pasien.id === pasienId);
  if (pasienIndex === -1) {
    return res.status(404).send('Pasien tidak ditemukan');
  }

  // Update the patient's data
  pasienData[pasienIndex] = {
    id: pasienId,
    nama,
    jeniskelamin,
    notelpon,
  };

  res.status(200).send('Pasien berhasil diperbarui');
});

// Route to handle deleting a patient
router.delete('/:id', (req, res) => {
  const pasienId = parseInt(req.params.id);

  const pasienIndex = pasienData.findIndex(pasien => pasien.id === pasienId);
  if (pasienIndex === -1) {
    return res.status(404).send('Pasien tidak ditemukan');
  }

  // Remove the patient from the array
  pasienData.splice(pasienIndex, 1);

  res.status(200).send('Pasien berhasil dihapus');
});

module.exports = router;
