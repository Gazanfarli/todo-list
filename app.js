// adding global variables
const body = document.querySelector(".container");
const container = document.querySelector(".container");
const sortIcon = document.querySelector("#sort-icon")
const removeIcon = document.querySelector(".remove-icon");
const addBtn = document.querySelector(".addBtn");
const todoInput = document.querySelector("#todo-input");
const todoInputParent = document.querySelector(".todo-input-container");
const removeIconContainer = document.querySelector(".remove-icon-container");

eventListeners();

function eventListeners(){
    // setting event listeners
    sortIcon.addEventListener("click", listTodos)
    addBtn.addEventListener("click", addTodo);
    todoInputParent.addEventListener("click", deleteTodo);
}

let clickCounter = 0;

function listTodos(){
    clickCounter++;
    let todos = getTodosFromStorage();
    if(todos.length == 0) return 0;
    sortIconChange();

    todoInputParent.innerHTML = '';
    todoInputParent.style.borderRadius = "10px";
    todoInputParent.style.border = "1px solid #C4C4C4";
    todoInputParent.style.margin = "0 0 18px 0";
    
    if(clickCounter % 2 == 0) todos.reverse(); // checking if second click
    if(clickCounter % 3 == 0) return window.location.reload();
    // adding todos to UI
    todos.forEach((e, index) => {
        let todoElement = document.createElement("div");
        todoElement.className = "todo-input-container";

        todoElement.innerHTML = 
        `
            <p class="list-item">${e}</p>
                <div class="remove-icon-container">
                <img src="./images/remove.png" alt="remove" class="remove-item">
            </div>
        `;
        todoInputParent.append(todoElement);
    })
}

function addTodo(){ // adding todo
        const newTodo = todoInput.value.trim();
        todoInput.value = "";
        if(newTodo === ""){
            showAlert("danger","Please, enter a todo.");
        }
        else if(controlTodo(newTodo)){
            showAlert("warning", "This todo has already been recorded.");
        }
        else{
            addTodoToStorage(newTodo);
            showAlert("success", "Todo is added");
        }
}

function deleteTodo(e){
    if(e.target.className === "remove-icon-container"){
        deleteTodoFromStorage(e.target.previousElementSibling.value);
    }
    if(e.target.className == "remove-item"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.previousElementSibling.textContent);
    }
    todoInput.value = "";
}

function getTodosFromStorage(){ // adding todo and checking if there is an error
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function showAlert(type,message){
    // creating message with alert 
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    body.appendChild(alert);

    // setTimeOut
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function controlTodo(newTodo){
    // checking if todo exists
    let todos = getTodosFromStorage();
    if(todos.indexOf(newTodo) == -1){
        return false;
    } 
    return true;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    if(deleteTodo == "") return 0;
    if(todos.indexOf(deleteTodo) == -1){
        return showAlert("warning", "There is not todo with that name");
    }

    // removing element from todos array
    let index = todos.indexOf(deleteTodo);
    todos.splice(index, 1);
    showAlert("success", "Todo is deleted.");

    // updating todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function sortIconChange(){
    sortIcon.style.background = "url('./images/sortup.png') no-repeat";
    sortIcon.addEventListener("mouseenter", function(){
        sortIcon.style.background = "url('./images/sortup-hover.png') no-repeat"
    })
    sortIcon.addEventListener("mouseleave", function(){
        sortIcon.style.background = "url('./images/sortup.png') no-repeat"
    })
}