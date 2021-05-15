const bcrypt = require('bcryptjs');
const saltRounds = 16;
//file will be used for the users of recipe share (backend)

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
//const recipes = require('./recipes');

const ObjectId = require('mongodb').ObjectID;
const uuid = require('uuid')

const showErrorsMost = (body) => {
    //show error when any required field is missing
    if (body.firstName === undefined || body.lastName === undefined || body.email === undefined || body.gender === undefined || body.city === undefined || body.state === undefined || body.age === undefined || body.password === undefined) {
        throw 'Error: must provide all required fields';
    }

    //makes sure all values are of correct type
    if (typeof(body.firstName) !== "string" || typeof(body.lastName) !== "string" || typeof(body.email) !== "string" || typeof(body.gender) !== "string" || typeof(body.city) !== "string" || typeof(body.state) !== "string" || typeof(body.age) !== "string" || typeof(body.hashedPassword) !== "string") {
        throw 'Error: must input correct types of values for required fields';
    }

    //makes sure user does not input whitespace/only spaces as input values
    if (body.firstName === "" || body.lastName === "" || body.email === "" || body.gender === "" || body.city === "" || body.state === "" || body.age === "" || body.password === "") {
        throw 'Error: cannot enter spaces as values for required fields'
    }

    //check age to make sure it is over 0
    if (body.age < 0) {
        throw 'Error: age should be over 0';
    }

    //makes sure likedPosts and createdPosts are arrays - cannot show error if either array has a length < 0 because user might just not have liked or created any posts
    // if (!Array.isArray(body.likedPosts) || !Array.isArray(body.createdPosts)) {
    //     throw 'Error: must input correct types of values for required fields';
    // }
}

//does all checking for id field
const showErrorsID = (id) => {
    if (id === undefined || typeof(id) !== "string" || id === "" || !ObjectId.isValid(id)) throw 'Error: the respective ID is invalid'
}

const createUser = async(body) => {
    const hash = await bcrypt.hash(body.password, saltRounds);
    body.hashedPassword = hash;
    showErrorsMost(body);

    const userCollection = await users();

    body.email = body.email.toLowerCase();
    let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    if (!reg.test(body.email)) throw 'Error: email should in correct form';
    let repetition = await getUserByEmail(body.email);
    if (repetition) throw 'Error: email address already used'

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

const getUserByEmail = async(email) => {
    if (!email) {
        throw 'You must provide email.';
    }
    if (typeof(email) !== "string") {
        throw 'You must provide a valid string value for email.';
    }
    email = email.toLowerCase();
    const userCollection = await users();

    const user = await userCollection.findOne({ email: email });

    if (!user) return undefined;
    let updateIDUser = user;
    updateIDUser._id = ObjectId(updateIDUser._id).toString();
    return updateIDUser;
}

const searchUser = async(keyword) => {
    return;
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    removeUser,
    updateUser,
    searchUser,
    getUserByEmail
}