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
            let prepare_time = parseInt($('#prepare_time_input').val());
            let cook_time = parseInt($('#cook_time_input').val());
            let servings = parseInt($('#servings').val());
            console.log(typeof (cook_time));
            console.log(servings);

<<<<<<< HEAD
            let create_type = $('#create-type').val();
            let postInfoId = $('#postInfoID').val();

            //const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
            const utc = new Date();
=======
            if (!name || !ingredients || !(step1 || step2 || step3) || !type || !prepare_time || !cook_time || !servings) {
                $('#errorMsg').text("Please input required parts!");
                return;
            }
            if (prepare_time <= 0 || cook_time <= 0 || servings <= 0){
                $('#errorMsg').text("Time should over 0");
                return;
            }

                //const utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
                const utc = new Date();
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14

            if (create_type === "create") {

                //post initial recipe request
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
                        steps: [step1, step2, step3]
                    })
                };

<<<<<<< HEAD
                $.ajax(recipeRequest).then(function(responseMessage) {
                    let response = $(responseMessage);
                    console.log(response);
                    let status = response[0].status;
                    if (status === 'post_created') {
                        window.location.href = '/';
                    } else {
                        $('#errorMsg').text("Sorry, the post wasn't able to be created.");
                    }
                });
            } else if (create_type === "edit") {
=======
            $.ajax(recipeRequest).then(function (responseMessage) {
                let response = $(responseMessage);
                console.log(response);
                let status = response[0].status;
                if (status === 'post_created') {
                    window.location.href = '/';
                } else {
                    $('#errorMsg').text("Sorry, the post wasn't able to be created.");
                }
            });
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14

                //post updated recipe request
                let recipeRequestUpdate = {
                    method: 'PUT',
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
                        postID: postInfoId
                    })
                };

<<<<<<< HEAD
                $.ajax(recipeRequestUpdate).then(function(responseMessage) {
=======
            $.ajax(recipeRequestUpdate).then(function (responseMessage) {
>>>>>>> 48a64a132057a4721847aaf8e215af3a8d866a14

                    // let formData = $(this).serialize();
                    // let formAction = $(this).attr('action');
                    // $.ajax({
                    //     url: formAction,
                    //     data: formData,
                    //     type: 'PUT',
                    //     success: function(data) {

                    //     }
                    // })

                    let response = $(responseMessage);
                    console.log(response);
                    let status = response[0].status;
                    if (status === 'post_created') {
                        window.location.href = '/';
                    } else {
                        $('#errorMsg').text("Sorry, the post wasn't able to be updated.");
                    }
                });
            }

        } catch (error) {
            console.log("Error: " + error)
        }
    });
})(jQuery);