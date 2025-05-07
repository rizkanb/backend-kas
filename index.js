const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // ← PENTING, agar bisa baca req.body JSON

// Routing
const kasRoute = require("./routes/kas");
app.use("/kas", kasRoute);

app.get("/", (req, res) => {
    res.send("API Kas aktif. Silakan akses /kas untuk data kas.");
  });  

  app.use(express.static("public"));

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
