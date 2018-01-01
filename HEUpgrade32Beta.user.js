// ==UserScript==
// @name         HEUpgrade v3.2
// @namespace    Omega
// @version      3.2
// @description  Upgrade remaining CPUs and HDDs to max
// @author       Emin Afroz (Omega on HackerExperience)
// @include      https://*.hackerexperience.com/hardware
// @include      https://*.hackerexperience.com/hardware?opt=xhd
// @include      https://*.hackerexperience.com/hardware?opt=upgrade
// @include      https://*.hackerexperience.com/internet?view=clan
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         http://www.icon100.com/up/3294/256/panda_08.png
// ==/UserScript==

const account = 'ENTERACCHERE';
var totalServers;
var index = 0, counter = 0;
var interval;
var clan, isCPU, isXHD;

$(document).ready(function() {
    isXHD = window.location.href.includes("xhd");
    clan = window.location.href.includes("clan");
    $('.label.label-info:first').html("Starting...");
    var times = prompt("How many servers to upgrade? Leave negative value for all.",-1);
    if(times > 0)
    {
        totalServers = times;
        interval = setInterval(upgrade,500);
    }
    else if(times < 0)
    {
        totalServers = $(".widget-content.padding > ul > a").length;
        interval = setInterval(upgrade,500);
    }
    else
        $('.label.label-info:first').html("Have a nice day. ^^");
});

function upgrade(){
    if(counter == totalServers)
    {
        clearInterval(interval);
        $('.label.label-info:first').html("Done :)");
    }
    else
    {
        $('.label.label-info:first').html("Completed: " + index + "/" + totalServers);
        var server = $(".widget-content.padding > ul > a").eq(index);

        if(isXHD)
        {
            xHDUnit = server.find('.list-user > small').eq(0).text();
            while(xHDUnit == "1 GB")
            {
                index++;
                server = $(".widget-content.padding > ul > a").eq(index);
                xHDUnit = server.find('.list-user > small').text();
            }

            serverID = server.attr('href').replace("hardware?opt=xhd&id=","");
            getData(serverID);
        }
        else
        {
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
            {
                isCPU = true;
                getData(serverID);
            }
            if(hddUnit != "10 GB")
            {
                isCPU = false;
                getData(serverID);
            }
        }
        index++;
        counter++;
    }
}

//getData(link);
function getData(id){
    var tempUrl;
    if(isXHD)
        tempUrl = "/hardware?opt=xhd&id=" + id;
    else if(clan)
        tempUrl = "/internet?view=clan&action=upgrade&server=" + id;
    else
        tempUrl =  "/hardware?opt=upgrade&id=" + id;

    $.ajax({
        type: 'GET',
        async: false,
        url: tempUrl,
        success: function() {
            if(isXHD)
                postData('xhd',500,3);
            else if(isCPU)
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
        $('.label.label-info:first').html("Out of money! :(");
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
            console.log("Upgraded a server!");
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
