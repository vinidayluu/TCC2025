const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const IMAGES_FILE = path.join(__dirname, "imagens.json");

// Função para ler imagens do arquivo JSON
const readImages = () => {
    if (!fs.existsSync(IMAGES_FILE)) return [];
    const data = fs.readFileSync(IMAGES_FILE);
    return JSON.parse(data);
};

// Função para salvar imagens no arquivo JSON
const saveImages = (images) => {
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(images, null, 2));
};

// Rota principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "news.html"));
});

// Rota para obter imagens
app.get("/images", (req, res) => {
    res.json(readImages());
});

// Rota para adicionar imagem
app.post("/save-image", (req, res) => {
    const { url, title, caption } = req.body;
    if (!url) return res.status(400).send("URL é obrigatória.");

    const images = readImages();
    images.push({ url, title, caption });
    saveImages(images);

    res.send("Imagem adicionada!");
});

// Rota para excluir imagem (apenas admin)
app.delete("/delete-image/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const images = readImages();

    if (index < 0 || index >= images.length) {
        return res.status(400).send("Índice inválido.");
    }

    images.splice(index, 1);
    saveImages(images);

    res.send("Imagem removida.");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});







