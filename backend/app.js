const express = require("express");
const app = express();
const cors = require("cors");

const qrcode = require("qrcode");

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.status(200).json({
    "message": "hi"
  });
})

app.post("/scan", (req, res) => {
  const url = req.body.url;
  if(url.length === 0 )
  res.json({
   "message":"Enter text"
  });

  qrcode.toDataURL(url, (err, qr) => {
    res.json(qr);
  });

});

app.post("/upiqr", async (req, res) => {
  const data = {
    name: req.body.name,
    vpa: req.body.vpa
  }
  // Getting UPI QR Code from NPCI's POST API
  const responseData = await fetch("https://upiqr.in/api/qr", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    }
   });

  // Converting response to text
  const image = await responseData.text();

  res.send(image)
   
})

app.listen(4000, () => {
  console.log("Server started at Port 4000")
})