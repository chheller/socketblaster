
function sendMessage() {


          console.log("got to sending function.");
          var message = $('#theMessage').val();

          // This sends message to db
          $.ajax({
              type: 'POST',
              url: '/users/message/' + sessionStorage.getItem('user') + '/someone/' + message
          }).done(function( response ) {
            console.log("send to push messages");
          populateMessages();
        });
};


// Fill table with data
function populateMessages() {

    console.log("populating messages");

    // Empty content string
    var messageContent = '';
    var i = 0;

    // jQuery AJAX call for JSON
    $.getJSON( '/users/seemessages/' + sessionStorage.getItem('user'), function( data ) {

      // Stick our user data array into a userlist variable in the global object
      listingData = data;
      messageContent = data;

      console.log("messages" + listingData);

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            // var myPath = "http://placehold.it/320x150";

            // listingContent += '<div class="col-sm-4">'
            // listingContent +=	'<div class="thumbnail"><div class="images"></div>';
            // listingContent += '<div class="caption">';
            // listingContent += '<h4 class="pull-right"> ' + this.price + ' </h4>'
            // listingContent += '<h4>' + this.name + ' </h4>';
            // listingContent += '<p>' + this.description + ' </p><a href="#" class="linkdeletelisting pull-right" rel="' + this._id +'">delete</a></div></div></div></div>';

            //
            // i++;
        });

        // Inject the whole content string into our existing HTML table
        document.getElementById("messages").innerHTML = messageContent;

        // var j;
        // for(j=0; j<i; j++)
        //   document.getElementById("a" + i).src="http://placehold.it/320x150";

    });
};
