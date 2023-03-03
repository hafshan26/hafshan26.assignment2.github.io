const photoViewer = document.querySelector("#photoViewer");
const favoritesList = document.querySelector("#favoritesList");
const maxFavorites = 5;
let favoritesCount = 0;

// create a zoomed photo div
function createZoomedPhoto(photoFile, zoomedFile) {
  // create zoomed photo div
  const zoomedPhotoDiv = document.createElement("div");
  zoomedPhotoDiv.classList.add("zoomed-photo");

  // create zoomed photo img
  const zoomedPhotoImg = document.createElement("img");
  zoomedPhotoImg.src = zoomedFile;
  zoomedPhotoDiv.appendChild(zoomedPhotoImg);

  // create close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    zoomedPhotoDiv.remove();
  });
  zoomedPhotoDiv.appendChild(closeButton);

  // create add to favorites button
  const addToFavoritesButton = document.createElement("button");
  addToFavoritesButton.textContent = "Add to Favorites";
  addToFavoritesButton.addEventListener("click", () => {
    if (favoritesCount >= maxFavorites) {
      alert("Favorites list is full. Remove a favorite before adding a new one.");
      return;
    }
    const favoritePhoto = document.createElement("img");
    favoritePhoto.src = photoFile;
    favoritePhoto.setAttribute("data-photo", photoFile);
    favoritePhoto.addEventListener("click", () => {
      const removeButton = favoritePhoto.nextElementSibling;
      removeButton.style.display = "inline";
    });
    favoritesList.appendChild(favoritePhoto);
    favoritesCount++;
  });
  zoomedPhotoDiv.appendChild(addToFavoritesButton);

  // append zoomed photo div to photo viewer
  photoViewer.appendChild(zoomedPhotoDiv);
}

// add click event listener to photo divs
const photoDivs = document.querySelectorAll(".photo");
photoDivs.forEach((photoDiv) => {
  const photoFile = photoDiv.getAttribute("data-photo");
  const zoomedFile = photoDiv.getAttribute("data-zoomed");
  photoDiv.addEventListener("click", () => {
    createZoomedPhoto(photoFile, zoomedFile);
  });
});

// remove a favorite photo from favorites list
function removeFavorite(photo) {
  photo.remove();
  favoritesCount--;
  if (favoritesCount === 0) {
    const removeButtons = favoritesList.querySelectorAll(".remove");
    removeButtons.forEach((button) => {
      button.style.display = "none";
    });
  }
}

// add click event listener to favorite photos
favoritesList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "IMG") {
    const removeButton = target.nextElementSibling;
    removeButton.style.display = "inline";
  }
});

// add click event listener to remove buttons
favoritesList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("remove")) {
    const photo = target.previousElementSibling;
    removeFavorite(photo);
    target.style.display = "none";
  }
});
