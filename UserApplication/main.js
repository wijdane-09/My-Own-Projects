const input = document.getElementById('input');
const buttons = document.querySelectorAll('.buttons button');
const list = document.querySelectorAll('#list li');
const results = document.getElementById('results');

let currentFilter = 'all';

//button click
buttons.forEach(button => {
    button.addEventListener('click', () => {

        currentFilter = button.dataset.role;
        console.log(currentFilter);

    buttons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');
        
    userFilter();
    })
  
})

//input avent
input.addEventListener('input', () => {
    userFilter();
})

//users function
function userFilter() {
    
    const inputValue = input.value.trim().toLowerCase();
    let result = 0
    
    list.forEach(user => {

        const text = user.textContent.toLowerCase();

        const matchSearch = text.includes(inputValue);

        let matchFilter;

        if (currentFilter === 'all') {
            matchFilter = true;
        } else {
            matchFilter = user.dataset.role === currentFilter
        }
         
        if (matchSearch && matchFilter) {
            user.style.display = 'list-item';
            user.classList.add('highlight');
            result++
        } else {
            user.style.display = 'none';
            user.classList.remove('highlight');
            
        }
    });

    //after loop
    if (inputValue === '') {
        results.textContent = '';
    } else if (result === 0) {
        results.textContent = 'No Result Found'
    } else {
        results.textContent = result + ' results found'
    }

}
    