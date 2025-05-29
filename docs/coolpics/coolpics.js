const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

const viewer = document.getElementById("viewer");
const gallery = document.querySelector(".gallery");

function viewerTemplate(src, alt) {
  return `
    <div class="modal-wrapper">
      <img src="${src}" alt="${alt}">
      <button class="close-viewer">X</button>
    </div>
  `;
}

function handleImageClick(event) {
  const clickedImage = event.target.closest("img");
  if (!clickedImage) return;

  const src = clickedImage.getAttribute("src");
  const alt = clickedImage.getAttribute("alt");

  const fullSrc = src.split('-')[0] + '-full.jpeg';

  viewer.innerHTML = viewerTemplate(fullSrc, alt);
  viewer.showModal();

  const closeButton = viewer.querySelector(".close-viewer");
  closeButton.addEventListener("click", () => {
    viewer.close();
  });
}

gallery.addEventListener("click", handleImageClick);

viewer.addEventListener("click", (event) => {
  if (event.target === viewer) {
    viewer.close();
  }
});
