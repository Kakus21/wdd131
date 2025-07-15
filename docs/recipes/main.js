import recipes from './recipes.mjs';

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const index = random(list.length);
  return list[index];
}

function tagsTemplate(tags) {
  return `
    <div class="tags-container">
      ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
  `;
}

function ratingTemplate(rating) {
  let html = `<span
    class="rating"
    role="img"
    aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `<article class="recipe-card">
    <img src="${recipe.image}" alt="${recipe.name}" width="800" height="600" />
    <div>
      ${tagsTemplate(recipe.tags)}
      <h2>${recipe.name}</h2>
      ${ratingTemplate(recipe.rating)}
      <p class="description">${recipe.description}</p>
    </div>
  </article>`;
}

function renderRecipes(recipeList) {
  const recipesSection = document.querySelector(".recipes");
  const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");
  recipesSection.innerHTML = recipesHTML;
}

function searchHandler(event) {
  event.preventDefault();

  const input = event.target.querySelector('input[name="search"]');
  const query = input.value.trim().toLowerCase();

  const filteredRecipes = filterRecipes(query);
  renderRecipes(filteredRecipes);
}

function filterRecipes(query) {
  if (!query) {
    return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
  }

  return recipes
    .filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(query);
      const descMatch = recipe.description.toLowerCase().includes(query);
      const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
      const ingredientsMatch = recipe.recipeIngredient.find(ingredient =>
        ingredient.toLowerCase().includes(query)
      );

      return nameMatch || descMatch || tagMatch || ingredientsMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);

  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', searchHandler);
}

init();
