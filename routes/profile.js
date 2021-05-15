const express = require('express');
const router = express.Router();
const data = require('../data/posts');


router.get('/', async (req, res) => {

    try {
        const recipeListAll = await data.getAllPosts();
        let recipeList = [];
        let recipeListSize = recipeListAll.length;
        for (let index = 0; index < recipeListSize; index++) {
            const element = recipeListAll[index];
            if (element) {
                recipeList.push(element);
            }
        }
        let hasRecipe = false;
        if (recipeList.length > 0) {
            hasRecipe = true;
        }
        res.render('page/profile', { recipeList: recipeList, hasRecipe: hasRecipe});
    } catch (e) {
        res.status(500).send();
    }

});





module.exports = router;