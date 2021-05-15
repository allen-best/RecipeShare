//file will be used for the users of recipe share (backend)

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
//const recipes = require('./recipes');

const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid')

const showErrorsMost = (body) => {
    //show error when any required field is missing
    if (body.firstName === undefined || body.lastName === undefined || body.email === undefined || body.gender === undefined || body.city === undefined || body.state === undefined || body.age === undefined || body.hashedPassword === undefined) {
        //MIGHT HAVE TO GET RID OF HASHED PASSWORD FROM LINE ABOVE
        throw 'Error: must provide all required fields';
    }

    //makes sure all values are of correct type
    if (typeof(body.firstName) !== "string" || typeof(body.lastName) !== "string" || typeof(body.email) !== "string" || typeof(body.gender) !== "string" || typeof(body.city) !== "string" || typeof(body.state) !== "string" || typeof(body.age) !== "string" || typeof(body.hashedPassword) !== "string") {
        throw 'Error: must input correct types of values for required fields';
    }

    //makes sure user does not input whitespace/only spaces as input values
    if (body.firstName === "" || body.lastName === "" || body.email === "" || body.gender === "" || body.city === "" || body.state === "" || body.age === "" || body.hashedPassword === "") {
        throw 'Error: cannot enter spaces as values for required fields'
    }

    //makes sure likedPosts and createdPosts are arrays - cannot show error if either array has a length < 0 because user might just not have liked or created any posts
    if (!Array.isArray(body.likedPosts) || !Array.isArray(body.createdPosts)) {
        throw 'Error: must input correct types of values for required fields';
    }
}

//does all checking for id field
const showErrorsID = (id) => {
    if (id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: the respective ID is invalid'
}

const createUser = async(body) => {
    showErrorsMost(body);

    const userCollection = await users();

    let newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        city: body.city,
        state: body.state,
        age: body.age,
        hashedPassword: body.hashedPassword,
        likedPosts: [],
        createdPosts: []
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Error: could not add user';

    const newId = ObjectId(insertInfo.insertedId).toString();

    const user = await getUser(newId);
    let updateIDUser = user;
    updateIDUser._id = ObjectId(updateIDUser._id).toString();
    return updateIDUser;
}

const getAllUsers = async() => {
    const userCollection = await users();
    return await userCollection.find({}, { projection: { "hashedPassword": 0 } }).toArray();
}

const getUser = async(id) => {
    if (id === undefined) throw 'Error: an ID must be provided';
    const userCollection = await users();
    console.log(id);
    const user = await userCollection.findOne({ _id: ObjectId(id) });

    if (!user) throw 'Error: could not find user with ID: ' + id;
    let updateIDUser = user;
    updateIDUser._id = ObjectId(updateIDUser._id).toString();
    return updateIDUser;
}

const removeUser = async(id) => {
    showErrorsID(id);

    let findUser = {
        _id: ObjectId(id)
    };

    const userCollection = await users();
    const deletionInfo = await userCollection.deleteOne(findUser);

    if (deletionInfo.deletedCount === 0) {
        throw `Error: could not delete user with ID: ${id}`;
    }

    return { userId: id, deleted: true };
}

const updateUser = async(id, body) => {
    showErrorsID(id);
    showErrorsMost(body);

    const userCollection = await users();
    const updateUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        city: body.city,
        state: body.state,
        age: body.age,
        hashedPassword: body.hashedPassword,
        likedPosts: [],
        createdPosts: []
    };

    const updatedInfo = await userCollection.updateOne({ _id: ObjectId(id) }, { $set: updateUser });
    if (updatedInfo.modifiedCount === 0) throw 'Error: could not update user';

    const user = await getUser(id);
    let updateIDUser = user;
    updateIDUser._id = ObjectId(updateIDUser._id).toString();
    return updateIDUser;
}

// const updatePartialUser = async(id, body) => {
//     showErrorsID(id);

//     const userCollection = await users();

//     const updatedInfo = await userCollection.updateOne({ _id: ObjectId(id) }, { $set: body });
//     if (updatedInfo.modifiedCount === 0) throw 'Error: could not update user';

//     const user = await getUser(ObjectId(id).toString());
//     let updateIDUser = user;
//     updateIDUser._id = ObjectId(updateIDUser._id).toString();
//     return updateIDUser;
// }

const searchUser = async(keyword) => {
    return;
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    removeUser,
    updateUser,
    //updatePartialUser
    searchUser
}