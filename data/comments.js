const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comments;
const posts = mongoCollections.posts;

const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const getPost = async (postId) => {
    const postsData = require('./posts');
    const postInfo = await postsData.getPost(postId);
    return postInfo
}

const errorThrowCreate = (body) => {
    if (body.rating === undefined || body.comment === undefined || body.username === undefined) {
        throw 'You must provide a value for all inputs.';
    }

    if (typeof (body.comment) !== "string" || body.comment === "" || typeof (body.username) !== "string" || body.username === "") {
        throw 'You must provide a valid string value for the comment and username.';
    }

    if (typeof (body.rating) !== "number" || body.rating < 1 || body.rating > 5 || body.rating % 1 !== 0) {
        throw 'You must provide a valid rating';
    }
}

const errorThrowID = (id) => {
    if (id === undefined || typeof (id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createComment = async (postId, body, userId) => {
    errorThrowCreate(body);
    errorThrowID(postId);
    errorThrowID(userId);

    const commentId = new ObjectId();
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let newComment = {
        _id: commentId,
        name: body.username,
        user_id: ObjectId(userId),
        rating: body.rating,
        comment: body.comment,
    };

    const postCollection = await posts();

    const updatedInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $push: { "comments": newComment } }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update post successfully';
    }

    const postInfo = await getPost(postId);

    return postInfo;
}

const getAllComments = async (postId) => {
    errorThrowID(postId);
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(postId) });

    if (!post) throw 'Could not find post with id of ' + postId;

    return post.comments;
}

const removeComment = async (id) => {
    errorThrowID(id);
    const postCollection = await posts();
    const deletionInfo = await postCollection.findOneAndUpdate(
        { comments: { $elemMatch: { _id: ObjectId(id) } } },
        { $pull: { comments: { _id: ObjectId(id) } } }
    );
    if (deletionInfo.modifiedCount === 0) throw `Could not delete comment with id of ${id}`;

    return { postId: id, deleted: true };
}

module.exports = {
    createComment,
    getAllComments,
    removeComment
};