const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    //clear data
    searchField.value = '';
    document.getElementById('search-result').textContent = '';
    if (searchText == '') {
        const search = document.getElementById('search-result');
        const p = document.createElement('p');
        p.innerText = `enter value`;
        search.appendChild(p);
    }
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        //console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
    }
    //load data

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (meals.length == 0) {
        console.log(meals);
        const searchResult = document.getElementById('search-result');
        const p = document.createElement('p');
        p.innerText = 'results not found';
        searchResult.appendChild(p);
    }
    else {
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

}

const loadMealDetail = mealId => {
    //console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  `;
    mealDetails.appendChild(div);
}