const searchFood = async () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  //console.log(searchText);
  if (searchText === '') {
    const errorField = document.getElementById('error-field');
    errorField.innerText = 'Search field can not be EMPTY.';
    document.getElementById('search-result').textContent = '';
    document.getElementById('meal-details').textContent = '';
    return;
  }
  //clear data
  searchField.value = '';
  document.getElementById('search-result').textContent = '';
  document.getElementById('error-field').textContent = '';
  document.getElementById('meal-details').textContent = '';

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displaySearchResult(data.meals);

}

const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result');
  //searchResult.textContent = '';
  console.log(meals);
  if (meals == null) {
    const errorField = document.getElementById('error-field');
    errorField.innerText = 'No result found';
    return;
  }
  meals.forEach(meal => {
    //console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div onclick="loadMealDetail('${meal.idMeal}')" class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
        `;
    searchResult.appendChild(div);
  });

}

const loadMealDetail = async mealId => {
  //console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  // fetch(url)
  //   .then(res => res.json())
  //   .then(data => displayMealDetail(data.meals[0]))
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);

}

const displayMealDetail = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  //mealDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>

  `;
  mealDetails.appendChild(div);
}