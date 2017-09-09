$(document).ready(function() {
  $("#search").on("click", function() {
    console.log("ticketmaster");  

    var artist = $("#query").val().trim();
    console.log(artist);

    var stateCode = $("#inputState").val().trim();
    console.log(stateCode);


    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?contryCode=USA&stateCode="+ stateCode+ "&keyword=" + artist + "&apikey=wRs0lfJ8NtkLtXHVo9Zt11e2pPADeqWN";

    $.ajax({
      type: "GET",
      url: queryURL,
      async: true,
      dataType: "json",
      success: function(json) {
        console.log(json);
        //parse the response.

        //Creating a div to hold the tickets
        var ticketDiv = $("<div class='ticket'>");
       
        //storing the image url
        var eventImages = json._embedded.events["0"].images["0"].url;
        console.log(eventImages);

        //displaying the image
        var img = $("<img>").attr("src", eventImages).attr("width","200").attr("height","100");

        $("#Tickets").on("click", "img", function() {
            $(".ticket").wrap("<a href=" + eventTicketURL +"></a>");
        });


        //apending the image
        ticketDiv.html(img);

        //storing the event name
        var eventName = json._embedded.events["0"].name;
        console.log(eventName);

        //creating an element to have the name displayed
        var pOne = $("<p>").text(eventName);

        //Display event name
        ticketDiv.append(pOne);
       
        //storing the event date
        var eventDate = json._embedded.events["0"].dates.start.localDate;
        console.log(eventDate);

        //creating an element to have the date displayed
        var pTwo = $("<p>").text(eventDate);

        //Display event date
        ticketDiv.append(pTwo);

        //storing venue for the event
        var eventVenue = json._embedded.events["0"]._embedded.venues["0"].name + " in " + json._embedded.events["0"]._embedded.venues["0"].city.name + " " + json._embedded.events["0"]._embedded.venues["0"].state.stateCode;
        console.log(eventVenue);

        //creating an element to have the venue info displayed
        var pThree = $("<p>").text(eventVenue);

        ticketDiv.append(pThree);
        
        //storing the url to buy tickets
        var eventTicketURL = json._embedded.events["0"].url;
        console.log(eventTicketURL);

        //creating element to have the url to buy the tickets displayed
        var pURL = $("<a>").text(eventTicketURL).attr("href", eventTicketURL);

        //Displaying the tickets url
        ticketDiv.append(pURL);
       




        $("#Tickets").html(ticketDiv);
        
        //do other Things.
      },
      error: function(xhr, status, err){
        //Do this when error comes up!
        console.log("No Event Near You")
      }
    });




  });
  
}); 