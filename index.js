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
                    console.log(hotCoffee.image)

            });


        // data.forEach(hotCoffee => {
        //     renderHotCoffee(hotCoffee)

        // });
    })
}
const formData = newCoffeeForm.elements
console.log(formData[0])

const renderHotCoffee = (hotCoffee) => {
    //create divs and img tags for the hot coffie

    const coffeeImg = document.createElement("img");
    const coffeeDiv = document.createElement("div");

    coffeeImg.src = hotCoffee.image;
    coffeeImg.alt = hotCoffee.name;

    coffeeImg.addEventListener("mouseover", () => {
        displayCoffeeDetails(hotCoffee);
    });
    coffeeImg.addEventListener("mouseout", () => {
        coffeeDetails.style.display = "none";
    });
    
    //  coffeeImg.style.width = 'width:10px';
    //  coffeeImg.style.height - 'height:10px'
    coffeeImg.addEventListener("click", ()=>{

    })
    if (hotCoffee.type === 'hot'){
        coffeeDiv.appendChild(coffeeImg);
        hotCoffees.appendChild(coffeeDiv);
    }else if (hotCoffee.type ==='cold') {
        coffeeDiv.appendChild(coffeeImg);
        coldCoffees.appendChild(coffeeDiv);

    }

    //augmenting the tag(img) we created
    //hCoffieImg.src = hotCoffee.

}

const createCoffee = () => {
    const newCoffee = {
        "name": newCoffeeForm["new-name"].value,
        "image": newCoffeeForm["new-image"].value,
        "price": Number(newCoffeeForm["new-price"].value),
        "creamer": Number(newCoffeeForm["new-creamer"].value),
        "sugar": Number(newCoffeeForm["new-sugar"].value),
        "espresso": Number(newCoffeeForm["new-espresso"].value),
        "milk": Number(newCoffeeForm["new-milk"].value),
        "description": newCoffeeForm["new-description"].value
    };
}

displayCoffee();
