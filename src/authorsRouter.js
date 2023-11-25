import express from 'express';
import { Author } from './models/authors.js'

const authorsRouter = express.Router();

authorsRouter.get('/test', async (req, res) => {
    // res.json({ message: "Author router working"})  

    const author = await Author.findById("656222e71768fad0c2a92186");
    res.json(author);
});

authorsRouter.get("/", async (req, res, next) => {
    try {
      const authors = await Author.find({});
      res.json(authors);
    } catch (error) {
      next(error);
    }
  });
  

authorsRouter.get("/:id", async (req, res, next) => {
 try {
 const { id } = req.params
 const author = await Author.findById(id);

    
    if (!author) {
        return res.status(404).send();
    }
https://github.com/luisanton-io/wdpt0323-first-express/blob/main/src/userRouter.js
    res.json(author);
    } catch (error) {
     next(error);
    }
});

authorsRouter.post('/', async (req, res, next) => {
    try {
        const newAuthor = new Author(req.body);

        await newAuthor.save();

        res.status(201).json(newAuthor);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
});


authorsRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
            new: true,
        });
            res.json(updatedAuthor);
    } catch (error) {
        next(error);
        }
    });


authorsRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (!deletedAuthor) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
});


export default authorsRouter