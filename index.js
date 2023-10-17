//gets the hot and cold coffie div so we can append the array of data to it later
const hotCoffees = document.getElementById('hot-coffees')
const coldCoffees = document.getElementById('cold-coffees')
//console.log(coldCoffee)

const displayCoffee = () => {
    fetch('http://localhost:3000/coffees')
    .then(resp => resp.json())
    .then((data)=> {
        data.forEach( hotCoffee => {
            renderHotCoffie(hotCoffee)
        });
    })
}
const renderHotCoffee = (hotCoffee) => {
    //create divs and img tags for the hot coffie
    const hCoffieImg = document.createElement("img")
    const coffieDiv = document.createElement("div")

    //augmenting the tag(img) we created
    //hCoffieImg.src = hotCoffee.


}
displayCoffee();