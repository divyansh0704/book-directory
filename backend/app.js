const sequelize = require("./config/db");

const book = require("./models/book");

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/bookRoute")

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use("/api/books",routes)





sequelize
 .authenticate()
 .then(()=>console.log("mysql connected"))
 .catch((err)=>console.error("DB error",err));

sequelize.sync()
 .then(()=>console.log("Database Synced"))
 .catch((err)=>console.error("Sync error",err));

app.get("/", (req, res) => {
  res.send("🟢 Portfolio backend is running!");
});


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

