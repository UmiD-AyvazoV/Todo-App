const container = document.querySelector('.container');
const text = document.querySelector('.text');
const filter = document.querySelector('.filter');
const textForm = document.querySelector('#textForm');
const filterForm = document.querySelector('#filterForm');
const textInput = document.querySelector('.inp');
const filterInput = document.querySelector('#filter');
const plus = document.querySelector('.plus');
const search = document.querySelector('.search');
const todoList = document.querySelector('.taskarea'); 
const addTask = document.querySelector('.new-task-button'); 
const searchTask = document.querySelector('.search-task-button'); 
const count = document.querySelector(".count");
const delAllTasks = document.querySelector(".del-task-button");

const checks = document.querySelectorAll(".fa-solid fa-circle-check");

let todos;
  if( localStorage.getItem('todos') === null ){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

eventListeners();

function eventListeners(){
  addTask.addEventListener('click',showAddTask);
  searchTask.addEventListener('click',showSearchTask);
  textForm.addEventListener('submit',addTodo);
  todoList.addEventListener('click',selectedTodo);
  todoList.addEventListener('click',deletedTodo);
  document.addEventListener('DOMContentLoaded',showTodos);
  delAllTasks.addEventListener('click',deleteAllTodos);
  filterInput.addEventListener('keyup',filterTodos);
  search.addEventListener('click',closeSearchInput);
}

function showAddTask(){
  text.classList.add('visible');
}

function showSearchTask(){
  filter.classList.add('visible');
}

function addTodo(e){
  const newTodo = textInput.value.trim();
  if( newTodo === '' ) showAlert('danger','Zəhmət Olmasa 1 Todo Yazın...');
  else {
    todos.push({text: newTodo , completed: false});
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos();
    showAlert('success','Todo Uğurla Əlavə Edildi...');
  }
  textInput.value = '';
  text.classList.remove('visible');
  e.preventDefault();
}

function showAlert(type,message){
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  container.appendChild(alert);
  setTimeout( () => {
    alert.remove();
  },1000 );
}

function showTodos(){
    let todo = '';
    if( todos ){
      todos.map( todoItem => {
        todo += `
        <div class="tasks ${todoItem.completed ? 'completed' : ''}">
             <p>${todoItem.text}</p>
             <div class="task-update-delete">
               <div class="update">
                 <a href="#">
                   <i class="fa-solid fa-circle-check"></i>
                 </a>
               </div>
               <div class="delete">
                 <a href="#">
                   <i class="fas fa-times-circle"></i>
                 </a>
               </div>
             </div>
         </div>
        `;
      } );
    }
    todoList.innerHTML = todo;
    counter();
  }

function selectedTodo(e){
  if( e.target.className === 'fa-solid fa-circle-check' ){
    let todo = e.target.parentElement.parentElement.parentElement.parentElement;
    let text = todo.firstElementChild.textContent;
    todo.classList.toggle('completed');
    todos.find( todoItem => {
      if(todoItem.text === text) todoItem.completed = !todoItem.completed;
    } );
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  counter();
}

function deletedTodo(e){
  if( e.target.className === 'fas fa-times-circle' ){
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    showAlert('success','Todo Uğurla Silindi...');
    let del = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.textContent;
  todos.map( (todoItem,index) => {
    if( todoItem.text === del ) todos.splice(index,1);
  } );
  localStorage.setItem('todos', JSON.stringify(todos));
  }
  counter();
}

function counter(){
  count.innerText = todos.filter( todoItem => todoItem.completed === false ).length;
}

function deleteAllTodos(){
  todos.splice(0,todos.length);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodos();
  showAlert('success','Bütün Todo-lar Uğurla Silindi...');
}

function filterTodos(e){
  const filterValue = e.target.value.toLowerCase();
  const todoItems = document.querySelectorAll('.tasks');
  todoItems.forEach( todoItem => {
    const text = todoItem.textContent.toLowerCase();
    if( text.indexOf( filterValue ) === -1 ) todoItem.style.display = 'none';
    else todoItem.style.display = 'flex';
  } );
}

function closeSearchInput(){
  filter.classList.remove('visible');
}