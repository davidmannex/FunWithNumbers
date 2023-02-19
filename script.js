
if (localStorage.getItem("searches")==null ||localStorage.getItem("searches")==""){
    var searches=[]
}
else{
    var searches=localStorage.getItem("searches");
    searches=JSON.parse(searches);
    for(x=0;x<searches.length;x++){
        generateButton(searches[x][0]);
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
function getDog(){
    $('#dogPhoto').empty();
    let queryURL = `https://dog.ceo/api/breeds/image/random`;
    $.get(queryURL).then(function (response) {
        var searches=localStorage.getItem("searches");
        searches=JSON.parse(searches);
        console.log("DOG URL FROM RANDOM "+response.message);
        $('#dogPhoto').append("<img src='"+response.message+"'>");
        personName=$('#PERSON').text();
        console.log("PERSON NAME"+personName);
        for(x=0;x<searches.length;x++){
            if (searches[x][0]==personName){
                console.log("Saving new photo");
                
                console.log("personName="+personName);
                searches_entry=[personName,response.message];
                console.log("Searches ENtry to be added"+searches_entry);
                searches[x]=searches_entry;
                localStorage.setItem("searches",JSON.stringify(searches));
                break;
            }
            }    

});
}


function guessAge(name,URL){
    $('#informationCard').empty();
    $('#informationCard').append("<h1 id='PERSON'>"+name+"</h1>");
    let queryURL = `https://api.agify.io?name=${name}&country_id=US`;
    console.log("First Query");
    $.get(queryURL).then(function (response) {
        console.log(response);
        $('#informationCard').append("<h2>The API agify thinks you are: "+response.age+"</h2>");
        $('#informationCard').append(`<div id="dogPhoto"></div>`);
        $('#informationCard').append(`<button class="chooseNewDog">Choose New Dog</button>`)
        $(".chooseNewDog").on("click",function(){
            getDog();
        })

        $('#dogPhoto').empty();
        console.log("URL "+URL);
        console.log("dogURL"+URL);
        $('#dogPhoto').append("<img src='"+URL+"'>");
        return URL

    });
}
function generateButton(name){
    var button='<button class="btn load">'+name+'</button>';
    $('.buttons').append(button);
}

$(".submit").on("click",function () {
    modal.style.display = "none";
    var personName=$(this).siblings(".curName").val();
    console.log("Start of guess age call");
    $('#informationCard').empty();
    $('#informationCard').append("<h1 id='PERSON'>"+personName+"</h1>");
    let queryURL = `https://api.agify.io?name=${personName}&country_id=US`;
    $.get(queryURL).then(function (response) {
        console.log("In GUESSAGE QUERY SECTION");
        $('#informationCard').append("<h2>The API agify thinks you are: "+response.age+"</h2>");
        $('#informationCard').append(`<div id="dogPhoto"></div>`);
        $('#informationCard').append(`<button class="chooseNewDog">Choose New Dog</button>`)
        $(".chooseNewDog").on("click",function(){
            getDog();
        })
        $('#dogPhoto').empty();
        let queryURL = `https://dog.ceo/api/breeds/image/random`;
        $.get(queryURL).then(function (response) {
            console.log("DOG URL FROM RANDOM"+response.message);
            $('#dogPhoto').append("<img src='"+response.message+"'>");
            
        

        console.log("guessAge(name) dog URL="+response.message);
    
        console.log("after guess Age CALL");
        if(searches.indexOf(personName)==-1)
        {
            console.log(response.message);
            console.log(personName);
            searches_entry=[personName,response.message];
            console.log("Searches ENtry to be added")+searches_entry;
            searches.push(searches_entry);
            localStorage.setItem("searches",JSON.stringify(searches));
        }
        generateButton(personName);
    });
});
});


function applyButton(){
$(".load").on("click",function(){
    console.log("Loading");
    var name_of_button=$(this).text();
    console.log(name_of_button);
    var searches=localStorage.getItem("searches");
    searches=JSON.parse(searches);
    console.log(searches);
    for(x=0;x<searches.length;x++){
        if (searches[x][0]==name_of_button){
            console.log("off to guessage")
            guessAge(name_of_button,searches[x][1]);
            break;
        }
    }
    console.log("loaded");

});
}
applyButton();