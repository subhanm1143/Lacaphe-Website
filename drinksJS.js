// Get all category buttons
const categories = document.querySelectorAll('.category');
const coffeeBtn = document.getElementById('coffee-btn');
let isCoffeeSelected = false;
let isTeaSelected = false;
let isOtherSelected = false;

document.addEventListener('DOMContentLoaded', () => {
    selectCategory(coffeeBtn);
})

/**
 * Adds the appropriate CSS class to the category selected.
 * 
 * When the category (technically a button) is clicked, the function will 
 * add the .selected subclass to the button's CSS style, and remove the 
 * subclass' styling from the other category.
 *  
 * 
 * @param {*} selected 
 */
function selectCategory(selected) {
     
    categories.forEach(category => {
        category.classList.remove('selected');
    });

    selected.classList.add('selected');
}


categories.forEach(category => {
    category.addEventListener('click', () => selectCategory(category));
})