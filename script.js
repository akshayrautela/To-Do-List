console.log("Hello JS");
let form = document.querySelector('form');      // form
let input = document.querySelector('#input-text');    //input 
let list = document.querySelector('#list');     //ul tag - for list

//  now we will create an Array for Storing these todo tasks
let arr = loadtodo();
updateTodoList();
console.log(arr);

form.addEventListener('submit', function (e) {
    e.preventDefault();     //  This prevents the page from reloading
    addtodo();  //  a function for creating todo 
});

function addtodo()  //  Read the Text from input field , Add that Text to the Array
{
    let task = input.value.trim();
    if (task.length > 0) {
        
        const todoObj = {
            text: task,
            completed: false,
        }

        arr.push(todoObj); //  add the string to the array
        console.log(arr);
        updateTodoList();
        savetodo();
        input.value = '';     // reset the input text value after submitting
    }
}
function updateTodoList() {
    list.innerHTML = '';
    arr.forEach((todoValues, todoIndex) => {
        todoItem = create(todoValues, todoIndex);
        list.append(todoItem);
    })


}
function create(todoValues, todoIndex) {
    let li = document.createElement('li');
    const todoObjValue = todoValues.text; 

    const todoid = 'todoValues-' + todoIndex;
    li.className = 'todo';
    li.innerHTML = `<input type="checkbox" id="${todoid}">
                    <label for="${todoid}" class="custom-checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                    </label>
                    <label for="${todoid}" class="todo-text">
                        ${todoObjValue}
                    </label>
                    <button class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path
                                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                    </button>`
    const deleteButton = li.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        deletetodo(todoIndex);
    })
    const checkbox = li.querySelector('input');

    checkbox.addEventListener('change' , ()=>{
        arr[todoIndex].completed = checkbox.checked;    //  .checked property returns a true / false based on the event change for checkbox
        savetodo();
    })

    checkbox.checked = todoValues.completed;
    return li;
}
function deletetodo(todoIndex){
    //      One of the Hardest Part here .filter Method
    arr = arr.filter((_,i)=> i!==todoIndex);
    savetodo();
    updateTodoList();

}
// --------------------------------The Hard Part(1% Mind)------------------------------------------------------------
// Saves the todo in local Storage 
function savetodo()
//localStorage -  is a object of windows Interface , allows to store key value pair in the browser only with no expiration date
{
    const todoString = JSON.stringify(arr)
    localStorage.setItem("todoValues", todoString);
}
//fuction to Load the save todo
function loadtodo() {
    const todo = localStorage.getItem("todoValues") || "[]";
    return JSON.parse(todo);
}
