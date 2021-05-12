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

const errorThrowID = ( id ) => {
    if(id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createLike = async (postId) => {
    errorThrowID(postId);

    const likeId = new ObjectId();
    const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let newLike = {
        _id: likeId,
        name: likeId,
        dateOfLike: utc,
    };

    const postCollection = await posts();

    const updatedInfo = await postCollection.updateOne(
        { _id: ObjectId(postId) },
        { $push: {"likes": newLike }}
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

const removeLike = async (id) => {
    errorThrowID(id);
    const postCollection = await posts();
    const deletionInfo = await postCollection.findOneAndUpdate(
        { likes: { $elemMatch : { _id : ObjectId(id) } } },
        { $pull: { likes: { _id: ObjectId(id) } }}
    );
    if (deletionInfo.modifiedCount === 0) throw `Could not delete like with id of ${id}`;

    return { postId: id, deleted: true };
}

module.exports = {
    createLike,
    getAllLikes,
    removeLike
};