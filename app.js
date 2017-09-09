
// youtube key: AIzaSyCpeOWVzLcUW9zkbvaUwB2Wnq8bdQCovO8

$(document).ready(function(){

console.log("it works");
$(function() {
	var searchField = $('.form-control');
	var icon = $('#search');

	$(searchField).on('focus',function(){
		$(this).animate({
			width:'75%'
		},400);
		$(icon).animate({
			right: '10px'
		},400);
	});

	$(searchField).on('blur', function(){
		if(searchField.val() == '') {
			$(searchField).animate( {
				width:'60%'
			}, function(){});
			$(icon).animate( {
				right:'360px'
			}, function(){});
		}
	});
	$('#search-form').submit(function(e){
		e.preventDefault();
		console.log("click");
	search();
	});
})


function search(video){
	$('#vidDump').html('');

	q = $('#query').val().trim();
	console.log("#query", q);
 $.get(
 	"https://www.googleapis.com/youtube/v3/search", {
 		part: 'snippet, id',
 		q: q,
 		type: 'video',
 		maxResults: 6,
		key: 'AIzaSyDo2guI3rsMFK5goBQudQdrhYbJvOZKyuQ'},

		function(data){
		// var nextPageToken = data.nextPageToken;
		// 	var prevPageToken = data.prevPageToken;
		console.log(data);

		$.each(data.items, function(i, item){
			// var tubeImage = $("<img>");
   //          tubeImage.attr("data-state", "still");
   //          tubeImage.attr("src", item.snippet.thumbnails.medium.url);
   //          // tubeImage.attr("data-animate", item.id.videoId);
   //          tubeImage.attr("data-animate", "https://www.youtube.com/embed/"+item.id.videoId);
   //          tubeImage.attr("data-still", item.snippet.thumbnails.medium.url);
   //          tubeImage.attr("alt", "searchImages"); 

		var output = getOutput(item);

		$('#vidDump').append(output);
		});

		}
	);
}
    // $("#vidDump").on("click", "img", function() {
    //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    //   // create variables for still and animae images
    //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    //   var state = $(this).attr("data-state");
    //   if (state === "animate") {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    //   } else {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    //   }
    //   console.log(state);
    // });

 function getOutput(item) {
 	var videoID = item.id.videoId;
 	var title = item.snippet.title;
 	// var description =item.snippet.description;
 	//var thumb = item.snippet.thumbnails.medium.url;
 	var thumb = item.id.videoId;
 	// console.log(thumb);
 	// var videoDate = item.snippet.publishedAt;

 //output to html
 var output ='<li>' +
 '<div class="list-left">' +
 '<iframe src="https://www.youtube.com/embed/'+thumb+'"></iframe>' +
 '</div>'+
 '<div class="list-right">'+
 '<h4>' +title+'</h4>' +
 // '<small>by <span class="cTitle">' +title+'</span> on '+videoDate+'</small>' +
 // '<p>' + description + '</p>' +
 '</div>' +
 '</li>' +
 '<div class ="clearfix"></div>'+
 '';
return output;
}
});
