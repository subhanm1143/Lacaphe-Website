const menuData = [
    {
        category: "Coffee",
        drinks: [
            { name: "MUỐI", description: "salted phin-dripped milk coffee, cloud cream", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=6#3"  },
            { name: "COCONUT", description: "phin-dripped coffee, coconut cream, grass jelly", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=15#3"  },
            { name: "UBE", description: "phin-dripped coffee, ube fresh milk", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=17#3"  },
            { name: "NÂU", description: "vietnamese coffee", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=14#3"  },
            { name: "BẠC XỈU", description: "lighter version of Nâu, less caffeinated", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=20#3"  }
        ]
    },
    {
        category: "Tea & Milk Tea",
        drinks: [
            { name: "LYCHEE", description: "premium lotus tea, fresh lychee pulps", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=16#4"},
            { name: "STRAWBERRY", description: "full-leaf oolong tea, homemade strawberries",link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=13#4" },
            { name: "KUMQUAT CHIA", description: "kumquat lotus tea, chia seeds, aloe vera", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=8#4" },
            { name: "HOUSE MILK TEA", description: "oolong jasmine milk tea, oolong pearls", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=4#4"  },
            { name: "GOLDEN LOTUS", description: "full-leaf oolong tea, lotus seeds, cloud cream", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=9#4"  }
        ]
    },
    {
        category: "Ice Blended",
        drinks: [
            { name: "KUMQUAT SALTED PLUM", description: "kumquat juice blended with salted plum and mint", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=12#5"  },
            { name: "COCOMANGO", description: "coconut milk blended with fresh mango bits", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=11#5"  },
            { name: "SAIGON FREEZE", description: "Signature Saigon but blended", link: "https://lacaphe.square.site/?location=11ee213d7e10ea94b2b23cecef6d5b2a&item=18#5"  }
        ]
    }
];

document.addEventListener('DOMContentLoaded', createDrinkElements);

function createDrinkElements() {
    const menuContainer = document.querySelector(".menu");

    menuData.forEach(category => {
        const categoryDiv = document.createElement("div");
        const categoryHeading = document.createElement("h1");
        categoryHeading.textContent = category.category;
        categoryDiv.appendChild(categoryHeading);

        category.drinks.forEach(drink => {
            const drinkDiv = document.createElement("div");
            drinkDiv.classList.add("menu-drink");

            const drinkLink = document.createElement("a");
            drinkDiv.classList.add("drinks_link");
            drinkLink.href = drink.link;
            drinkLink.target = "_blank";

            const nameHeading = document.createElement("h3");
            nameHeading.textContent = drink.name;

            const descriptionParagraph = document.createElement("p");
            descriptionParagraph.textContent = drink.description;

            drinkLink.appendChild(nameHeading);
            drinkLink.appendChild(descriptionParagraph);

            drinkDiv.appendChild(drinkLink);

            categoryDiv.appendChild(drinkDiv);
        });

        menuContainer.appendChild(categoryDiv);
    });
}
