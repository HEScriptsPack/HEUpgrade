// ==UserScript==
// @name         HEUpgrade
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  This script will upgrade all the CPUs and HDDs to maximum.
// @author       Emin Afroz (Omega on HackerExperience)
// @match        https://*.hackerexperience.com/hardware
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         http://www.icon100.com/up/3294/256/panda_08.png
// ==/UserScript==
 
const account = 'ENTERACCOUNTNUMBER';
 
function upgradeCPU(){
var servers = $(".widget-content.padding > ul > a");
    var nextIndex = -1;
    var serverLink = "";
 
    //Find CPU link
    servers.each(function(index) {
        cpuUnit = $(this).find(".list-user > small").eq(0).text();
        if(cpuUnit != "4 GHz")
        {
            nextIndex = index;
            serverLink = "https://legacy.hackerexperience.com/hardware?opt=upgrade&id=" + $(this).attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
            return false;
        }
    });
 
    if(nextIndex == -1)
    {
        //window.alert("All CPUs are already upgraded!");
        return false;
    }
    else if($('div.span8 > div:nth-child(1) > div.widget-content.nopadding > table > tbody > tr').length > 1)
    {
        //Buy the CPU
        var dataObject = {};
        dataObject.acc = account;
        dataObject.act = 'cpu';
        dataObject['part-id'] = '8';
        dataObject.price = '5000';
        $.ajax({
            type: 'POST',
            data: dataObject
        });
    }
    window.location = serverLink;
}
 
function upgradeHDD(){
var servers = $(".widget-content.padding > ul > a");
    var nextIndex = -1;
    var serverLink = "";
 
    //Find CPU link
    servers.each(function(index) {
        hddUnit = $(this).find(".list-user > small").eq(1).text();
        if(hddUnit != "10 GB")
        {
            nextIndex = index;
            serverLink = "https://legacy.hackerexperience.com/hardware?opt=upgrade&id=" + $(this).attr('href').replace("?opt=upgrade&id=","").replace("hardware","");
            return false;
        }
    });
 
    if(nextIndex == -1)
    {
        //window.alert("All HDDs are already upgraded!");
        return false;
    }
    else if($('div.span8 > div:nth-child(2) > div.widget-content.nopadding > table > tbody > tr').length > 1)
    {
        //Buy the HDD
        var dataObject = {};
        dataObject.acc = account;
        dataObject.act = 'hdd';
        dataObject['part-id'] = '6';
        dataObject.price = '8000';
        $.ajax({
            type: 'POST',
            data: dataObject
        });
    }
    window.location = serverLink;
}

$(document).ready(function() {
    upgradeCPU();
    upgradeHDD();
});
