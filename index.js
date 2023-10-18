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
//test

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

//mouseover
    coffeeImg.addEventListener("mouseover", function (event) {
        const coffeeName = document.getElementById("coffee-name");
        const coffeeImage = document.getElementById("coffee-image");
        const coffeeDescription = document.getElementById("coffee-description");
        const coffeePrice = document.getElementById("coffee-price");

        coffeeName.textContent = hotCoffee.name;
        coffeeImage.src = hotCoffee.image;
        coffeeDescription.textContent = hotCoffee.description;
        coffeePrice.textContent = hotCoffee.price;
        coffeeDetails.style.display = "block";
    });
//mouseout

    coffeeImg.src = hotCoffee.image;
 


    coffeeImg.addEventListener("click", ()=>{

        console.log(hotCoffee.id)
        const detailName = document.getElementById("big-name");
        detailName.textContent = hotCoffee.name

        const detailImg = document.getElementById("big-image");
        detailImg.src = hotCoffee.image;

        const DetailDescrip =  document.getElementById("big-description");
        DetailDescrip.textContent = hotCoffee.description;

        const detailPrice = document.getElementById("big-price");
        detailPrice.textContent = hotCoffee.price

        document.getElementById('big-details').style = "display: block;"
        
    })
    if (hotCoffee.temp === 'hot'){
        coffeeDiv.appendChild(coffeeImg);
        hotCoffees.appendChild(coffeeDiv);
    }else if (hotCoffee.temp ==='cold') {
        coffeeDiv.appendChild(coffeeImg);
        coldCoffees.appendChild(coffeeDiv);

    }

    // json-server --watch db.json
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
