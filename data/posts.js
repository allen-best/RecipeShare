const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;

const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const errorThrowCreate = (body) => {
    if (body.type === undefined || body.postedDate === undefined || body.name === undefined || body.servings === undefined
        || body.time === undefined || body.tag === undefined || body.ingredients === undefined || body.steps === undefined) {
        throw 'You must provide a value for all inputs.';
    }

    // check for string inputs
    if (typeof (body.type) !== "string" || typeof (body.name) !== "string" || body.type === "" || body.name === "") {
        throw 'You must provide a valid string value for type and name.';
    }

    // check for number inputs
    if (typeof (body.time) !== "number" || typeof (body.servings) !== "number") {
        throw 'You must provide a number value for time and servings';
    }

    // check for array inputs
    if (!Array.isArray(body.tag) || !Array.isArray(body.ingredients) || !Array.isArray(body.steps)) {
        throw 'You must provide a array value for tag, ingredients and steps';
    }

    if (isNaN(Date.parse(body.postedDate))) throw 'You must provide a correct date';
}

const errorThrowID = (id) => {
    if (id === undefined || typeof (id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createPost = async (body) => {
    errorThrowCreate(body);

    const postCollection = await posts();

    let newPost = {
        type: body.type,
        postedDate: Date.parse(body.postedDate),
        name: body.name,
        servings: body.servings,
        time: body.time,
        tag: body.tag,
        ingredients: body.ingredients,
        steps: body.steps,
        likes: [],
        comments: []
    };

    const insertInfo = await postCollection.insertOne(newPost);
    if (insertInfo.insertedCount === 0) throw 'Could not add post';

    const newId = ObjectId(insertInfo.insertedId).toString();

    const post = await getPost(newId);
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

const getAllPosts = async () => {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
}

const getPost = async (id) => {
    errorThrowID(id);

    if (id === undefined) throw 'You must provide an ID';
    const postCollection = await posts();
    console.log(id);
    const post = await postCollection.findOne({ _id: ObjectId(id) });

    if (!post) throw 'Could not find post with id of ' + id;
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

const removePost = async (id) => {
    errorThrowID(id);

    let findPost = {
        _id: ObjectId(id)
    };

    const postCollection = await posts();
    const deletionInfo = await postCollection.deleteOne(findPost);

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete post with id of ${id}`;
    }

    return { postId: id, deleted: true };
}

const updatePost = async (id, body) => {
    errorThrowID(id);
    errorThrowCreate(body);

    const postCollection = await posts();
    const updatedPost = {
        title: body.title,
        author: body.author,
        genre: body.genre,
        datePublished: body.datePublished,
        summary: body.summary
    };

    const updatedInfo = await postCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updatedPost }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update post successfully';

    const post = await getPost(id);
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

const updatePartialPost = async (id, body) => {
    errorThrowID(id);

    const postCollection = await posts();

    const updatedInfo = await postCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: body }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Could not update post successfully';

    const post = await getPost(ObjectId(id).toString());
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

//update later
const postForHomepage = async () => {
    let recentPost = await getRecentPost();
    let popularPost = await getPopularPost();
    return {
        recentPost: recentPost,
        popularPost: popularPost
    }

}

const getRecentPost = async () => {
    return await getAllPosts();
}

const getPopularPost = async () => {
    return await getAllPosts();
}
const searchPost = async (keyword, type) => {
    return await getAllPosts();
}

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    removePost,
    updatePost,
    updatePartialPost,
    postForHomepage,
    searchPost,
    getRecentPost,
    getPopularPost
}
