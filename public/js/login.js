(function ($) {
    $('#loginForm').submit((event) => {
        event.preventDefault();
        //validate email address
        let reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        
        if ($('#email').val().trim() && $('#password').val().trim()) {
            let email = $('#email').val().trim();
            if(!reg.test(email)){
                $('#errorMsg').text("Sorry, please enter correct email.");
                return;
            }
            let password = $('#password').val().trim();
            let loginRequest = {
                method: 'POST',
                url: '/login',
                contentType: 'application/json',
                data: JSON.stringify({
                    email: email,
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
                    $('#errorMsg').text("Sorry, that email or password didn't work.");
                }
            });
        } else {
            $('#errorMsg').text("Sorry, please enter both email and password.");
        }
    });
})(jQuery);