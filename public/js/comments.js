(function ($) {
    $('#commentForm').submit((event) => {
        try {
            event.preventDefault();
            if ($('#comment_input').val().trim()) {
                let postId = $('#comment_id').val();
                let comment = $('#comment_input').val();
                let rating = parseInt($('#rating').val());

                let commentRequest = {
                    method: 'POST',
                    url: '/new-comment',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        postId: postId,
                        comment: comment,
                        rating: rating
                    })
                };

                $.ajax(commentRequest).then(function (responseMessage) {
                    let response = $(responseMessage);

                    let status = response[0].status;
                    if (status === 'comment_created') {
                        window.location.href = '/post/' + postId;
                    } else {
                        $('#errorMsg').text("Sorry, the like wasn't able to be created.");
                    }
                });
            } else {
                $('#errorMsg').text("Please input comment");
            }

        } catch (error) {
            console.log("Error: " + error)
        }
    });
})(jQuery);