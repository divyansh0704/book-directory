const express = require("express");
const router = express.Router();

const {addBooks,getBooks,deleteBook} = require("../controllers/bookController");

router.post("/",addBooks);
router.get("/",getBooks);
router.delete("/:id",deleteBook);

module.exports=router;