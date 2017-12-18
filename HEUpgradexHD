// ==UserScript==
// @name         HEUpgrade (xHD)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Upgrade remaining xHDDs to max
// @author       Emin Afroz (Omega on HackerExperience)
// @include      https://legacy.hackerexperience.com/hardware?opt=xhd
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @icon         http://www.icon100.com/up/3294/256/panda_08.png
// ==/UserScript==

const account = 'ENTERACCHERE';
var total = $('.widget-content > ul > a').length;
var index = 0;
var interval;

function getRequest(itemToBuy, xhdId)
{
    $.ajax({
        type: 'GET',
        url: "/hardware?opt=" + itemToBuy + "&id=" + xhdId,
        data:
        {
            opt: itemToBuy,
            id:	xhdId
        },
        success: function() {
            postRequest(serverId);
            index++;
        }
    });
}

function postRequest(xhdId)
{
    var dataObject = {};
    dataObject.acc = account;
    dataObject.act = 'xhd';
    dataObject['part-id'] = '3';
    dataObject.price = '500';
    $.ajax({
        type: 'POST',
        url: 'https://legacy.hackerexperience.com/hardware?opt=xhd&id=' + xhdId,
        data: dataObject,
    });
}

function upgradeXHD()
{
    xhds = $('.widget-content > ul > a').eq(index);
    xhdUnit = xhds.find('.list-user > small').eq(0).text();

    while(xhdUnit == "1 GB" && index < total)
    {
        index++;
        xhds = $('.widget-content > ul > a').eq(index);
        xhdUnit = xhds.find('.list-user > small').text();
    }
    if(index == total)
    {
        clearInterval(interval);
        $('.widget-title > .label').html("Done :)");
    }
    else
    {
        $('.widget-title > .label').html("Upgraded: " + index + "/" + total);
        serverId = xhds.attr('href').replace("hardware?opt=xhd&id=","");
        getRequest("xhd", serverId);
    }
}

$(document).ready(function(){
    interval = setInterval(upgradeXHD,2000);
});
