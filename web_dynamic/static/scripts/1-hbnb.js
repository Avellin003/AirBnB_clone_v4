#!/usr/bin/env node

$(document).ready(function () {
    var selectedAmenities = [];

    $('input[type="checkbox"]').change(function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            // Checkbox is checked, add Amenity ID to the list
            selectedAmenities.push({ id: amenityId, name: amenityName });
        } else {
            // Checkbox is unchecked, remove Amenity ID from the list
            selectedAmenities = selectedAmenities.filter(function (amenity) {
                return amenity.id !== amenityId;
            });
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        var amenitiesText = selectedAmenities.map(function (amenity) {
            return amenity.name;
        }).join(', ');

        $('.popover h4').text(amenitiesText);
    });
});
