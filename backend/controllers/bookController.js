const book = require("../models/book");

exports.addBooks = async (req,res)=>{
    const{title,author} = req.body;
    if(!title || !author){
        return res.status(400).json({message:"title and author are required"});
    }
    try{
        const newbook = await book.create({title,author});
        res.status(201).json({message:"book added successfully",newbook});


    }catch{
        res.status(500).json({message:"error adding book"});

    }
}

exports.getBooks = async (req,res) =>{
    const {author} = req.query;
    const where = author ? {author} : {};
    try{
        const books = await book.findAll({where})
        res.status(200).json({books});

    }catch{
        res.status(500).json({message:"error fetching books"});

    }
}

exports.deleteBook = async (req,res) =>{
    const { id } = req.params;

    try{
        const rows = await book.destroy({ where: { id } });
        if(!rows) return res.status(404).json({message:"book not found"});
        res.status(200).json({message:"book deleted successfully",rows});



    }catch{
        res.status(500).json({message:"error deleting book"});
    }
}