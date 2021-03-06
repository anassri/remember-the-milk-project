const searchBar = document.getElementById('searchBar');
const list = document.querySelector('.list-group');

searchBar.addEventListener('keydown', (event) => {
  // grab the string typed in the search bar
  const searchString = event.target.value.toLowerCase();
  // grab all of the li elements generated in the ul, each the li elements will be every seperate projoect
  const projects = list.getElementsByTagName('div');

  searchBar.classList.remove('search-bar');

  searchBar.addEventListener('blur', (event) => {
    searchBar.classList.add('search-bar');
    searchBar.value = "";
  })
  // create an array from these projects to iterate
  Array.from(projects).forEach((project) => {

    // grab project name form li innerHTML
    const name = project.innerHTML;

    // compare search string to project names to find the one user is looking for
    if (name.toLowerCase().indexOf(searchString) !== -1) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none'
    }
  })
})
