// static/scripts/100-hbnb.js

$(document).ready(function () {
    var checkedStatesCities = [];

    // Listen to changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        if (this.checked) {
            // If the checkbox is checked, store the State or City ID in a variable
            checkedStatesCities.push({ id: id, name: name });
        } else {
            // If the checkbox is unchecked, remove the State or City ID from the variable
            checkedStatesCities = checkedStatesCities.filter(function (item) {
                return item.id !== id;
            });
        }

        // Update the h4 tag inside the div Locations with the list of States or Cities checked
        var locations = checkedStatesCities.map(function (item) {
            return item.name;
        }).join(', ');

        $('.filters .locations h4').text(locations);
    });

    // When the button tag is clicked
    $('#search-btn').click(function () {
        // Make a new POST request to places_search with the list of Amenities, Cities, and States checked
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({
                amenities: [],
                states: checkedStatesCities.map(function (item) {
                    return item.id;
                }),
                cities: checkedStatesCities.map(function (item) {
                    return item.id;
                })
            }),
            success: function (data) {
                // Handle the response here (create articles for each place, etc.)
            },
            error: function (error) {
                console.error('Error fetching places:', error);
            }
        });
    });
});
