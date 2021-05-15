(function ($) {
    $('#recipeForm').submit((event) => {
        try {
            console.log("here");
            event.preventDefault();
            let name = $('#name_input').val().trim();
            let ingredients = $('#ingedients_input').val().trim();
            let step1 = $('#step_1_input').val().trim();
            let step2 = $('#step_2_input').val().trim();
            let step3 = $('#step_3_input').val().trim();
            let type = $('input[name=type_input]:checked').val();
            let prepare_time = $('#prepare_time_input').val().trim();
            let cook_time = parseInt($('#cook_time_input').val());
            let servings = parseInt($('#servings').val());
            console.log(typeof(cook_time));
            console.log(servings);

            const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

            let recipeRequest = {
                method: 'POST',
                url: '/recipe-form',
                contentType: 'application/json',
                data: JSON.stringify({
                    type: type,
                    postedDate: utc,
                    name: name,
                    servings: servings,
                    cook_time: cook_time,
                    prepare_time: prepare_time,
                    ingredients: ingredients,
                    steps: [step1, step2, step3],
                })
            };

            $.ajax(recipeRequest).then(function (responseMessage) {
                let response = $(responseMessage);
                console.log(response);
                let status = response[0].status;
                if (status === 'post_created') { 
                    window.location.href = '/';
                } else {
                    $('#errorMsg').text("Sorry, the post wasn't able to bbe created.");
                }
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    });
})(jQuery);