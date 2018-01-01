// ==UserScript==
// @name         HEUpgrade v3.1
// @namespace    http://tampermonkey.net/
// @version      3.1
// @description  Upgrade remaining CPUs and HDDs to max
// @author       Emin Afroz (Omega on HackerExperience)
// @include      https://*.hackerexperience.com/hardware
// @include      https://*.hackerexperience.com/hardware?opt=upgrade
// @include      https://*.hackerexperience.com/internet?view=clan
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         http://www.icon100.com/up/3294/256/panda_08.png
// ==/UserScript==

const account = 'ACCNUMBER';
var totalServers = $(".widget-content.padding > ul > a").length;
var index = 0;
var times;
var interval;
var clan;

$(document).ready(function() {
    clan = window.location.href.includes("clan");
    $('.label.label-info').html("Starting...");
    times = prompt("How many servers to upgrade? Leave negative value for all.",-1);
    if(times !== null && times !== 0)
        interval = setInterval(upgrade,500);
    else
        $('.label.label-info').html("Have a nice day. ^^");
});

function upgrade(){
    if(times === 0 || index == totalServers)
    {
        clearInterval(interval);
        $('.label.label-info').html("Done :)");
        return;
    }
    else
        $('.label.label-info').html("Completed: " + index + "/" + totalServers);

    var server = $(".widget-content.padding > ul > a").eq(index);
    cpuUnit = server.find(".list-user > small").eq(0).text();
    hddUnit = server.find(".list-user > small").eq(1).text();

    while(cpuUnit == "4 GHz" && hddUnit == "10 GB")
    {
        index++;
        server = $(".widget-content.padding > ul > a").eq(index);
        cpuUnit = server.find(".list-user > small").eq(0).text();
        hddUnit = server.find(".list-user > small").eq(1).text();
    }

    serverID = server.attr('href').replace("?opt=upgrade&id=","").replace("hardware","");

    if(cpuUnit != "4 GHz")
        getData(serverID,true);
    if(hddUnit != "10 GB")
        getData(serverID,false);

    index++;
    times--;
}

//getData(link,true);
function getData(id,isCPU){
    var tempUrl;
    if(clan)
        tempUrl = "/internet?view=clan&action=upgrade&server=" + id;
    else
        tempUrl =  "/hardware?opt=upgrade&id=" + id;

    $.ajax({
        type: 'GET',
        async: false,
        url: tempUrl,
        success: function() {
            if(isCPU)
                postData('cpu',5000,8);
            else
                postData('hdd',8000,6);
        }
    });
}

//postData('cpu', 5000, 8);
function postData(itemToBuy, itemCost, itemId){
    currentCost = moneyToNumber(itemCost);
    if(currentCost < itemCost)	{
        clearInterval(interval);
        $('.label.label-info').html("Out of money! :(");
        return;
    }
    var dataObject = {};
    dataObject.acc = account;
    dataObject.act = itemToBuy;
    dataObject['part-id'] = itemId;
    dataObject.price = itemCost;
    if(clan)
        dataObject.clan = 1;
    $.ajax({
        type: 'POST',
        async: false,
        data: dataObject,
        success: function() {
            currentCost -= itemCost;
            var newCost = "$" + currentCost.toLocaleString();
            $("div.finance-info > div > span").html(newCost);
	    console.log("Bought a server!")	
        },
        error: function() {
            console.log("Already upgraded!");
        }
    });
}

//moneyToNumber("$123,456");
function moneyToNumber(x) {
    currency = $("div.finance-info > div > span").html();
    money = parseInt(currency.replace(/[^0-9\.-]+/g,""));
    return money;
}
