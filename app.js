
$(document).ready(function(){

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
			key: 'AIzaSyDo2guI3rsMFK5goBQudQdrhYbJvOZKyuQ'},

			function(data){

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
	 var output ='<li>' +
	 '<div class="list-left">' +
	 '<iframe src="https://www.youtube.com/embed/'+thumb+'"></iframe>' +
	 '</div>'+
	 '<div class="list-right">'+
	 '<h4>' +title+'</h4>' +
	 '</div>' +
	 '</li>' +
	 '<div class ="clearfix"></div>'+
	 '';
	return output;
	}
});
