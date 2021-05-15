const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const posts = data.postData;
const comments = data.commentData;
const likes = data.likeData;

const ObjectId = require('mongodb').ObjectID;

const main = async() => {
    const db = await dbConnection();
    await db.dropDatabase();

    let whiskeySour = await posts.createPost({
        "type": "Drink",
        "postedDate": new Date(new Date() - 10 * 60 * 60 * 1000),
        "name": "Whiskey Sour",
        "servings": 1,
        "cook_time": 30,
        "prepare_time": 30,
        "ingredients": "Bourbon Whiskey, 1 dash egg white, Fresh lemon juice, Gomme Syrup",
        "steps": ["Combine bourbon, lemon juice, and simple syrup in a cocktail shaker.",
            "Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds.",
            "Strain cocktail through a Hawthorne strainer or a slotted spoon into an old-fashioned or rocks glass filled with ice. Garnish with orange wheel and cherry."
        ]
    });

    let burger = await posts.createPost({
        "type": "Food",
        "postedDate": new Date(new Date() - 15 * 60 * 60 * 1000),
        "name": "Cheeseburger",
        "servings": 1,
        "cook_time": 30,
        "prepare_time": 30,
        "ingredients": "1 pound lean ground beef, 1 small yellow onion grated, 1/2 teaspoon seasoning salt, 1/2 teaspoon fresh ground pepper, 1 slices american cheese, 1 hamburger bun seedless",
        "steps": ["In a large bowl, add ground beef, grated onion, worcestershire sauce, seasoning salt and pepper.",
            "Using your hands or a fork, gently mix together. Shape mixture into thin patty.",
            "Place patties on grill or skillet and cook until no longer pink on the inside. About 3-5 minutes per side. Place one piece of american cheese over the burger during the last minute of grilling"
        ]
    });

    let annmarie = await users.createUser({
        "firstName": "Annmarie",
        "lastName": "DiGioia",
        "email": "adigioia@stevens.edu",
        "gender": "Female",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "22",
        "hashedPassword": "4b475dd8c2650889064f7c7a48dde356",
        "likedPosts": [],
        "createdPosts": []
    });

    let allen = await users.createUser({
        "firstName": "Allen",
        "lastName": "Best",
        "email": "abest1@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "23",
        "hashedPassword": "fc6b4e5cf88d5bcdd0312b31bdd813c5",
        "likedPosts": [],
        "createdPosts": []
    });

    let tianqi = await users.createUser({
        "firstName": "Tianqi",
        "lastName": "Yao",
        "email": "tyao2@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "24",
        "hashedPassword": "348c190e8d8d258f300610168829bec9",
        "likedPosts": [],
        "createdPosts": []
    });

    let xianli = await users.createUser({
        "firstName": "Xianli",
        "lastName": "Shen",
        "email": "xshen9@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "25",
        "hashedPassword": "d681892fb6635f8aa0defdead2301a8a",
        "likedPosts": [],
        "createdPosts": []
    });

    await likes.createLike(ObjectId(whiskeySour._id).toString());
    await likes.createLike(ObjectId(whiskeySour._id).toString());
    await likes.createLike(ObjectId(whiskeySour._id).toString());
    await comments.createComment(ObjectId(whiskeySour._id).toString(), { rating: 5, comment: "This amazing" });
    await comments.createComment(ObjectId(whiskeySour._id).toString(), { rating: 4, comment: "This is pretty good" });

    await likes.createLike(ObjectId(burger._id).toString());
    await likes.createLike(ObjectId(burger._id).toString());
    await comments.createComment(ObjectId(burger._id).toString(), { rating: 5, comment: "This amazing" });
    await comments.createComment(ObjectId(burger._id).toString(), { rating: 3, comment: "This is pretty mediocre" });

    console.log('Done seeding database');

    await db.serverConfig.close();
};

main().catch(console.log);