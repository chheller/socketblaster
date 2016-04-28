

$(document).ready(function () {

    $("#loginButton").click(function () {

        var userEmail = $('#inputemail').val();
        var password = $('#inputpassword').val();
        var found = false;

        // This hopefully logs us in
        $.ajax({
            type: 'POST',
            url: '/users/login/' + userEmail + '/' + password
        }).done(function( response ) {

            // Check for a successful (true) response
            if (response.msg == 'true') {
              sessionStorage.setItem('user', userEmail);  //Set session storage data for user
              sessionStorage.setItem('login', "true");    //Set session storage data for logged in
              location.href = '/dashboard';
            }
            else {
              alert('Error: ' + response.msg);
            }

        });

        setTimeout(function(){ location.reload(); }, 1000);

    });

    $("#signOut").click(function () {
        sessionStorage.setItem('user', "");
        sessionStorage.setItem('login', "false");
        location.href = '/';
    });

    $("#btnAddUser").click(function () {
        var userEmail = $('#inputUserEmail').val();
        sessionStorage.setItem('user', userEmail);  //Set session storage data for user
        sessionStorage.setItem('login', "true");    //Set session storage data for logged in
    });

    var userCheck = sessionStorage.getItem('user');
    var loginCheck = sessionStorage.getItem('login');

    if (loginCheck == "true") {
        document.getElementById("userName").innerHTML = userCheck;
        $("#login").hide();
        $("#browse").show();
        $("#cha").show();
        $("#signOut").show();
        $("#postL").show();
    } else {
        $("#signOut").hide();
        $("#postL").hide();
        $("#browse").hide();
        $("#cha").hide();
    }
});
