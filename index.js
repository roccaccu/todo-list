const dom = {
	addTaskBtn: document.querySelector('#add-task-btn'),
	descTaskInput: document.querySelector('#description-task'),
	todosWrapper: document.querySelector('.todos-wrapper'),
	countTask: document.querySelector('.count-task'),
}

// Создаем массив задачь
const key = 'todos'
let todos
let todoItem = []

// Проверка хранилища на присутствие массива
!localStorage.todos
	? (todos = [])
	: (todos = JSON.parse(localStorage.getItem(key)))

function updateStorage() {
	localStorage.setItem(key, JSON.stringify(todos))
}

// Функция конструктор, создает объект
function TodoConstructor(description) {
	this.description = description
	this.isDone = false
}

dom.addTaskBtn.addEventListener('click', () => {
	const inp = dom.descTaskInput
	// Валидация инпута на заполненность
	if (!inp.value) {
		alert('Введите задачу...')
		return
	}
	todos.push(new TodoConstructor(inp.value))
	updateStorage()
	showTask()
	dom.countTask.innerHTML = todos.length
		? `Активных задач: ${todos.length}`
		: 'Не активных задач...'
	inp.value = ''
})

function showTask() {
	dom.todosWrapper.innerHTML = ''
	if (todos.length) {
		todos.forEach((todo, index) => {
			dom.todosWrapper.innerHTML += createTodo(todo, index)
		})
		todoItem = document.querySelectorAll('.todo-item')
	}
	dom.countTask.innerHTML = todos.length
		? `Активных задач: ${todos.length}`
		: 'Не активных задач...'
}

// Функция темплэйт
function createTodo(todo, index) {
	return `
  <div class='todo-item ${todo.isDone ? 'checked' : ''}'>
        <div class='description'>${todo.description}</div>
        <div class='buttons'>
					<button value='saved' onclick="changeTask(${index})" class='btn-change'>Изменить</button>
          <input ${
						todo.isDone ? 'checked' : 'unchecked'
					} onclick="handleIsDoneTask(${index})" type='checkbox' class='btn-complete'/>
          <button onclick="deletedTask(${index})" class='btn-delete'>Удалить</button>
        </div>
      </div>
  `
}

function handleIsDoneTask(index) {
	todos[index].isDone = !todos[index].isDone
	if (todos[index].isDone) {
		todoItem[index].classList.add('checked')
	} else {
		todoItem[index].classList.remove('checked')
	}
	updateStorage()
}

function deletedTask(index) {
	todos.splice(index, 1)
	// todos.filter((todo, indexS) => indexS !== index)
	updateStorage()
	showTask()
}

function changeTask(index) {
	const btn = document.querySelector('.btn-change')
	if (btn.value === 'saved') {
		btn.value = 'changing'
		btn.innerHTML = 'Сохранить'
		btn.style.background = 'white'
		todos[index].description = 'hh'
		document.querySelector('.description') = 'hj'
	} else {
		btn.value = 'saved'
		btn.innerHTML = 'Изменить'
		btn.style.background = 'rgb(237, 151, 183)'
	}
	console.log(todos[index])
}

showTask()
