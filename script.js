
if (localStorage.getItem("searches")==null ||localStorage.getItem("searches")==""){
    var searches=[]
}
else{
    var searches=localStorage.getItem("searches");
    searches=JSON.parse(searches);
    for(x=0;x<searches.length;x++){
        generateButton(searches[x]);
    }
}

// Get the modal from : https://www.w3schools.com/howto/howto_css_modals.asp
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function getFact(age){
    let queryURL = `http://numbersapi.com/${age}`;
    $.get(queryURL).then(function (response) {
        $('#infromationCard').append("<h3>The API NUMBERSAPI has this to say about that number: "+response+"</h3>");
    })
}

function guessAge(name){
    $('#infromationCard').empty();
    $('#infromationCard').append("<h1>"+name+"</h1>");
    let queryURL = `https://api.agify.io?name=${name}&country_id=US`;
    $.get(queryURL).then(function (response) {
        console.log(response);
        $('#infromationCard').append("<h2>The API agify thinks you are: "+response.age+"</h2>");
        getFact(response.age);
    });
}

function generateButton(cityName){
    var button='<button class="btn load">'+cityName+'</button>';
    $('.buttons').append(button);
}

$(".submit").on("click",function () {
    modal.style.display = "none";
    var inputedCity=$(this).siblings(".curName").val();
    guessAge(inputedCity);
    if(searches.indexOf(inputedCity)==-1)
    {
        searches.push(inputedCity);
        localStorage.setItem("searches",JSON.stringify(searches));
    }
    generateButton(inputedCity);

});

$(".load").on("click",function(){
    console.log($(this).val());
    guessAge($(this).text());

})