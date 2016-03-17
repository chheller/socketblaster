$(document).ready(function () {

    $("#loginButton").click(function () {

        var userEmail = $('#inputemail').val();

        sessionStorage.setItem('user', userEmail);
        sessionStorage.setItem('login', "true");
    });

    $("#signOutButton").click(function () {
        sessionStorage.setItem('user', "");
        sessionStorage.setItem('login', "false");
        location.reload();
    });

    var userCheck = sessionStorage.getItem('user');
    var loginCheck = sessionStorage.getItem('login');

    if (loginCheck == "true") {
        document.getElementById("userName").innerHTML = userCheck;
        $("#login").hide();
        $("#signOut").show();
    } else {
        $("#signOut").hide();
    }
});