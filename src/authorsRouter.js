import express from 'express';
import { Author } from './models/authors.js'
import { checkAuth } from './middlewares/checkAuth.js';
import bcrypt from "bcrypt";

const authorsRouter = express.Router();

// authorsRouter.use(checkAuth);

authorsRouter.get('/test', async function testMiddleware(req, res) {
    res.json({ message: "Authors router working"})  

});

authorsRouter.get("/", async (req,  res, next) => {
    try {
      const authors = await Author.find({});
      res.json(authors);
    } catch (error) {
      next(error);
    }
  })
  

.get("/:id", async (req, res, next) => {
 try {
 const { id } = req.params
 const author = await Author.findById(id);

    if (!author) {
        return res.status(404).send();
    }
    res.json(author);
    } catch (error) {
     next(error);
    }
})

.post('/', checkAuth, async (req, res, next) => {
    // const password = 
    try {
        const newAuthor = new Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
})


.put('/:id', checkAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
            new: true,
        });
            res.json(updatedAuthor);
    } catch (error) {
        next(error);
        }
    })


.delete('/:id', checkAuth, async (req, res, next) => {
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