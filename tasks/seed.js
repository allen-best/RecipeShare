const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const posts = data.postData;
const comments = data.commentData;
const likes = data.likeData;
const users = data.userData;

const ObjectId = require('mongodb').ObjectID;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    //create user

    let annmarie = await users.createUser({
        "firstName": "Annmarie",
        "lastName": "DiGioia",
        "email": "adigioia@stevens.edu",
        "gender": "Female",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "22",
        "password": "annmariedigioia"
        // "hashedPassword": "4b475dd8c2650889064f7c7a48dde356"
        // "likedPosts": [],
        // "createdPosts": []
    });

    let allen = await users.createUser({
        "firstName": "Allen",
        "lastName": "Best",
        "email": "abest1@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "23",
        "password": "allenbest"
        // "hashedPassword": "fc6b4e5cf88d5bcdd0312b31bdd813c5"
        // "likedPosts": [],
        // "createdPosts": []
    });

    let tianqi = await users.createUser({
        "firstName": "Tianqi",
        "lastName": "Yao",
        "email": "tyao2@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "24",
        "password": "tianqiyao"
        // "hashedPassword": "348c190e8d8d258f300610168829bec9"
        // "likedPosts": [],
        // "createdPosts": []
    });

    let xianli = await users.createUser({
        "firstName": "Xianli",
        "lastName": "Shen",
        "email": "xshen9@stevens.edu",
        "gender": "Male",
        "city": "Hoboken",
        "state": "New Jersey",
        "age": "25",
        "password": "xianlishen"
        // "hashedPassword": "d681892fb6635f8aa0defdead2301a8a"
        // "likedPosts": [],
        // "createdPosts": []
    });



    let annmarie_username = `${annmarie.firstName} ${annmarie.lastName}`;
    let annmarie_userId = ObjectId(annmarie._id).toString();

    let xianli_username = `${xianli.firstName} ${xianli.lastName}`;
    let xianli_userId = ObjectId(xianli._id).toString();

    let allen_username = `${allen.firstName} ${allen.lastName}`;
    let allen_userId = ObjectId(allen._id).toString();

    let tianqi_username = `${tianqi.firstName} ${tianqi.lastName}`;
    let tianqi_userId = ObjectId(tianqi._id).toString();


    //creat recipe

    let whiskeySour = await posts.createPost({
        "type": "Drink",
        "postedDate": new Date(new Date() - 10 * 60 * 60 * 1000 - 31213),
        "name": "Whiskey Sour",
        "author_id": annmarie._id,
        "servings": 1,
        "cook_time": 30,
        "prepare_time": 30,
        "ingredients": "Bourbon Whiskey, 1 dash egg white, Fresh lemon juice, Gomme Syrup",
        "steps": ["Combine bourbon, lemon juice, and simple syrup in a cocktail shaker.",
            "Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds.",
            "Strain cocktail through a Hawthorne strainer or a slotted spoon into an old-fashioned or rocks glass filled with ice. Garnish with orange wheel and cherry."
        ]
    });
    await likes.createLike(ObjectId(whiskeySour._id).toString(), annmarie_username, annmarie_userId);
    await likes.createLike(ObjectId(whiskeySour._id).toString(), xianli_username, xianli_userId);
    await likes.createLike(ObjectId(whiskeySour._id).toString(), allen_username, allen_userId);
    await comments.createComment(ObjectId(whiskeySour._id).toString(), { rating: 5, comment: "This amazing", username: xianli_username }, xianli_userId);
    await comments.createComment(ObjectId(whiskeySour._id).toString(), { rating: 4, comment: "This is pretty good", username: allen_username }, allen_userId);

    let cheeseBurger = await posts.createPost({
        "type": "Food",
        "postedDate": new Date(new Date() - 15 * 60 * 60 * 1000 + 32312),
        "name": "Cheeseburger",
        "author_id": annmarie._id,
        "servings": 1,
        "cook_time": 30,
        "prepare_time": 30,
        "ingredients": "1 pound lean ground beef, 1 small yellow onion grated, 1/2 teaspoon seasoning salt, 1/2 teaspoon fresh ground pepper, 1 slices american cheese, 1 hamburger bun seedless",
        "steps": ["In a large bowl, add ground beef, grated onion, worcestershire sauce, seasoning salt and pepper.",
            "Using your hands or a fork, gently mix together. Shape mixture into thin patty.",
            "Place patties on grill or skillet and cook until no longer pink on the inside. About 3-5 minutes per side. Place one piece of american cheese over the burger during the last minute of grilling"
        ]
    });

    await likes.createLike(ObjectId(cheeseBurger._id).toString(), annmarie_username, annmarie_userId);
    await likes.createLike(ObjectId(cheeseBurger._id).toString(), allen_username, allen_userId);
    await comments.createComment(ObjectId(cheeseBurger._id).toString(), { rating: 5, comment: "This amazing", username: tianqi_username }, tianqi_userId);
    await comments.createComment(ObjectId(cheeseBurger._id).toString(), { rating: 3, comment: "This is pretty mediocre", username: allen_username }, tianqi_userId);


    let lemonMartini = await posts.createPost({
        "type": "Drink",
        "postedDate": new Date(new Date() - 1.5 * 60 * 60 * 1000 - 31291),
        "name": "Lemon Martini",
        "author_id": xianli._id,
        "servings": 1,
        "cook_time": 10,
        "prepare_time": 10,
        "ingredients": "2 teaspoons white sugar, 2 teaspoons warm water, 1 lemon, 2 fluid ounces vodka, 1 fluid ounce orange-flavored liqueur, ice, 1 teaspoon white sugar",
        "steps": ["Combine 2 teaspoons sugar and warm water in a cocktail shaker; stir to dissolve sugar. Pour lemon juice, lemon peels, vodka, and orange liqueur into the shaker; add ice. Cover and shake vigorously.",
            "Remove a lemon peel from the shaker and wipe the rim of a martini glass with the peel.",
            "Dip the rim of the glass in 1 teaspoon sugar, or as needed. Strain martini into prepared glass."
        ]
    });

    await likes.createLike(ObjectId(lemonMartini._id).toString(), allen_username, allen_userId);
    await comments.createComment(ObjectId(lemonMartini._id).toString(), { rating: 4, comment: "So easy to make and is not too tart", username: tianqi_username }, tianqi_userId);
    await comments.createComment(ObjectId(lemonMartini._id).toString(), { rating: 5, comment: "Can't wait to try it ", username: annmarie_username }, annmarie_userId);


    let whiteChocolateLatte = await posts.createPost({
        "type": "Drink",
        "postedDate": new Date(new Date() - 25 * 60 * 60 * 1000 + 63125),
        "name": "White Chocolate Latte",
        "author_id": xianli._id,
        "servings": 2,
        "cook_time": 5,
        "prepare_time": 5,
        "ingredients": "1 cups milk, 1 tablespoon heavy cream, 1/8 teaspoon vanilla extract, 1 tablespoon white sugar, 1/2 cup brewed espresso, 1/4 cup white chocolate chips, chopped ",
        "steps": ["Combine the milk and cream in a saucepan, and whisk over high heat until hot and frothy. Remove from heat and stir in the vanilla and sugar.",
            "Whisk together hot espresso and white chocolate chips in a mug until smooth.",
            "If you are making two, pour half into another mug. Top with the frothy hot milk and stir to blend in the flavoring."
        ]
    });

    await likes.createLike(ObjectId(whiteChocolateLatte._id).toString(), tianqi_username, tianqi_userId);
    await likes.createLike(ObjectId(whiteChocolateLatte._id).toString(), annmarie_username, annmarie_userId);
    await comments.createComment(ObjectId(whiteChocolateLatte._id).toString(), { rating: 5, comment: "Absolutely delicious!!!", username: tianqi_username }, tianqi_userId);
    await comments.createComment(ObjectId(whiteChocolateLatte._id).toString(), { rating: 4, comment: "Good. It's easy to make and turns out really well. ", username: allen_username }, allen_userId);
    await comments.createComment(ObjectId(whiteChocolateLatte._id).toString(), { rating: 5, comment: "Although it was good I didn't find it great, too bitter for me. ", username: annmarie_username }, annmarie_userId);

    let lemonChickenTenders = await posts.createPost({
        "type": "Food",
        "postedDate": new Date(new Date() - 40 * 60 * 60 * 1000 - 4530),
        "name": "Lemon Chicken Tenders",
        "author_id": tianqi._id,
        "servings": 4,
        "cook_time": 20,
        "prepare_time": 15,
        "ingredients": "1/2 teaspoon paprika, 1/2 teaspoon salt, 1/4 teaspoon pepper, 3 large boneless, skinless chicken breasts, cut into 2-inch pieces, 2 eggs, slightly beaten, 1 cup Italian seasoned bread crumbs, 1/2 cup sugar, 1/2 cup lemon juice, 1 teaspoons curry powder",
        "steps": ["Preheat oven to 400 degrees F. In a bowl, stir together paprika, salt, and pepper. Sprinkle seasoning over chicken pieces. Dip pieces in egg, then dredge in bread crumbs. Arrange chicken pieces in a single layer in an aluminum foil-lined 15x10-inch jelly roll pan.",
            "Bake in preheated oven for 15 minutes, turning once. In a small saucepan over medium-low heat, stir together sugar, lemon juice, and curry powder, stirring until sugar dissolves, about 5 minutes.",
            "Drizzle lemon sauce over chicken, return to oven, and bake 5 minutes more."
        ]
    });
    await likes.createLike(ObjectId(lemonChickenTenders._id).toString(), xianli_username, xianli_userId);
    await likes.createLike(ObjectId(lemonChickenTenders._id).toString(), allen_username, allen_userId);
    await comments.createComment(ObjectId(lemonChickenTenders._id).toString(), { rating: 5, comment: "I love that curry taste !", username: xianli_username }, xianli_userId);
    await comments.createComment(ObjectId(lemonChickenTenders._id).toString(), { rating: 3, comment: "Too sweet for me", username: allen_username }, allen_userId);

    let Oyakodon = await posts.createPost({
        "type": "Food",
        "postedDate": new Date(new Date() - 32 * 60 * 60 * 1000 + 23313),
        "name": "Oyakodon (Japanese Chicken and Egg Rice Bowl)",
        "author_id": allen._id,
        "servings": 4,
        "cook_time": 25,
        "prepare_time": 15,
        "ingredients": "2 cups uncooked rice, 4 cups water, 4 skinless, boneless chicken thighs, cut into small pieces, 1 onion, cut in half and sliced, 2 cups dashi stock, made with dashi powder, 1/4 cup soy sauce, 3 tablespoons mirin, 3 tablespoons brown sugar, 4 eggs",
        "steps": ["Rinse the rice in 3 to 4 changes of water until the rinse water is almost clear, and drain off the rinse water. Bring the rice and 4 cups of water to a boil in a saucepan over high heat. Reduce heat to medium-low, cover, and simmer until the rice is tender and the liquid has been absorbed, 20 to 25 minutes.",
            "Place the chicken in a nonstick skillet with a lid, and cook and stir over medium heat until the chicken is no longer pink inside and beginning to brown, about 5 minutes. Stir in the onion, and cook and stir until the onion is soft, about 5 more minutes. Pour in the stock, and whisk in soy sauce, mirin, and brown sugar, stirring to dissolve the sugar. Bring the mixture to a boil, and let simmer until slightly reduced, about 10 minutes.",
            "Whisk the eggs in a bowl until well-beaten, and pour over the chicken and stock. Cover the skillet, reduce heat, and allow to steam for about 5 minutes, until the egg is cooked. Remove from heat. To serve, place 1 cup of cooked rice per bowl into 4 deep soup bowls, top each bowl with 1/4 of the chicken and egg mixture, and spoon about 1/2 cup of soup into each bowl."
        ]
    });
    await likes.createLike(ObjectId(Oyakodon._id).toString(), xianli_username, xianli_userId);
    await likes.createLike(ObjectId(Oyakodon._id).toString(), annmarie_username, annmarie_userId);
    await comments.createComment(ObjectId(Oyakodon._id).toString(), { rating: 4, comment: "It came out too sweet for my taste. If I make it again, I will reduced the brown sugar to half.", username: xianli_username }, xianli_userId);
    await comments.createComment(ObjectId(Oyakodon._id).toString(), { rating: 5, comment: "Great recipe, thank you!", username: annmarie_username }, annmarie_userId);
    await comments.createComment(ObjectId(Oyakodon._id).toString(), { rating: 5, comment: "I really enjoyed this recipe.", username: tianqi_username }, tianqi_userId);


    /*
        let sample = await posts.createPost({
        "type": "Drink",
        "postedDate": new Date(new Date() - 25 * 60 * 60 * 1000),
        "name": "name of the recipe ",
        "author_id": xianli._id,
        "servings": 2,
        "cook_time": 5,
        "prepare_time": 5,
        "ingredients": "ingredients of the recipe  ",
        "steps": ["step1",
            "step2",
            "step3"
        ]
    });
        await likes.createLike(ObjectId(sample._id).toString(), annmarie_username, annmarie_userId);
        await comments.createComment(ObjectId(sample._id).toString(), { rating: 4, comment: "comment", username: xianli_username }, xianli_userId);
    */

    console.log('Done seeding database');

    await db.serverConfig.close();
};

main().catch(console.log);