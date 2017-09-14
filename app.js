
$(document).ready(function(){

	if(localStorage.getItem("Artist")) { 
		var lastSearch = JSON.parse(localStorage.getItem("Artist"));
		$.each(lastSearch, function(i, item){
		var output = getOutput(item);

		$('#vidDump').append(output);
		});
  	}

$(function() {
	var searchField = $('.form-control');
	var icon = $('#search');

	$(searchField).on('focus',function(){
		$(this).animate({
			width:'70%'
		},400);
		$(icon).animate({
			right: '10px'
		},400);
	});

	$(searchField).on('blur', function(){
		if(searchField.val() == '') {
			$(searchField).animate( {
				width:'60%'
			}, 400, function(){});
			$(icon).animate( {
				right:'360px'
			}, 400, function(){});
		}
	});
	$('#search-form').submit(function(e){
		e.preventDefault();
	search();
	});
})


function search(video){
	$('#vidDump').html('');

	q = $('#query').val().trim();

$.get(
	 	"https://www.googleapis.com/youtube/v3/search", {
	 		part: 'snippet, id',
	 		q: q,
	 		type: 'video',
	 		maxResults: 6,
			key: 'AIzaSyDo2guI3rsMFK5goBQudQdrhYbJvOZKyuQ'},

			function(data){
			localStorage.setItem("Artist", JSON.stringify(data.items));

			$.each(data.items, function(i, item){
			var output = getOutput(item);

			$('#vidDump').append(output);
			});
		}
	);
}
  
 function getOutput(item) {
 	var videoID = item.id.videoId;
 	var title = item.snippet.title;
 	var description =item.snippet.description;
 	var thumb = item.id.videoId;
 	var videoDate = item.snippet.publishedAt;

	 //output to html
	 var output =
	 '<div class="col-sm-6" id="vidList">' +
	 '<iframe src="https://www.youtube.com/embed/'+thumb+'"></iframe>' +
	 '<h4>' +title+'</h4>' +
	 '</div>';
	return output;
	}
});
