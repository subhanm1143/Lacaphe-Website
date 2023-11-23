// Get all category buttons
const categories = document.querySelectorAll('.category');
const coffeeBtn = document.getElementById('coffee-btn');
const drinkDisplay = document.getElementById('drink-display');
let isCoffeeSelected = false;
let isTeaSelected = false;
let isOtherSelected = false;

document.addEventListener('DOMContentLoaded', () => {
    selectCategory(coffeeBtn);
    fetch('/drinks/list')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                console.log(item.name, item.image, item.price, item.type);
                                
            });
        })
        .catch(error => console.error('Error:', error));
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
    console.log("button clicked");
}


categories.forEach(category => {
    category.addEventListener('click', () => selectCategory(category));
})