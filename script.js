let editMode = false;
let currentTask = null;
let todos = [];         // initialize array 


// Load tasks from local storage when the page loads
window.onload = function() {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        displayTasks();             // display task after loading page also
    }
};

function get_value() {
    let input_title = document.getElementById("title_box").value;
    let errorMessage = document.getElementById("error-message");
    // If title box is empty then Error message pops up
    if (input_title.trim() === "") {
        errorMessage.style.display = "block";// Show the error message
        return;
    } else {
        errorMessage.style.display = "none";// Hide the error message
    }
        // if edit button is clicked 
    if (editMode) {
        // select h3 tag to input text
        currentTask.title = input_title;
        document.getElementById("add_button").innerText = "Add";
        editMode = false;
        currentTask = null;
        // display those task
    } else {
        let newTask = {
            id: Date.now(),
            title: input_title
        };
        todos.push(newTask);// add new task to array
    }
    
    saveTasks(); // call save task function
    displayTasks(); // call display task function
    document.getElementById("title_box").value = "";
}

function displayTasks() {
    let taskcontainer = document.getElementById("taskcontainer");
    taskcontainer.innerHTML = "";
    todos.forEach(task => {
        let newTaskDiv = document.createElement("div");// create div
        newTaskDiv.className = "display-box";// class name for div
        newTaskDiv.dataset.id = task.id;

        let titleDiv = document.createElement("div");// create div
        titleDiv.className = "h3_div";                // class name for div
        titleDiv.innerHTML = '<h3>' + task.title + '</h3>';// display the input text or task description

        let buttonsDiv = document.createElement("div");// create div for buttons
        buttonsDiv.className = "button_div";            // class name for button_div

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerText = "🗑️";
        deleteButton.addEventListener('click', function() {// if delete button is clicked delete function get executed
            deleteTask(task.id);                            // function to delete
        });

        let editButton = document.createElement("button");   // div for edit button
        editButton.className = "edit_button";                   // class name for edit div
        editButton.innerText = "✏️";
        editButton.addEventListener('click', function() {           // if edit button is clicked edit function get executed
            edittask(task.id);                                  //function to edit
        });

        buttonsDiv.appendChild(editButton);                     // After all function is executed all element appended to parent element
        buttonsDiv.appendChild(deleteButton);
        newTaskDiv.appendChild(titleDiv);
        newTaskDiv.appendChild(buttonsDiv);
        taskcontainer.appendChild(newTaskDiv);
        
    });
    console.log(todos);
}

function saveTasks() {
    localStorage.setItem('todos', JSON.stringify(todos));       // save all task to arrray
    console.log(todos);
}

function deleteTask(taskId) {
    todos = todos.filter(task => task.id !== taskId);             // when delete button is clicked
    saveTasks();                                                  // array get updated and display reamining items
    displayTasks();
}

function edittask(taskId) {                                          // function to edit task
    currentTask = todos.find(task => task.id === taskId);            // select that particular task with that task id 
    document.getElementById("modal_title_box").value = currentTask.title;   // open model box and continue editing
    document.getElementById("editModal").style.display = "block";
}

function closeModal() {                                             // function to close model box
    document.getElementById("editModal").style.display = "none";
}

function updateTask() {                                             // function to update task
    let updatedTitle = document.getElementById("modal_title_box").value;
    let errorMessage = document.getElementById("error-message1");
    if (updatedTitle.trim() === "") {
        errorMessage.style.display = "block";
        return;
    } else {
        errorMessage.style.display = "none";
    }
    currentTask.title = updatedTitle;
    saveTasks();// after updating tassk save function is called
    displayTasks(); // display all task with updated information
    closeModal();
}

window.onclick = function(event) {                  // close button for pop up edit box
    let modal = document.getElementById("editModal");
    if (event.target === modal) {
        closeModal();
    }
}
