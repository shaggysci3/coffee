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

const displayCoffee = () => {
    fetch('http://localhost:3000/coffees')
    .then(resp => resp.json())
    .then((data)=> {
        data.forEach(coffeeDrink => {
            renderCoffee(coffeeDrink)
        });
    })
}

const renderCoffee = (coffeeDrink) => {

    const coffeeImg = document.createElement("img");
    const coffeeDiv = document.createElement("span");
    coffeeDiv.setAttribute("class", "coffee-pics");

//mouseover
    coffeeImg.addEventListener("mouseover", function (event) {
        const coffeeName = document.getElementById("coffee-name");
        const coffeeImage = document.getElementById("coffee-image");
        const coffeeDescription = document.getElementById("coffee-description");
        const coffeePrice = document.getElementById("coffee-price");

        coffeeName.textContent = coffeeDrink.name;
        coffeeImage.src = coffeeDrink.image;
        coffeeDescription.textContent = coffeeDrink.description;
        coffeePrice.textContent = coffeeDrink.price;
        coffeeDetails.style.display = "block";
    });

    coffeeImg.addEventListener("mouseout", function (event) {
        coffeeDetails.style.display = "none";
    });
    coffeeImg.src = coffeeDrink.image;


    //click
    coffeeImg.addEventListener("click", ()=>{

        console.log(coffeeDrink.id)
        const detailName = document.getElementById("big-name");
        detailName.textContent = coffeeDrink.name

        const detailImg = document.getElementById("big-image");
        detailImg.src = coffeeDrink.image;

        const DetailDescrip =  document.getElementById("big-description");
        DetailDescrip.textContent = coffeeDrink.description;

        const detailPrice = document.getElementById("big-price");
        detailPrice.textContent = coffeeDrink.price

        document.getElementById('problemChild').style = "display: block;"
        

    })
//dblclick
    coffeeImg.addEventListener("dblclick", () =>{
        likeCoffee(coffeeDrink);
    })

    if (coffeeDrink.temp === 'hot'){
        coffeeDiv.appendChild(coffeeImg);
        hotCoffees.appendChild(coffeeDiv);
    } else if (coffeeDrink.temp ==='cold') {
        coffeeDiv.appendChild(coffeeImg);
        coldCoffees.appendChild(coffeeDiv);
    }

//delete
    const deleteBttn = document.createElement("button");
    deleteBttn.className = "delete-bttn";
    deleteBttn.textContent = "Delete";
    deleteBttn.addEventListener("click", (e) => {
        e.stopPropagation();
        const coffeeId = coffeeDrink.id;
        fetch(`http://localhost:3000/coffees/${coffeeId}`, {
            method: "DELETE",
        })
        .then((resp) => resp.json())
        .then(() => {
            coffeeDiv.remove();
        });
    });
    coffeeDiv.appendChild(deleteBttn);
}

//form
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
    renderCoffee(newCoffee)
}

//likes
const likeCoffee = (drink) => {
    const drinkLikes = drink.likes
    drink.likes += 1

    fetch(`http://localhost:3000/coffees/${drink.id}`, {
        method:"PATCH",
        headers: { "Content-Type":"application/json" },
        body:JSON.stringify(drink)
    })
    window.alert(`You and ${drinkLikes} other people like our ${drink.name}!`);
}



displayCoffee();
