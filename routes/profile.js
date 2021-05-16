const express = require('express');
const router = express.Router();
const postData = require('../data/posts');
const userData = require('../data/users');
const ObjectId = require('mongodb').ObjectID;

router.get('/:id', async (req, res) => {
    let userID = req.params.id;
    try {
        const userInfo = await userData.getUser(ObjectId(userID).toString());
        let image = userInfo.image;
        if (!image) {
            image = "../public/image/undefine_image.png";
        }
        //const image = "public/image/undefine_image.png";
        userInfo.image = image;
        const recipeIDListAll = userInfo.createdPosts;
        //console.log(recipeIDListAll);


        let recipeList = [];
        let recipeListSize = recipeIDListAll.length;
        for (let index = 0; index < recipeListSize; index++) {
            const recipe = await postData.getPost(ObjectId(recipeIDListAll[index].post_id).toString());
            if (!recipe.image) {
                recipe.image = "../public/image/undefine_image.png";
            }
            recipeList.push(recipe);
        }

        // sort function newest to Older
        function compare(pro) {
            return function (obj1, obj2) {
                var val1 = obj1[pro];
                var val2 = obj2[pro];
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }

        recipeList.sort(compare("postedDate"));

        let hasRecipe = false;
        if (recipeList.length > 0) {
            hasRecipe = true;
        }
        res.render('page/profile', { userInfo: userInfo, recipeList: recipeList, hasRecipe: hasRecipe });
    } catch (e) {
        console.log(e);
        res.status(500).send();
        // res.render('page/error');
    }

});





module.exports = router;