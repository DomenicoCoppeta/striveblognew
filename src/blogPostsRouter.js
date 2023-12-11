import express from 'express';
import { BlogPost } from './models/blogPosts.js';
import { Comment  } from './models/comments.js';
import { checkAuth } from './middlewares/checkAuth.js';


const blogPostsRouter = express.Router();

// blogPostsRouter.use(checkAuth);

blogPostsRouter.get('/test', async function testMiddleware(req, res) {
    res.json({ message: "BlogPosts router working"})  
})

.get("/", async (req,  res, next) => {
    try {
      const blogPosts = await BlogPost.find({}).populate(
        "author",
        "-_id nome cognome avatar"
    );
      res.json(blogPosts);
    } catch (error) {
      next(error);
    }
  })


.get("/:id", async (req, res, next) => {
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
})

.post('/', checkAuth, async (req, res, next) => {
    try {
        const newBlogPost = new BlogPost(req.body);
        
        await newBlogPost.save();
        
        res.status(201).json(newBlogPost);
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
})


.put('/:id', checkAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        
        const updatedComment = await BlogPost.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedComment);
    } catch (error) {
        next(error);
    }
})


.delete('/:id', checkAuth, async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
        
        if (!deletedBlogPost) {
            res.status(404).send();
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
  })

  .get("/:id/comments", async (req, res, next) => {
  try {
    const { id } = req.params
    const comments = await BlogPost.findById(id).select('comments -_id')
    res.json(comments);
  } catch (error) {
    next(error);
  }
  })
  
  .get("/:id/comments/:commentid", async (req, res, next) => {
    try {
      const { id, commentid } = req.params;
 
      const blogPost = await BlogPost.findById(id, { comments: { $elemMatch: { _id: commentid } } });
  
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      if (!blogPost.comments || blogPost.comments.length === 0) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      const comment = blogPost.comments[0];
      res.json(comment); 
    } catch (error) {
      console.error(error); 
      next(error);
    }
  })

  .put("/:id/comments/:commentid", checkAuth, async (req, res, next) => {
  try {
    const { id, commentid } = req.params
    const text = req.body.text
    const updatedBlogPost = await BlogPost.findOneAndUpdate(
      { "_id": id, "comments._id": commentid},
      {
        $set: {
          "comments.$.text": text,
        },
      },
      {
        new: true
      }
      );
      if (!updatedBlogPost) {
        return res.status(404).send();
      }
      res.json(updatedBlogPost.comments);
    } catch (error) {
      next(error);
    }
  })
  

  .post('/:id/comments', checkAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { author, text } = req.body;
      const blogPost = await BlogPost.findById(id);
      
      if (!blogPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const newComment = new Comment({
        author,
        text,
      });

      blogPost.comments.push(newComment);

      await blogPost.save();
      
      res.status(201).json(newComment);
    } catch (error) {
      error.statusCode = 400;
      next(error);
    }
  })
  
  .delete("/:id/comments/:commentid", checkAuth, async (req, res, next) => {
    try {
        const { id, commentid } = req.params;
        const updatedBlogPost = await BlogPost.findOneAndUpdate(
            { "_id": id },
            { $pull: { comments: { _id: commentid } } },
            { new: true }
        );

        if (!updatedBlogPost) {
            return res.status(404).json({ message: 'Post not found' });
        } else {
            res.status(204).send();
        }
    } catch (error) {
        next(error);
    }
});



  
  export default blogPostsRouter