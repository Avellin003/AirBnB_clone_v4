#!/usr/bin/env node

$(document).ready(function () {
    // Request http://0.0.0.0:5001/api/v1/status/
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            // If the status is "OK", add the class "available" to div#api_status
            $('#api_status').addClass('available');
        } else {
            // Otherwise, remove the class "available" from div#api_status
            $('#api_status').removeClass('available');
        }
    });
});

