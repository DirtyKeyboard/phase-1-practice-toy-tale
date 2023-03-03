let addToy = false;
//div id : toy-collection
//cards go into a div with class of card
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.querySelector('form.add-toy-form').addEventListener('submit', newToyForm)

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(el => makeToyCard(el)))
});
/*
h2 tag with the toy's name
img tag with the src of the toy's image attribute and the class name "toy-avatar"
p tag with how many likes that toy has
button tag with a class "like-btn" and an id attribute set to the toy's id number

*/

function makeToyCard(toy)
{
  const container = document.getElementById('toy-collection')
  const card = document.createElement('div')
  const name = document.createElement('h2')
  const image = document.createElement('img')
  const likes = document.createElement('p')
  const likeBtn = document.createElement('button')

  card.setAttribute('class','card')
  card.dataset.id = toy.id
  name.textContent = toy.name;
  image.src = toy.image;
  image.setAttribute('class', 'toy-avatar')
  likes.textContent = toy.likes + " Likes";
  likeBtn.setAttribute('class','like-btn') 
  //likeBtn.dataset.id = toy.id;
  likeBtn.textContent = 'Like ❤️'
  likeBtn.addEventListener('click', (e) => {
    let newLikes = toy.likes + 1;
    toy.likes = newLikes;
    likes.textContent = newLikes + " Likes";
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({likes: newLikes})
    })

  })
  card.append(name,image,likes,likeBtn)
  container.append(card)
}

function newToyForm(e)
{
  e.preventDefault();
  const newName = document.getElementById('new-toy-name').value
  const newImg = document.getElementById('new-toy-image').value
  e.target.reset()
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: newName,
      image: newImg,
      likes: 0
    })
  }).then(resp => resp.json())
  .then(e => {console.log(e);makeToyCard(e)})
}