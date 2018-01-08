function main(){

  function randomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


$('button').click(function(){

  $('#resultRow').empty();

  var userInput = $('input').val();
  var api =
  "https://en.wikipedia.org/w/api.php?" +
  "format=json&" +
  "action=query&" +
  "generator=search&" +
  "gsrnamespace=0" +
  "&gsrlimit=10" +
  "&prop=pageimages|extracts" +
  "&piprop=thumbnail" +
  "&pilimit=max" +
  "&pithumbsize=150" +
  "&exintro" +
  "&explaintext" +
  "&exsentences=1" +
  "&exlimit=max" +
  "&origin=*" +
  "&gsrsearch=";

  var url = encodeURI(api + userInput);
  // var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=redirects%7Clinks&list=search&srsearch='+userInput+'&srprop=snippet%7Ctitlesnippet%7Credirecttitle%7Credirectsnippet%7Csectiontitle%7Csectionsnippet&srinterwiki=1&srenablerewrites=1'

  searchWiki(url);

});


function searchWiki(url){


  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'jsonp',
    success: function (data) {
      console.log(data);
      var searchData = data.query.pages;
      console.log(searchData);

      $.each(searchData, function(index,value){

        var articleTitle = value['title'].replace(/\s/g, "_");
        var resultHTML="";

          resultHTML = '<div class="col-lg-5 resultContent">';
          resultHTML += '<h2 class="resultTitle"><strong><a href=https://en.wikipedia.org/wiki/'+articleTitle+' target=_blank>'+value.title+'</strong></a></h2>';
          resultHTML += '<div class="row">';
          resultHTML += '<div class="col-5">';
          if (value.thumbnail !== undefined){
              resultHTML += '<a class="link-filler" target="_blank" href="https://en.wikipedia.org/?curid='+index+'"><img class="image-container" src='+value.thumbnail.source+' alt="'+articleTitle+'"></a>';
          }else{
              var color = randomColor();
              // var color = "lightblue"
              resultHTML += '<div class="filler mr-3" style=" background-color:'+color+' ">';
              resultHTML += '<a class="link-filler" target="_blank" href="https://en.wikipedia.org/?curid='+index+'">'+value.title[0]+'</a></div>';
            };
            resultHTML += '</div>'; //END inner content left coloumn

            resultHTML += '<div class="col-7">';
            resultHTML += '<p class="resultDescription">'+value.extract+'</p>';
            resultHTML += '</div>'; //END inner content right coloumn

            resultHTML += '</div>'; //END inner content row
            resultHTML += '</div>'; // END resultContent column

        $("#resultRow").append(resultHTML);
      }); // END each function procidure


    } //END success: function(data)

  }); // END ajax GET

} //END function searchWiki(url)


};//END main function


$(document).ready(main);
