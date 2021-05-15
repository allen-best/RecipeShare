const mongoCollections = require('../config/mongoCollections');
const likes = mongoCollections.likes;
const posts = mongoCollections.posts;

const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const getPost = async (postId) => {
    const postsData = require('./posts');
    const postInfo = await postsData.getPost(postId);
    return postInfo
}

const errorThrowID = (id) => {
    if (id === undefined || typeof (id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const errorThrowName = (username) => {
    if (username === undefined || typeof (username) !== "string" || username === "") throw 'Error: Invalid username.'
}

const createLike = async (postId, username, userId) => {
    errorThrowID(postId);
    errorThrowName(username);
    errorThrowID(userId);

    //check if user already like this post
    let liked = await getLikeByUserId(postId, userId);
    if (liked !== null) throw 'Already liked';


    const likeId = new ObjectId();
    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let newLike = {
        _id: likeId,
        name: username,
        author_id: ObjectId(userId),
        dateOfLike: utc,
    };

    const postCollection = await posts();

    const updatedInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $push: { "likes": newLike } }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update post successfully';
    }

    const postInfo = await getPost(postId);

    return postInfo;
}

const getAllLikes = async (postId) => {
    errorThrowID(postId);
    const postCollection = await posts();
    const post = await postCollection.findOne({ _id: ObjectId(postId) });

    if (!post) throw 'Could not find post with id of ' + postId;

    return post.likes;
}
const getLikeByUserId = async (postId, userId) => {
    errorThrowID(postId);
    errorThrowID(userId);
    const postCollection = await posts();
    const like = await postCollection.findOne({ _id: ObjectId(postId), 'likes.author_id': ObjectId(userId) });
    //return post if already like, return null if have not like
    return like;
}

const removeLike = async (postId, userId) => {
    errorThrowID(postId);
    errorThrowID(userId);
    const postCollection = await posts();

    //check if exist like in this post
    let liked = await getLikeByUserId(postId, userId);
    if (liked === null) throw 'no like in this post';

    const deletionInfo = await postCollection.updateOne({ _id: ObjectId(postId), 'likes.author_id': ObjectId(userId) },
        { $pull: { "likes": { "author_id": ObjectId(userId) } } });

    console.log(deletionInfo.modifiedCount);
    if (deletionInfo.modifiedCount === 0) throw `Could not delete like with userId of ${userId}`;

    return { postId: postId, deleted: true };
}

module.exports = {
    createLike,
    getAllLikes,
    removeLike,
    getLikeByUserId
};