const textInput = document.getElementById('textInput');
const priority = document.getElementById('priority');
const addBtn = document.getElementById('addBtn');
const taskContainer = document.getElementById('taskContainer');
const filterPriority = document.getElementById('filterPriority');
const searchInput = document.getElementById('searchInput');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');
const sortTasks = document.getElementById('sortTasks');
const clearBtn = document.getElementById('clearBtn');

let tasks = JSON.parse(localStorage.getItem('TasksManager')) || [];
let editIndex = null;

/*show tasks function */
function showTasks (data) {

    taskContainer.textContent = '';

    data.forEach(task => {
        
        const realIndex = tasks.indexOf(task);

        /*container */
        const box = document.createElement('div');
        box.classList.add('box')

        /*title */
        const title = document.createElement('h3');
        title.textContent = task.text;
        title.classList.add('title')

        /*toggle */
        if (task.completed) {
            title.classList.add('toggle')
        }
        
        title.addEventListener('click', () => {
            task.completed = !task.completed

            applyFilters();
            saveTasks();
        });

        /*priority */
        const categText = document.createElement('small');
        categText.textContent = task.categOption;
        categText.classList.add('categText')

        /*delete button*/
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('deleteBtn')

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            tasks.splice(realIndex, 1);

            applyFilters();
            saveTasks();
        })

        /*edit button*/
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.classList.add('editBtn')

        editBtn.addEventListener('click', () => {

            textInput.value = task.text;
            priority.value = task.categOption;

            addBtn.textContent = 'Update';

            editIndex = realIndex;
        })

        box.appendChild(title);
        box.appendChild(categText);
        box.appendChild(deleteBtn);
        box.appendChild(editBtn);

        taskContainer.appendChild(box)

    })
};
/*refresh */
applyFilters();

/*add button */
addBtn.addEventListener('click', () => {

    const inputValue = textInput.value.trim();
    const priorityValue = priority.value;

    if ( inputValue === '') return;

    if (editIndex === null) {

        tasks.push({

            id: Date.now(),
            text: inputValue,
            categOption: priorityValue,
            completed: false
        })
    } else {
        tasks[editIndex].text = inputValue;
        tasks[editIndex].categOption = priorityValue;

        editIndex = null;

        addBtn.textContent = 'Add a Task'
    }

    textInput.value = '';
    priority.value = 'high';

    applyFilters();
    saveTasks();
})

/*filter */
function applyFilters () {

    const searchValue = searchInput.value.trim().toLowerCase();
    const searchValuePriority = filterPriority.value;

    let filteredTasks = tasks.filter(task => {

        //search condition
        const matchSearch = task.text.toLowerCase().includes(searchValue);

        //priority condition
        const matchPriority = searchValuePriority === 'all' || task.categOption === searchValuePriority;

        return matchSearch && matchPriority    
    })
    
    filteredTasks = sortData(filteredTasks);

    showTasks(filteredTasks);
    updateStats();

}

filterPriority.addEventListener('change', () => {
    applyFilters ();
})

searchInput.addEventListener('input', () => {
    applyFilters ();
   
})

//function result
function updateStats() {

    //total tasks
    totalTasks.textContent = `Total: ${tasks.length}`;

    //completed tasks
    const completed = tasks.filter(task => {
        return task.completed
    })

    completedTasks.textContent = `Completed: ${completed.length}`;

    //pending tasks
    pendingTasks.textContent = `Pending: ${tasks.length - completed.length}`
}



//localstorage
function saveTasks () {
    localStorage.setItem('TasksManager', JSON.stringify(tasks))
}

//sort
function sortData(data) {
    
    const sortValue = sortTasks.value;

    if (sortValue === 'default') {
        return data
    }

    return [...data].sort((a, b) => {

        const priorityOrder = {
            high: 3,
            medium: 2, 
            low: 1
        };

        if (sortValue === 'highToLow') {

            return priorityOrder[b.categOption] - priorityOrder[a.categOption];
        }

        return priorityOrder[a.categOption] - priorityOrder[b.categOption]
    });
}

sortTasks.addEventListener('change', () => {
    applyFilters ();
})

//clear button
clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => {
        return !task.completed
    })

    saveTasks();
    applyFilters();
})