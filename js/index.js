var skyEvents = [];

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device Ready ...');
    
}

$(document).ready(function () {
    loadSkyEvents();
});




function showDiv(divClassName) {
    
    var x = document.getElementsByClassName(divClassName); 
    for (var j=0; j != x.length; j++) {

    
    $(x[j]).fadeIn("slow");
        
    $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
        
    }
}

function hideAllDivs(){
    var y = document.getElementById("contentDivs").querySelectorAll('.appHomeDiv,.skyEventsDiv,.observatoryEventsDiv,.SED,.OED,.galleryDiv,.schoolProgramsDiv,.groupProgramsDiv,.aboutDiv,.bookingsDiv,.LAP,.contactDiv');
    for (var i=0; i != y.length; i++) {

    y[i].style.display= 'none';  
    }
}

function loadSkyEvents() {
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1/po/getSkyEvents.php',
        dataType: 'json',
        success: function(data) {
            if(data.error) {
                console.log("ERROR: " + data.errorMsg);
            }
            skyEvents = data.skyevents;
            addskyEvents();
        }
    });
}

function addskyEvents() {
    console.log("eventsList", skyevents);
    skyevents.forEach(function(field, index) {
        console.log("field", field);
        $("#output").append( "Name: " + field.skyevents_name + " Details: " + field.sky_description + "<br/>");
    });
}