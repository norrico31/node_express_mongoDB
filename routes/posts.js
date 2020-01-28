const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Post = require('../models/Post');

// POST OR INSERT TO DATABASE
router.post('/posting', async(req, res) => {
    console.log(req.body);
    const schema = {
        title: Joi.string().min(4).required(),
        desc: Joi.string().min(4).required()
    }
    const result = Joi.validate(req.body, schema);
    if(result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc
    });
    
    try {
        const postSaved = await post.save();
        res.json(postSaved);
    } catch(err) {
        res.json({ msg: err });
    }
});

// GET OR RETRIEVE DATA FROM DATABASE
router.get('/', async(req, res) => {
    console.log(req.body);
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({ msg: err });
    }
})

// GET OR RETRIEVE SINGLE DATA FROM DATABASE
router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({ msg: err });
    }
})

// DELETE DATA FROM DATABASE
router.delete('/:postId', async(req, res) => {
    try {
       const removePost = await Post.deleteOne({_id: req.params.postId});
       res.json(removePost);
    } catch(err) {
        res.json({ msg: err });
    }
})


// UPDATE A POST
router.patch('/:postId', async(req, res) => {
    try{
        const updatePost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title }});
        res.json(updatePost);
    } catch(err) {
        res.json({ msg: err });
    }
})

module.exports = router;