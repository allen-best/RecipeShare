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

        // sort function newest to Older
        function compare(pro) { 
            return function (obj1, obj2) { 
                var val1 = obj1[pro]; 
                var val2 = obj2[pro]; 
                if (val1 > val2 ) { 
                    return 1; 
                } else if (val1 < val2 ) { 
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
        res.render('page/profile', { recipeList: recipeList, hasRecipe: hasRecipe});
    } catch (e) {
        res.status(500).send();
    }

});





module.exports = router;