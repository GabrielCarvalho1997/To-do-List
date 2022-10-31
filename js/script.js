// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue; //Título antigo

// Funções

// Cria a tarefa e adiciona na lista
const saveTodo = (text) => {

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);
};

// Esconde os formulário abaixo para deixar o ambiente mais "clean"
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

// Atualiza a tarefa da lista
const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitleList = todo.querySelector("h3")

        if(todoTitleList.innerText === oldInputValue) {
            todoTitleList.innerText = text;
        }
    });
}

// Eventos

// Evento de enviar o formulário
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue);
        todoInput.value = "";
        todoInput.focus();
    }
});

// Evento de click dos botões da lista
document.addEventListener("click", (e) => {

    const targetEl = e.target;
    const parentEl = targetEl.closest("div"); //"pega" o elemento pai mais próximo
    let todoTitleList; //Título de cada item da lista de tarefas

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitleList = parentEl.querySelector("h3").innerText;
    }

    // completa a tarefa
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
    }

    // edita a tarefe
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitleList;
        oldInputValue = todoTitleList;
    }

    // remove a tarefa
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

});

// Cancela a edição e volta a mostrar os formulários
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        // atualizar
        updateTodo(editInputValue)
    }

    toggleForms();
})
