const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  try {
    //buscar empresa
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;