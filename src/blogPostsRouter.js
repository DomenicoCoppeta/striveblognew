import express from 'express';
import { BlogPost } from './models/blogPosts.js';
import { checkAuth } from './middlewares/checkAuth.js';

const blogPostsRouter = express.Router();

// blogPostsRouter.use(checkAuth);

blogPostsRouter.get('/test', async function testMiddleware(req, res) {
    res.json({ message: "BlogPosts router working"})  

    // const blogPost = await BlogPost.findById("656222e71768fad0c2a92186");
    // res.json(blogPost);
});

blogPostsRouter.get("/", async (req,  res, next) => {
    try {
      const blogPosts = await BlogPost.find({});
      res.json(blogPosts);
    } catch (error) {
      next(error);
    }
  });
  

blogPostsRouter.get("/:id", async (req, res, next) => {
 try {
 const { id } = req.params
 const blogPost = await BlogPost.findById(id);

    
    if (!blogPost) {
        return res.status(404).send();
    }
    res.json(blogPost);
    } catch (error) {
     next(error);
    }
});

blogPostsRouter.post('/', checkAuth, async (req, res, next) => {
    try {
        const newAuthor = new BlogPost(req.body);

        await newAuthor.save();

        res.status(201).json(newAuthor);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
});


blogPostsRouter.put('/:id', checkAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        
        const updatedAuthor = await BlogPost.findByIdAndUpdate(id, req.body, {
            new: true,
        });
            res.json(updatedAuthor);
    } catch (error) {
        next(error);
        }
    });


blogPostsRouter.delete('/:id', checkAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAuthor = await BlogPost.findByIdAndDelete(id);

        if (!deletedAuthor) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
});


export default blogPostsRouter