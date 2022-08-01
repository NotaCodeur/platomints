
import React, { useState, useEffect, Component, useMemo, useCallback } from 'react';
import jQuery from 'jquery';

const BubblesText = () => {

    // Created for an Articles on:
// https://www.html5andbeyond.com/bubbling-text-effect-no-canvas-required/

jQuery(document).ready(function($){
 
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,6,8,10,4,6,8,10,4,6,8,10,4,6,8,10,30];
 
    // Push the header width values to bArray
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
     
    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){
         
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.1'
        }, 9900, function(){
            $(this).remove()
        }
        );
 
 
    }, 1950);
 
});


    return (
        <div class="bubbles" >
            <h3 className='siteTitle'>Latest play to mints </h3>
        </div >
    )
}

export default BubblesText;