#!/usr/bin/env node

$(document).ready(function () {
    // When the button tag with id "search-btn" is clicked
    $('#search-btn').click(function () {
        // Get the list of checked amenities
        var checkedAmenities = [];
        $('input[type="checkbox"]:checked').each(function () {
            checkedAmenities.push({
                id: $(this).data('id'),
                name: $(this).data('name')
            });
        });

        // Make a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: checkedAmenities
            }),
            success: function (data) {
                // Check if the API response is successful
                if (data.length > 0) {
                    // Clear existing places
                    $('.places').empty();

                    // Loop through the result and create an article tag for each Place
                    data.forEach(function (place) {
                        var article = $('<article>');
                        article.append('<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>');
                        article.append('<div class="information"><div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div><div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div></div>');
                        article.append('<div class="user"><b>Owner:</b> ' + place.user.first_name + ' ' + place.user.last_name + '</div>');
                        article.append('<div class="description">' + place.description + '</div>');

                        // Append the article to the places section
                        $('.places').append(article);
                    });
                }
            },
            error: function (error) {
                console.error('Error fetching places:', error);
            }
        });
    });
});
