const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

/* get todo */
const getTodo = JSON.parse(localStorage.getItem('TodoList')) || [];

/* render function */
function render() {

    list.innerHTML = '';

    getTodo.forEach((todo, index) => {

        const li = document.createElement('li');
        li.classList.add('li-item')

        /* ===== TEXT SPAN ===== */
        const textSpan = document.createElement('span');
        textSpan.textContent = todo.text;

        if (todo.completed) {
            textSpan.style.textDecoration = 'line-through';
        }

        /* toggle */
        textSpan.addEventListener('click', () => {
            getTodo[index].completed = !getTodo[index].completed;
            localStorage.setItem('TodoList', JSON.stringify(getTodo));
            render();
        });

        /* ===== DELETE ===== */
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('deleteBtn');

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            getTodo.splice(index, 1);
            localStorage.setItem('TodoList', JSON.stringify(getTodo));
            render();
        });

        /* ===== EDIT ===== */
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
        editBtn.classList.add('editBtn');

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            li.innerHTML = '';

            const editInput = document.createElement('input');
            editInput.value = getTodo[index].text;
            editInput.classList.add('editInput')

            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.classList.add('saveBtn')

            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                getTodo[index].text = editInput.value;
                localStorage.setItem('TodoList', JSON.stringify(getTodo));
                render();
            });

            li.appendChild(editInput);
            li.appendChild(saveBtn);
        });

        /* append */
        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

/* refresh */
render();

/* add todo */
addBtn.addEventListener('click', () => {

    const value = todoInput.value.trim();
    if (value === '') return;

    getTodo.push({
        text: value,
        completed: false
    });

    localStorage.setItem('TodoList', JSON.stringify(getTodo));
    todoInput.value = '';
    render();
});