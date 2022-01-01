var request = require("request");
var cheerio = require("cheerio");
//var fs = require("fs");
var currentDate = new Date();
var url = "http://www.seasky.org/astronomy/astronomy-calendar-" + currentDate.getFullYear() + ".html";

request(url, function(err, response, html){
    if(!err){
        var $ = cheerio.load(html);
        var eventsList = new Array();
        $('div#right-column-content>ul>li>p').each(function(index) {
            var event = {
                Date: null,
                Name: null,
                Description: null,
                Year: currentDate.getFullYear()
            };
            var children = $(this).children();
            $(children).each(function(index2) {
                if(index2 == 0) {
                    event.Date = $(this).text();
                } else if (index2 == 1) {
                    event.Name = $(this).text();
                    event.Description = $(this)[0]['next']['data'];
                }
            });
            eventsList.push(event);
        });

        console.log("Events Array", eventsList);

        // connect to db via php sending eventsList

        //var upload = new XMLHttpRequest();
        //upload.send("http://pe-ps1809.scem.westernsydney.edu.au/uploadSkyEvents.php")
    } else {
        console.log("Error finding url'" + url + "'", err);
    }
});
