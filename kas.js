const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua kas
router.get("/", (req, res) => {
  db.query("SELECT * FROM kas ORDER BY tanggal DESC", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// GET kas by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM kas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(result[0]);
  });
});

// POST tambah kas
router.post("/", (req, res) => {
  const { jenis, tanggal, keterangan, jumlah } = req.body;
  db.query(
    "INSERT INTO kas (jenis, tanggal, keterangan, jumlah) VALUES (?, ?, ?, ?)",
    [jenis, tanggal, keterangan, jumlah],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Data kas berhasil ditambahkan", id: result.insertId });
    }
  );
});

// PUT update kas
router.put("/:id", (req, res) => {
  const { jenis, tanggal, keterangan, jumlah } = req.body;
  const id = req.params.id;
  db.query(
    "UPDATE kas SET jenis=?, tanggal=?, keterangan=?, jumlah=? WHERE id=?",
    [jenis, tanggal, keterangan, jumlah, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Data kas berhasil diupdate" });
    }
  );
});

// DELETE hapus kas
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM kas WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Data kas berhasil dihapus" });
  });
});

module.exports = router;
