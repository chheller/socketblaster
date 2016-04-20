// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    populateListings();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    // Delete listing link click
    $('#listings').on('click', 'a.linkdeletelisting', deleteListing);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

      // Stick our user data array into a userlist variable in the global object
      userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Fill table with data
function populateListings() {

    // Empty content string
    var listingContent = '';
    var i = 0;

    // jQuery AJAX call for JSON
    $.getJSON( '/listings/listings', function( data ) {

      // Stick our user data array into a userlist variable in the global object
      listingData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            // var myPath = "http://placehold.it/320x150";

            listingContent += '<div class="col-sm-4">'
            listingContent +=	'<div class="thumbnail"><div class="images"></div>';
            listingContent += '<div class="caption">';
            listingContent += '<h4 class="pull-right"> $' + this.price + ' </h4>'
            listingContent += '<h4>' + this.name + ' </h4>';
            listingContent += '<p>' + this.description + ' </p>';
            listingContent += '<p>' + this.location + ' </p>';
            listingContent += '<a href="#" class="linkdeletelisting">' + this.user + '</a></br>';
            // listingContent += '<a href="#" class="linkdeletelisting pull-right" rel="' + this._id +'">delete</a>';

              if(sessionStorage.getItem('user') == this.user) {
                listingContent += '<a href="#" class="linkdeletelisting pull-right" rel="' + this._id +'">delete</a>';
              }

            listingContent += '</div></div></div></div>';

            //
            // i++;
        });

        // Inject the whole content string into our existing HTML table
        document.getElementById("listings").innerHTML = listingContent;

        // var j;
        // for(j=0; j<i; j++)
        //   document.getElementById("a" + i).src="http://placehold.it/320x150";

    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

      if($('#addUser input#inputPassword').val() == $('#addUser input#inputpasswordconf').val()) {

        if($('#addUser input#inputUserEmail').val().search("@") != -1) {
            console.log($('#addUser input#inputUserEmail').val().search("@"));
            // If it is, compile all user info into one object
            var newUser = {
                'username': $('#addUser input#inputUserName').val(),
                'email': $('#addUser input#inputUserEmail').val(),
                'password': $('#addUser input#inputPassword').val(),
                'fullname': $('#addUser input#inputUserFullname').val()
                // 'age': $('#addUser fieldset input#inputUserAge').val(),
                // 'location': $('#addUser fieldset input#inputUserLocation').val()
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newUser,
                url: '/users/adduser',
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // Clear the form inputs
                    $('#addUser fieldset input').val('');

                    // Update page
                    alert("user created");
                    location.reload();

                }
                else {

                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);

                }
            });
          }
          else {
            alert("please use a correct email address");
          }
        }
        else{
          alert("Please match passwords");
        }
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};

// Delete User
function deleteListing(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this listing?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/listings/deletelisting/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateListings();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
