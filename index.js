const input = document.querySelector('.main__input-task').value;  //Инпут для ввода задачи
const btnTask = document.querySelector('.main__task-add'); //Кнопка для добавления задачи
let taskList = document.querySelector('.task-list'); // Элемент куда будет добавлять задача
let globalTask = document.querySelector('.task')
const form = document.querySelector('#taskDialog form');
const cancelBtn = document.getElementById('cancelBtn');
const taskDialog = document.getElementById('taskDialog');

// Открытие формы при клике на кнопку
btnTask.addEventListener('click', () => {
    taskDialog.showModal();
});

// Закрытие формы если нажать отмена
cancelBtn.addEventListener('click', () => {
    form.reset();
    taskDialog.close();
    input.value = '';
});



const toDoList = []; //Создаем пустой массив для хранения будущих задач

const handler = {
    set: function (target, property, value) {
        if (property === 'push') {
            if (!value.title || !value.deadline || !value.leadtime) {
                throw new Error('Заполните другие поля');
            }
        }
        target[property] = value;
        return true;
    }
};

const proxyToDoList = new Proxy(toDoList, handler);

function renderTask() {
    const title = document.querySelector('#title').value;
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;
    const descriptionTask = document.querySelector('#textArea').value;
    const colorTask = document.querySelector('#colorTask').value;


    const task = {
        title: title,
        deadline: endDate,
        leadtime: startDate,
        description: descriptionTask,
        color: colorTask,
        completate: false
    };

    try {
        proxyToDoList.push(task);
        alert('Задача добавлена!');
        console.log(task);
    } catch (e) {
        console.error(e.message);
    }

    form.reset();
    taskDialog.close();
}

const addButton = document.querySelector('#Push-Task');
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    renderTask();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderTask();
});