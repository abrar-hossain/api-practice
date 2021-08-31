const loadBuddies = () => {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => displayBuddies(data))
}
loadBuddies();
const displayBuddies = data => {
    //console.log(data.results);
    const buddies = data.results;
    const buddiesContainer = document.getElementById('buddies');
    for (const buddy of buddies) {
        //console.log(buddy.name.first);//name object first property that is why name.first;
        const p = document.createElement('p');
        p.innerText = `Name: ${buddy.name.title} ${buddy.name.first} ${buddy.name.last},  email:${buddy.email}`;
        buddiesContainer.appendChild(p);
    }

}