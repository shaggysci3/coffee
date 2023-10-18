//gets the hot and cold coffie div so we can append the array of data to it later
const hotCoffees = document.getElementById("hot-coffees");
const coldCoffees = document.getElementById("cold-coffees");
const newCoffeeForm = document.getElementById("new-coffee");
const coffeeDetails = document.getElementById("coffee-details");

newCoffeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createCoffee();
});

//console.log(coldCoffee)

const displayCoffee = () => {
    fetch('http://localhost:3000/coffees')
    .then(resp => resp.json())
    .then((data)=> {
        data.forEach(hotCoffee => {
            renderHotCoffee(hotCoffee)
        });
    })
}


const renderHotCoffee = (hotCoffee) => {
    //create divs and img tags for the hot coffie
    const coffeeImg = document.createElement("img");
    const coffeeDiv = document.createElement("div");

    coffeeImg.src =hotCoffee.image;

    coffeeDiv.appendChild(coffeeImg);
    hotCoffees.appendChild(coffeeDiv);

    //augmenting the tag(img) we created
    //hCoffieImg.src = hotCoffee.

}

const createCoffee = () => {
    const newCoffee = {
        "id": 0,
        "name": newCoffeeForm.name.value,
        "image": newCoffeeForm.image.value,
        "price": newCoffeeForm.price.value,
        "creamer": newCoffeeForm["new-creamer"].value,
        "sugar": newCoffeeForm["new-sugar"].value,
        "espresso": newCoffeeForm["new-espresso"].value,
        "milk": newCoffeeForm["new-milk"].value,
        "description": newCoffeeForm["new-description"].value
    };
}

displayCoffee();
