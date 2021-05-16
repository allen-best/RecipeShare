
(function ($) {
    // Let's start writing AJAX calls!

    let form = $('#updateUserInfoForm');

    $(document).ready(function () {
        if ($('#recipeLink')) {
            if ($('#recipeLink').attr('data-me') === $('#myLink').attr('data-me')) {
                $('#editrecipeLink').show();
            }
        }

    });

    form.submit(function (event) {
        event.preventDefault();
        let requestConfig = {
            method: 'patch',
            url: form.attr('action'),
            contentType: 'application/json',
            data: JSON.stringify({
                firstName: $('#firstName').val(),
                lastName: $('#lastName').val(),
                gender: $('input:radio:checked').val(),
                city: $('#city').val(),
                state: $("#state option:selected").text(),
                age: $('#age').val(),
                password:$('#password   ').val()
            })
        };
        $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage);
            if (responseMessage.success) {
                window.location.replace("/profile/"+responseMessage.id);
            }
        });
    });




})(window.jQuery);
