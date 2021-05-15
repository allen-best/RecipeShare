(function ($) {
    $('#likeForm').submit((event) => {
        try {
            event.preventDefault();

            let postId = $('#like_id').val();

            let likeRequest = {
                method: 'POST',
                url: '/new-like',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId: postId,
                })
            };

            $.ajax(likeRequest).then(function (responseMessage) {
                let response = $(responseMessage);
                console.log(response);
                let status = response[0].status;
                if (status === 'like_created') { 
                    window.location.href = '/post/' + postId;
                } else {
                    $('#errorMsg').text("Sorry, the like wasn't able to be created.");
                }
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    });
    $('#dislikeForm').submit((event) => {
        try {
            event.preventDefault();

            let postId = $('#like_id').val();

            let likeRequest = {
                method: 'POST',
                url: '/dislike',
                contentType: 'application/json',
                data: JSON.stringify({
                    postId: postId,
                })
            };

            $.ajax(likeRequest).then(function (responseMessage) {
                let response = $(responseMessage);
                console.log(response);
                let status = response[0].status;
                if (status === 'disliked') { 
                    window.location.href = '/post/' + postId;
                } else {
                    $('#errorMsg').text("Sorry, the like wasn't able to be deleted.");
                }
            });
        } catch (error) {
            console.log("Error: " + error)
        }
    });

})(jQuery);