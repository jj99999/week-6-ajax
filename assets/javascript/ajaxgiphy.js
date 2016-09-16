//javascript for Giphy API - AJAX

console.log("Your javascript is being called.")

// initial array of game shows
  var shows = ['Jeopardy' , 'Wheel of Fortune' , 'Family Feud' , 'The Price Is Right'];

// function for displaying game show buttons
function renderButtons()
{

  // delete the other game shows prior to adding new ones
  $('#showsView').empty();

  // loop through the game shows array
  for (var i = 0; i<shows.length; i++)
  {
      // dynamically generate button for each game show in the array
      var a =$('<button>');
      a.addClass('show');
      a.attr('data-name',shows[i]);
      a.text(shows[i]);
      $('#showsView').append(a);
  }
}

// event listener for when the add a gameshow button is clicked
  $('#addShow').on('click' , function()
  {
    //  grab the text from the input form field
    var show = $('#show-input').val().trim();

    // push the show name into the shows array
    shows.push(show);

    renderButtons();

    return false;
  });


// // event listener for clicks on the game show buttons
    $(document).on('click' , '.show' , function() 
    {

      var title = $(this).data("name");

      // set query URL to query based on the game show name (as typed in by the user), return a limit of 10 gif's, and sets the rating to PG
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

      $.ajax({url: queryURL, method: 'GET'}).done(function(response)
      {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++)
        {
          var gifDiv = $('<div>');

          var rating = results[i].rating;

          var p = $('<p>').text("Rating " + rating);

          var showImage = $('<img>');
          showImage.addClass("gif");
          showImage.attr('src' , results[i].images.fixed_height_still.url);
          showImage.attr('data-still' , results[i].images.fixed_height_still.url);
          showImage.attr('data-animate' , results[i].images.fixed_height.url);
          showImage.attr('data-state' , "still");
          gifDiv.append(p);
          gifDiv.append(showImage);


          // place the GIF's into the showDiv
          $('#gifsHere').prepend(gifDiv);
        }

      });

    });  

  // event listener for when user clicks on a gif
  $(document).on('click', '.gif' , function()
  {

    console.log("This was clicked");
    var state = $(this).attr('data-state');


      if ( state == 'still')
        {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
        }
        else
        {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
        }
  });      

  renderButtons();    

