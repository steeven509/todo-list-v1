const todoInput = document.querySelector('.todo-input')
const todoBox = document.querySelector('.todo-box')
const filters = document.querySelectorAll('.filters span')
const clearAll = document.querySelector('.clear-button')

let todos = JSON.parse(localStorage.getItem('todo-list'))

filters.forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active')
        btn.classList.add('active')
        showTodo(btn.id)
    })
})

//************* Showing All Task from local storage ************************
function showTodo(filter) {
    let li = ''
    if (todos) {
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == 'completed' ? 'checked' : ''
            if (filter == todo.status || filter == 'all') {
                li += `<li class="todo-item ${isCompleted}">
                          <div class="todo-item-checkbox-parent">
                            <input onclick="updateStatus(this)" type="checkbox" id=${id} ${isCompleted}/>
                            <label for=${id} class="todo-item-checkbox">
                                <img src="./images/icon-check.svg" alt="icon check">
                            </label>
                         </div>

                         <p class="todo-item-title ${isCompleted}">${todo.name}</p>
                         <img src="./images/icon-cross.svg" onclick="deleteTask(${id})" alt="icon cross" class="todo-item-delete">
                      </li>`
            }
        })
    }
    todoBox.innerHTML =
        li || `<div class="todo-item-empty">You don't have any task here</div>`
}
showTodo('all')

function deleteTask(deleteId) {
    todos.splice(deleteId, 1)
    localStorage.setItem('todo-list', JSON.stringify(todos))
    showTodo('all')
}

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length)
    localStorage.setItem('todo-list', JSON.stringify(todos))
    showTodo('all')
})

function updateStatus(selectedTask) {
    let taskItem = selectedTask.parentElement.parentElement.children[1]
    console.log(taskItem)
    console.log(selectedTask.checked)

    if (selectedTask.checked) {
        taskItem.classList.add('checked')
        todos[selectedTask.id].status = 'completed'
    } else {
        taskItem.classList.remove('checked')
        todos[selectedTask.id].status = 'pending'
    }
    localStorage.setItem('todo-list', JSON.stringify(todos))
}

todoInput.addEventListener('keyup', (e) => {
    let userTodo = todoInput.value.trim()
    if (e.key == 'Enter' && userTodo) {
        if (!todos) {
            todos = []
        }
        todoInput.value = ''
        let todoInfo = { name: userTodo, status: 'pending' }
        todos.push(todoInfo)
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showTodo('all')
    }
})

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
        darkTheme
    )
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](
        iconTheme
    )
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
