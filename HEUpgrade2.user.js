// ==UserScript==
// @name         HEUpgrade v2
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Upgrade remaining CPUs and HDDs to max
// @author       Emin Afroz (Omega on HackerExperience)
// @include      https://legacy.hackerexperience.com/hardware*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         http://www.icon100.com/up/3294/256/panda_08.png
// ==/UserScript==

const account = 'ENTERACCHERE';
var totalServers = $(".widget-content.padding > ul > a").length;
var index = 0;
var interval;

$(document).ready(function() {
    interval = setInterval(upgrade,1750);
});

function upgrade(){
    $('.label.label-info').html("Completed: " + index + "/" + totalServers);

    var server = $(".widget-content.padding > ul > a").eq(index);
    cpuUnit = server.find(".list-user > small").eq(0).text();
    hddUnit = server.find(".list-user > small").eq(1).text();

    while(cpuUnit == "4 GHz" && hddUnit == "10 GB" && index < totalServers)
    {
        index++;
        server = $(".widget-content.padding > ul > a").eq(index);
        cpuUnit = server.find(".list-user > small").eq(0).text();
        hddUnit = server.find(".list-user > small").eq(1).text();
    }
    if(index >= totalServers)
    {
        clearInterval(interval);
        $('.label.label-info').html("Done :)");
    }
    else
    {
        serverID = server.attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
        getData('upgrade', serverID);
    }
}

//getData('upgrade', link);
function getData(itemToBuy, id){
    $.ajax({
        type: 'GET',
        url: "/hardware?opt=" + itemToBuy + "&id=" + id,
        data: {
            opt: itemToBuy,
            acc: account
        },
        success: function(data) {
            console.log("Success");
            postData('cpu','5000','8');
            postData('hdd','8000','6');
            index++;
        }
    });
}

//postData('cpu', 8000, 8);
function postData(itemToBuy, itemCost, itemId){
    var dataObject = {};
    dataObject.acc = account;
    dataObject.act = itemToBuy;
    dataObject['part-id'] = itemId;
    dataObject.price = itemCost;
    $.ajax({
        type: 'POST',
        data: dataObject,
        error: function() {
        console.log("Already upgraded!");
    }
    });
}
