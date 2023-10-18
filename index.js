//gets the hot and cold coffie div so we can append the array of data to it later
const hotCoffees = document.getElementById("hot-coffees");
const coldCoffees = document.getElementById("cold-coffees");
const newCoffeeForm = document.getElementById("new-coffee");
const coffeeDetails = document.getElementById("coffee-details");
const formData = newCoffeeForm.elements


newCoffeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createCoffee();
    newCoffeeForm.reset();
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

// formData.forEach(userInput =>{
//     console.log(userInput)
// })




const renderHotCoffee = (hotCoffee) => {
    //create divs and img tags for the hot coffie

    const coffeeImg = document.createElement("img");
    const coffeeDiv = document.createElement("div");

    coffeeImg.src = hotCoffee.image;
    //  coffeeImg.style.width = 'width:10px';
    //  coffeeImg.style.height - 'height:10px'
    coffeeImg.addEventListener("click", ()=>{
        const detailImg = document.querySelector(".coffee-image")
        const detailName = document.querySelector(".coffee-name")
        const DetailDescrip = document.querySelector(".coffee-description")
        const detailPrice = document.querySelector(".coffee-price")
    })
    if (hotCoffee.temp === 'hot'){
        coffeeDiv.appendChild(coffeeImg);
        hotCoffees.appendChild(coffeeDiv);
    }else if (hotCoffee.temp ==='cold') {
        coffeeDiv.appendChild(coffeeImg);
        coldCoffees.appendChild(coffeeDiv);

    }


    //augmenting the tag(img) we created
    //hCoffieImg.src = hotCoffee.

}

const createCoffee = () => {
    let newCoffee = {
        "name": newCoffeeForm.name.value,
        "image": newCoffeeForm.image.value,
        "price": Number(newCoffeeForm.price.value),
        "creamer": Number(newCoffeeForm["new-creamer"].value),
        "sugar": Number(newCoffeeForm["new-sugar"].value),
        "espresso": Number(newCoffeeForm["new-espresso"].value),
        "milk": Number(newCoffeeForm["new-milk"].value),
        "temp": newCoffeeForm["drinkTemp"].value,
        "description": newCoffeeForm["new-description"].value
    };

    fetch('http://localhost:3000/coffees', {
        method:"POST",
        headers: { "Content-Type":"application/json" },
        body:JSON.stringify(newCoffee)
    })
    renderHotCoffee(newCoffee)
}

displayCoffee();
