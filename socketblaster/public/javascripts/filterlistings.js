// Add Listing button click
$('#submitLocation').on('click', filterListing);



// Add User
function filterListing(event) {

  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#submitLocation input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

      var location = $('#filterLocation').val();
      var extension =  '/listings/findlistings/' + location;

      // Empty content string
      var listingContent = '';
      var i = 0;

      // jQuery AJAX call for JSON
      $.getJSON( '/listings/findlistings/' + location, function( data ) {

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
  }
  else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
  }
};
