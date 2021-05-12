const posts = require("./data/posts");
const likes = require("./data/likes");
const comments = require("./data/comments");
const connection = require('./config/mongoConnection');
const ObjectId = require('mongodb').ObjectID;

async function main() {
    // let whiskeySour;
    // try{
    //     whiskeySour = await posts.createPost({"type": "Drink",
    //     "postedDate": "1/1/2021", 
    //     "name": "Whiskey Sour", 
    //     "servings": 1, 
    //     "time": 5,
    //     "tag": ["sweet", "sour", "texture"],
    //     "ingredients": ["Bourbon Whiskey", "1 dash egg white", "Fresh lemon juice","Gomme Syrup"],
    //     "steps": ["Combine bourbon, lemon juice, and simple syrup in a cocktail shaker.",
    //     "Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds.", 
    //     "Strain cocktail through a Hawthorne strainer or a slotted spoon into an old-fashioned or rocks glass filled with ice. Garnish with orange wheel and cherry."]
    // });
    //     console.log(whiskeySour);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    try{
        const allPosts = await posts.getAllPosts();
        console.log(allPosts);
    } catch(e) {
        console.log("Got an error!");
        console.log(e);
    }

    // try{
    //     const allPosts = await posts.getPost(ObjectId("609b45e320c2918366547b1b").toString());
    //     console.log(allPosts);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     const removeErr = await posts.removePost(ObjectId("609b453407af5882627170d9").toString());
    //     console.log(removeErr);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // } 

    // let likeUp;
    // try{
    //     likeUp = await likes.createLike(ObjectId("609b45e320c2918366547b1b").toString());
    //     console.log(likeUp);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let likeUp = await likes.getLike(ObjectId("609b4aebeeabd98aa3740f34").toString());
    //     console.log(likeUp);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let removeLike = await likes.removeLike(ObjectId("609b4aaab9bea88a413d400c").toString());
    //     console.log(removeLike);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let allLikes = await likes.getAllLikes(ObjectId("609b45e320c2918366547b1b").toString());
    //     console.log(allLikes);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let commentUp = await comments.createComment(ObjectId("609b4757e791dc85833a9224").toString(), {rating: 3, comment:"This is pretty mediocre"});
    //     console.log(commentUp);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let removeComment = await comments.removeComment(ObjectId("609c5085990a99b03cf24936").toString());
    //     console.log(removeComment);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }

    // try{
    //     let allComments = await comments.getAllComments(ObjectId("609b4757e791dc85833a9224").toString());
    //     console.log(allComments);
    // } catch(e) {
    //     console.log("Got an error!");
    //     console.log(e);
    // }
    

    const db = await connection();
    await db.serverConfig.close();
    console.log("Done");
}

main();