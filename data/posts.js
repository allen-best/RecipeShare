const mongoCollections = require('../config/mongoCollections');
const posts = mongoCollections.posts;
const users = mongoCollections.users;

const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectID;

const errorThrowCreate = (body) => {
    if (body.type === undefined || body.postedDate === undefined || body.name === undefined || body.servings === undefined ||
        body.cook_time === undefined || body.ingredients === undefined || body.steps === undefined || body.prepare_time === undefined || body.author_name === undefined) {
        throw 'You must provide a value for all inputs.';
    }

    // check string inputs are strings
    if (typeof(body.type) !== "string" || typeof(body.name) !== "string" || typeof(body.ingredients) !== "string" || typeof(body.author_name) !== "string" ||
        body.type === "" || body.name === "" || body.ingredients === "" || body.author_name === "") {
        throw 'You must provide a valid string value for type and name.';
    }

    // check number inputs are numbers
    if (typeof(body.cook_time) !== "number" || typeof(body.servings) !== "number" || typeof(body.prepare_time) !== "number") {
        throw 'You must provide a number value for time and servings';
    }

    //check cook time and prepare time values are not less than or equal to zero
    if (body.cook_time <= 0 || body.prepare_time <= 0) {
        throw 'Error: recipe times should be greater than 0';
    }

    // check for array inputs
    if (!Array.isArray(body.steps)) {
        throw 'You must provide a array value for steps';
    }

    //check for date input
    if (isNaN(Date.parse(body.postedDate))) throw 'You must provide a correct date';
}

const errorThrowID = (id) => {
    if (id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: Invalid ID.'
}

const createPost = async(body) => {
    errorThrowCreate(body);
    errorThrowID(body.author_id);

    const postCollection = await posts();

    let newPost = {
        type: body.type,
        postedDate: Date.parse(body.postedDate),
        name: body.name,
        author_id: ObjectId(body.author_id),
        author_name: body.author_name,
        servings: body.servings,
        prepare_time: body.prepare_time,
        cook_time: body.cook_time,
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


    //add to user.createdPosts

    let newPostHistory = {
        post_id: ObjectId(updatedIdPost._id),
        recipe_name: updatedIdPost.name,
        postedDate: updatedIdPost.postedDate
    }

    const userCollection = await users();
    const updatedInfo = await userCollection.updateOne({ _id: ObjectId(updatedIdPost.author_id) }, { $push: { "createdPosts": newPostHistory } });
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update user successfully';
    }

    return updatedIdPost;
}

const getAllPosts = async() => {
    const postCollection = await posts();
    return await postCollection.find({}).toArray();
}

const getPost = async(id) => {
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

const removePost = async(id) => {
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

const updatePost = async(id, body) => {
    errorThrowID(id);
    errorThrowCreate(body);

    const postCollection = await posts();
    const updatedPost = {
        type: body.type,
        postedDate: Date.parse(body.postedDate),
        name: body.name,
        author_id: ObjectId(body.author_id),
        author_name: body.author_name,
        servings: body.servings,
        prepare_time: body.prepare_time,
        cook_time: body.cook_time,
        ingredients: body.ingredients,
        steps: body.steps
    };

    const updatedInfo = await postCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedPost });
    if (updatedInfo.modifiedCount === 0) throw 'Could not update post successfully';

    const post = await getPost(id);
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

const updatePartialPost = async(id, body) => {
    errorThrowID(id);

    const postCollection = await posts();

    const updatedInfo = await postCollection.updateOne({ _id: ObjectId(id) }, { $set: body });
    if (updatedInfo.modifiedCount === 0) throw 'Could not update post successfully';

    const post = await getPost(ObjectId(id).toString());
    let updatedIdPost = post;
    updatedIdPost._id = ObjectId(updatedIdPost._id).toString();
    return updatedIdPost;
}

const postForHomepage = async() => {
    let recentPost = await getRecentPost();
    let popularPost = await getPopularPost();
    return {
        recentPost: recentPost,
        popularPost: popularPost
    }

}

const getRecentPost = async() => {
    let posts = await getAllPosts();

    function sortByDate(a, b) {
        if (a.postedDate > b.postedDate) {
            return -1;
        } else if (a.postedDate < b.postedDate) {
            return 1;
        }
        return 0
    }
    posts.sort(sortByDate);
    let result = [];
    for (let i = 0; i < posts.length; i++) {
        result.push(posts[i]);
        if (result.length >= 10) {
            return result;
        }
    }
    return result;
}

const getPopularPost = async() => {
    let posts = await getAllPosts();

    function sortByLike(a, b) {
        return b.likes.length - a.likes.length;
    }
    posts.sort(sortByLike);
    let result = [];
    for (let i = 0; i < posts.length; i++) {
        result.push(posts[i]);
        if (result.length >= 10) {
            return result;
        }
    }
    return result;
}


const searchPost = async(keyword, type) => {
    if (!keyword || !type) {
        throw 'You must provide a value for all inputs.';
    }
    if (typeof(keyword) !== "string" || typeof(type) !== "string") {
        throw 'You must provide a valid string value for keyword and type.';
    }
    const postCollection = await posts();
    await postCollection.createIndexes({
        name: 'text',
        steps: 'text',
        ingredients: 'text'
    });
    let result;
    if (type === 'food') {
        result = await postCollection.find({ $text: { $search: keyword }, "type": "Food" }).toArray();
    } else if (type === 'drink') {
        result = await postCollection.find({ $text: { $search: keyword }, "type": "Drink" }).toArray();
    } else {
        result = await postCollection.find({ $text: { $search: keyword } }).toArray();
    }
    return result;
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