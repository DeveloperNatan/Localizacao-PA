const express = require("express");
const router = express.Router();
const service = require("./service/service");
const path = require("path");
const htmlPath = path.join(__dirname, "../frontend/src/html/");

router.get("/", (req, res) => {
  res.sendFile(path.join(htmlPath, "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(htmlPath, "login.html"))
})

router.post("/create", async (req, res) => {
  await service.Cadastro(req, res);
});

router.post("/delete", async (req, res) => {
  await service.Delete(req, res);
});

router.post("/update", async (req, res) => {
  await service.Edicao(req, res);
});

module.exports = router;
