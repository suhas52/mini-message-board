const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

const corsOptions = {
    origin: "http://localhost:5173",
}

app.use(cors(corsOptions));

app.get("/api/messages", (req, res) => {
    filePath = path.join(__dirname, "messages.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log("error reading file");
            return res.status(500).send("API error");
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData)
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            res.status(500).json({ error: "Invalid JSON format" });
        }
    })
})

app.use(express.json())
app.post("/api/messages", (req, res) => {
  try {
    const { author, message } = req.body;

    if (!author || !message) {
      return res.status(400).json({ error: "author and message required" });
    }
    dataPath = path.join(__dirname, "messages.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    const newId = data.messages.length
      ? data.messages[data.messages.length - 1].id + 1
      : 1;

    const newMessage = { id: newId, author, message };
    data.messages.push(newMessage);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");

    res.status(201).json({ message: "Message added!", newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to write to file" });
  }
});

app.listen(8080, () => {
    console.log("server started");
});