  // Add Listing button click
$('#btnAddListing').on('click', addListing);



// Add User
function addListing(event) {
    console.log("clicked addListing");

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addListing input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newListing = {
            'name': $('#inputItemName').val(),
            'price': $('#inputItemPrice').val(),
            'description': $('#inputItemDesc').val(),
            'location': $('#sel1').val(),
            'category': $('#cat').val(),
            'user' : sessionStorage.getItem('user')
        }

        console.log(newListing);

        if(!isNaN(newListing.price)) {

          // Use AJAX to post the object to our adduser service
          $.ajax({
              type: 'POST',
              data: newListing,
              url: '/listings/addListing',
              dataType: 'JSON'
          }).done(function( response ) {

              // Check for successful (blank) response
              if (response.msg === '') {

                  // Clear the form inputs
                  $('#addListing fieldset input').val('');

                  // Update the table
                  // populateTable();

              }
              else {

                  // If something goes wrong, alert the error message that our service returned
                  alert('Error: ' + response.msg);

              }
          });
          window.location.href = '/';
        }
        else {
          alert("Please enter a valid number as the price.");
        }
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
