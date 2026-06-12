const textInput = document.getElementById('textInput');
const categoryInput = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('taskContainer');
const searchInput = document.getElementById('searchInput');
const filterPriority = document.getElementById('filterPriority');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');
const clearBtn = document.getElementById('clearBtn');

let task = JSON.parse(localStorage.getItem('Tasks')) || [];
let editIndex = null

/*function */
function showNote(data) {

    taskContainer.innerHTML = '';

    data.forEach(note => {

        const realIndex = task.indexOf(note);

        const div = document.createElement('div');
        div.classList.add('box')

        const title = document.createElement('h2');
        title.textContent = note.text;
        title.classList.add('title-style')

        /*toggle */
        if (note.completed) {
            title.style.textDecoration = 'line-through';
        }

        title.addEventListener('click', () => {
            note.completed = !note.completed;

            applyFilters();
            saveTasks()
        })

        const categText = document.createElement('small');
        categText.textContent = note.categOption;
        categText.classList.add('category')
  
        /*delete button */
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('deleteBtn')

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            task.splice(realIndex, 1);

            applyFilters();
            saveTasks()
        })
        
        /*edit button */
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.classList.add('editBtn')

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            textInput.value = note.text;
            categoryInput.value = note.categOption;

            addBtn.textContent = 'Update';

            editIndex = realIndex;

        })

    div.appendChild(title);
    div.appendChild(categText);
    div.appendChild(deleteBtn)
    div.appendChild(editBtn);

    taskContainer.appendChild(div)
    })
};

/*refresh*/
showNote(task);


/*add button */
addBtn.addEventListener('click', () => {
    const inputValue = textInput.value.trim();
    const categoryValue = categoryInput.value;

    if (inputValue === '') return;

    if (editIndex === null) {

       task.push({
        text: inputValue,
        categOption: categoryValue,
        completed: false
    });
    } 
    else {
        task[editIndex].text = inputValue;
        task[editIndex].categOption = categoryValue;

        editIndex = null;

        addBtn.textContent = 'Add';

    }
    textInput.value = '';
    categoryInput.value = 'high';

    applyFilters();
    saveTasks()
})

function applyFilters() {

    const searchValue = searchInput.value.toLowerCase();

    const priorityValue = filterPriority.value;

    
    const filteredTasks = task.filter(note => {
        
        // search condition
        const matchSearch = note.text.toLowerCase().includes(searchValue);

        // priority condition

        const matchPriority = priorityValue === 'all' ||  note.categOption === priorityValue;

        return matchSearch && matchPriority;
    })

    showNote(filteredTasks)

    updateStats()
}

searchInput.addEventListener('input', () => {
    applyFilters();
})


filterPriority.addEventListener('change', () => {
    applyFilters();
})

//function results
function updateStats() {

    totalTasks.textContent = `total: ${task.length}`;

    const completed = task.filter(note => {
        return note.completed
    });

    completedTasks.textContent = `Completed: ${completed.length}`;

    pendingTasks.textContent = `Pending: ${task.length - completed.length}`
    

}

updateStats();

//localStorage
function saveTasks() {

    localStorage.setItem('Tasks', JSON.stringify(task));
}

//clear button
clearBtn.addEventListener('click', () => {
    task = task.filter(note => {
        return !note.completed
    })

    saveTasks();
    applyFilters()
})

//sort button
function priority() {

  const priorityOrder = {

    high: 3,
    medium: 2,
    low: 1
    };

   task.sort((a, b) => {

    return priorityOrder[b.categOption] - priorityOrder[a.categOption];
    });
    saveTasks();
    applyFilters();
    }
 
sortBtn.addEventListener('click', () => {
    priority();
 })