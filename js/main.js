function main(){


$('button').click(function(){

  $('#resultContainer').empty();

  var userInput = $('input').val();
  var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=redirects%7Clinks&list=search&srsearch='+userInput+'&srprop=snippet%7Ctitlesnippet%7Credirecttitle%7Credirectsnippet%7Csectiontitle%7Csectionsnippet&srinterwiki=1&srenablerewrites=1'
  
  searchWiki(url);

});


function searchWiki(url){


  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function (data) {
      var searchData = data.query.search;

      searchData.forEach(function(value,index){
        var articleUrl = value['title'].replace(/\s/g, "_");

        $("#resultContainer").append('<div class="row well-lg resultContent">'+
                                       '<h2 class="resultTitle"><strong>'+value.title+'</strong></h2>' +
                                       '<p class="resultDescription">'+value.snippet+'</p>' +
                                       '<a href=https://en.wikipedia.org/wiki/'+articleUrl+' target=_blank>Show me more...</a>' +
                                      '</div>' );


      });


    } //END success: function(data)

  }); // END ajax GET

} //END function searchWiki(url)


};//END main function


$(document).ready(main);
