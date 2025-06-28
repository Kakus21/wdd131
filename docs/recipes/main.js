import recipes from './recipes.mjs';

// Generate a random integer >= 0 and < num
function random(num) {
  return Math.floor(Math.random() * num);
}

// Return a random recipe from the list
function getRandomListEntry(list) {
  const index = random(list.length);
  return list[index];
}

// Generate the tags HTML
function tagsTemplate(tags) {
  return `
    <div class="tags-container">
      ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
  `;
}

// Generate the ratings HTML
function ratingTemplate(rating) {
  let html = `
    <span
      class="rating"
      role="img"
      aria-label="Rating: ${rating} out of 5 stars">
  `;

  for (let i = 1; i <= 5; i++) {
    html += i <= rating
      ? `<span aria-hidden="true" class="icon-star">⭐</span>`
      : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
  }

  html += `</span>`;
  return html;
}

// Generate the full recipe HTML
function recipeTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" width="800" height="600" />
      <div>
        ${tagsTemplate(recipe.tags)}
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p class="description">${recipe.description}</p>
      </div>
    </article>
  `;
}

// Render an array of recipes
function renderRecipes(recipeList) {
  const recipesSection = document.querySelector('.recipes');
  const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
  recipesSection.innerHTML = recipesHTML;
}

// On load, show a random recipe
function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}
init();

// Attach search event handler
const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', searchHandler);

// Handle search form submission
function searchHandler(event) {
  event.preventDefault();

  const input = event.target.querySelector('input[name="search"]');
  const query = input.value.trim().toLowerCase();

  const filteredRecipes = filterRecipes(query);
  renderRecipes(filteredRecipes);
}

// Filter recipes by query in name, description, tags, or ingredients
function filterRecipes(query) {
  if (!query) {
    return [...recipes].sort((a, b) => a.name.localeCompare(b.name));
  }

  const filtered = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const descMatch = recipe.description.toLowerCase().includes(query);
    const tagMatch = recipe.tags.find(tag => tag.toLowerCase().includes(query));
    const ingredientsMatch = recipe.recipeIngredient.find(ingredient =>
      ingredient.toLowerCase().includes(query)
    );

    return nameMatch || descMatch || tagMatch || ingredientsMatch;
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}
