function Favorite(id) {
  const heartIcon = document.getElementById(id);
  if (heartIcon.classList.contains("fa-regular")) {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    heartIcon.style.color = "red";
    localStorage.setItem(id, "solid"); 
  } else {
    heartIcon.classList.remove("fa-solid");
    heartIcon.classList.add("fa-regular");
    heartIcon.style.color = "black";
    localStorage.setItem(id, "regular"); 
  }
}
const heartIcons = document.getElementsByClassName("fa-heart");
for (let i = 0; i < heartIcons.length; i++) {
  let heartIcon = heartIcons[i];
  let id = heartIcon.id;
  var statusHeart = localStorage.getItem(id);
  if (statusHeart === "solid") {
    heartIcon.classList.remove("fa-regular");
    heartIcon.classList.add("fa-solid");
    heartIcon.style.color = "red";
  }
}
function checkFavorite() {
  var heartIcons = document.getElementsByClassName("fa-heart");
  for (var i = 0; i < heartIcons.length; i++) {
    var heartIcon = heartIcons[i];
    var id = heartIcon.id;
    var status = localStorage.getItem(id);
    if (status === "solid") {
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid");
      heartIcon.style.color = "red";
    }
  }
}
window.onload = checkFavorite();
