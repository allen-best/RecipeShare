
(function ($) {
    // Let's start writing AJAX calls!

    let form = $('#updateUserInfoForm');

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
            responseMessage.forEach(element => {
                let name = element.show.name;
                let url = element.show._links.self.href;
                showList.append('<li><a href=' + url + '>' + name + '</a></li>');
            });

        });
    });




})(window.jQuery);
