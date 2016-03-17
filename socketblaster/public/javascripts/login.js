$(document).ready(function () {

    $("#loginButton").click(function () {

        var userEmail = $('#inputemail').val();
        var password = $('#inputpassword').val();

        // jQuery AJAX call for JSON
        $.getJSON( '/users/userlist', function( data ) {

            // For each item in our JSON, check if username and password match
            $.each(data, function(){
              if(userEmail == this.email && password == this.password) {
                  console.log("logged in: ", this.email, " ", this.password);
                  sessionStorage.setItem('user', userEmail);
                  sessionStorage.setItem('login', "true");
              }
              else {console.log("wrong combo: " , userEmail , " " , this.email , " " , password , " " , this.password);}
            });

        });


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
