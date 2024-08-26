document.getElementById('searchBtn').addEventListener('click', function() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    const ingredients = ingredientInput.split(',').map(ingredient => ingredient.trim()).join(',');
    
    const apiKey = '87c482fea4326ce71d1fbb7c8c05db3c';
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=73864a30&app_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const recipesContainer = document.getElementById('recipesContainer');
            recipesContainer.innerHTML = '';

            data.hits.forEach(hit => {
                const recipe = hit.recipe;
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.label}">
                    <h3>${recipe.label}</h3>
                    <p><strong>Source:</strong> ${recipe.source}</p>
                    <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredientLines.slice(0, 3).join(', ')}${recipe.ingredientLines.length > 3 ? ', ...' : ''}</p>
                    <a href="${recipe.url}" target="_blank">View Recipe</a>
                `;

                recipesContainer.appendChild(recipeCard);
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
});
