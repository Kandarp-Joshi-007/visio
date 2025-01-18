const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
require("./models/form");

// Increase payload size limit (e.g., 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(require("./routes/UploadRoute"));

app.get("/", (req, res) => {
  res.json("Aaiye Apka Intezar tha");
});





  // Start the server
  app.listen(PORT, () => {
    console.log("Server is running on:", PORT);
  });

