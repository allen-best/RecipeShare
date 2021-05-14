(function ($) {
    $('#loginForm').submit((event) => {
        event.preventDefault();
        if ($('#username').val().trim() && $('#password').val().trim()) {
            let username = $('#username').val().trim();
            let password = $('#password').val().trim();
            let loginRequest = {
                method: 'POST',
                url: '/login',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: username,
                    password: password
                })
            };

            $.ajax(loginRequest).then(function (responseMessage) {
                let response = $(responseMessage);
                console.log(response);
                let status = response[0].status;
                if (status === 'login_success') { //login success
                    window.location.href = '/';
                } else {//login fail
                    $('#errorMsg').text("Sorry, that username or password didn't work.");
                }
            });
        }
    });
})(jQuery);