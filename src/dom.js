import {projects, deleteProject} from "./logic.js"; // functions [import]
import {project, toDo} from "./logic.js"; // classes [import]
export {updateProjectSidebar} // functions [export]

let mainContent = document.querySelector('#main');
let sidebar = document.querySelector('#sidebar');
let projectButtonContainer = document.querySelector('#projectButtonContainer');
let addProjectButton = document.querySelector('#addProjectButton');
let viewAllToDosButton = document.querySelector('#viewAllToDosButton');

viewAllToDosButton.addEventListener('click', () => {
    for (let i = 0; i < projects.length; i++){
        createProjectPage(projects[i]);
    }
});

addProjectButton.addEventListener('click', () => {
    createNewProjectDialog();
});

function updateProjectSidebar(){
    projectButtonContainer.innerHTML = '';
    for (let i=0; i < projects.length; i++){
        let projectName = projects[i].name;
        let projectBTN = document.createElement('button');
        projectBTN.textContent = projectName;

        projectBTN.addEventListener('click', () =>{
            createProjectPage(projects[i]);
        })

        projectButtonContainer.appendChild(projectBTN);
    }
}

function createNewProjectDialog(){
    let addProjectDialog = document.querySelector('#addProjectDialog');
    addProjectDialog.showModal();
    addProjectDialog.innerHTML = "";
    addProjectDialog.style.width = '300px';
    addProjectDialog.style.height = '200px';

    let closeButton = document.createElement('button');
    closeButton.textContent = "close";
    closeButton.addEventListener('click', () => addProjectDialog.close());

    let projectNameInputField = document.createElement('input');

    addProjectDialog.appendChild(closeButton);
    addProjectDialog.appendChild(projectNameInputField);

    let submitNewProjectButton = document.createElement('button');
    submitNewProjectButton.textContent =  "Create new project";

    submitNewProjectButton.addEventListener('click', () => {
        let newProject = new project (projectNameInputField.value, []);
        projects.push(newProject);
        updateProjectSidebar();
        addProjectDialog.close();
    });

    addProjectDialog.appendChild(submitNewProjectButton);
}

function createProjectPage(project){
    main.innerHTML = '';

    let addNewToDoButton = document.createElement('button');
    addNewToDoButton.textContent = "Add new To-Do";
    main.appendChild(addNewToDoButton);
    addNewToDoButton.addEventListener('click', () => openCreateNewToDoDialog(project));

    let name = project.name;
    let todos = project.todos;

    let projectName = document.createElement('h1');
    projectName.textContent = name;
    main.appendChild(projectName);

    for (let i=0; i < todos.length; i++){
        createToDoUI(todos[i]);
        // let todo = todos[i].title;
        // let todoText = document.createElement('h1');
        // todoText.textContent = todo;
        // main.appendChild(todoText);
    }
}

function createToDoUI(todo){
    let toDoContainer = document.createElement('div');
    mainContent.appendChild(toDoContainer);

    let title = todo.title;
    let todoTitleUI = document.createElement('h1');
    todoTitleUI.textContent = title;

    let description = todo.description;
    let tododescriptionUI = document.createElement('h1');
    tododescriptionUI.textContent = description;

    let dueDate = todo.dueDate;
    let todoDueDateUI = document.createElement('h1');
    todoDueDateUI.textContent = dueDate;

    let priority = todo.priority;
    let todoPriorityUI = document.createElement('h1');
    todoPriorityUI.textContent = priority;

    let notes = todo.notes;
    let todoNotesUI = document.createElement('h1');
    todoNotesUI.textContent = notes;

    let editToDoButton = document.createElement('button');
    editToDoButton.textContent = "Edit";
    editToDoButton.addEventListener('click', () => {openEditToDoDialog(todo)});

    let deleteToDoButton = document.createElement('button');
    deleteToDoButton.textContent = "Delete";
    deleteToDoButton.addEventListener('click', () => {deleteToDo(todo)});

    toDoContainer.appendChild(todoTitleUI)
    toDoContainer.appendChild(tododescriptionUI)
    toDoContainer.appendChild(todoDueDateUI)
    toDoContainer.appendChild(todoPriorityUI)
    toDoContainer.appendChild(todoNotesUI)
    toDoContainer.appendChild(editToDoButton)
    toDoContainer.appendChild(deleteToDoButton)
}

function openCreateNewToDoDialog(project){
    let newToDoDialog = document.createElement('dialog');

    let closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    let titleInputField = document.createElement('input');
    titleInputField.setAttribute('placeholder', 'title');
    let descriptionInputField = document.createElement('input');
    descriptionInputField.setAttribute('placeholder', 'description');
    let dueDateInputField = document.createElement('input');
    dueDateInputField.setAttribute('type', 'date');
    let priorityInputField = document.createElement('input');
    priorityInputField.setAttribute('placeholder', 'priority (H/M/L)');
    let notesInputField = document.createElement('input');
    notesInputField.setAttribute('placeholder', 'notes');
    let submitButton = document.createElement('button');
    submitButton.textContent = "Submit";

    closeButton.addEventListener('click', () => {
        newToDoDialog.innerHTML = '';
        newToDoDialog.close();
    });

    submitButton.addEventListener('click', () => {
        let title = titleInputField.value;
        let description = descriptionInputField.value;
        let dueDate = dueDateInputField.value;
        let priority = priorityInputField.value;
        let notes = notesInputField.value;
        let newTodo = new toDo (title, description, dueDate, priority, notes);
        project.addToDo(newTodo);
        createProjectPage(project);
    });
    

    main.appendChild(newToDoDialog);
    newToDoDialog.appendChild(closeButton);
    newToDoDialog.appendChild(titleInputField);
    newToDoDialog.appendChild(descriptionInputField);
    newToDoDialog.appendChild(dueDateInputField);
    newToDoDialog.appendChild(priorityInputField);
    newToDoDialog.appendChild(notesInputField);
    newToDoDialog.appendChild(submitButton);

    newToDoDialog.showModal();
}

function openEditToDoDialog(todo){ // <---------- TO-DO
    alert('Opened Edit Menu For this ToDo: ' + todo.name);
    let editToDoDialog = document.createElement('dialog');
    let closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    let editTitleInputField = document.createElement('input');
    editTitleInputField.setAttribute('placeholder', 'title');
    let editDescriptionInputField = document.createElement('input');
    editDescriptionInputField.setAttribute('placeholder', 'description');
    let editDueDateInputField = document.createElement('input');
    editDueDateInputField.setAttribute('type', 'date');
    let editPriorityInputField = document.createElement('input');
    editPriorityInputField.setAttribute('placeholder', 'priority (H/M/L)');
    let editNotesInputField = document.createElement('input');
    editNotesInputField.setAttribute('placeholder', 'notes');
    let submitButton = document.createElement('button');
    submitButton.textContent = "Submit";

    closeButton.addEventListener('click', () => {
        editToDoDialog.innerHTML = '';
        editToDoDialog.close();
    });

    submitButton.addEventListener('click', () => {
        let title = titleInputField.value;
        let description = descriptionInputField.value;
        let dueDate = dueDateInputField.value;
        let priority = priorityInputField.value;
        let notes = notesInputField.value;
        let newTodo = new toDo (title, description, dueDate, priority, notes);
        project.addToDo(newTodo);
        createProjectPage(project);
    });
    

    // main.appendChild(newToDoDialog);
    // newToDoDialog.appendChild(closeButton);
    // newToDoDialog.appendChild(titleInputField);
    // newToDoDialog.appendChild(descriptionInputField);
    // newToDoDialog.appendChild(dueDateInputField);
    // newToDoDialog.appendChild(priorityInputField);
    // newToDoDialog.appendChild(notesInputField);
    // newToDoDialog.appendChild(submitButton);

    // newToDoDialog.showModal();
}

function deleteToDo(todo, project){ // <---------- TO-DO
    // alert('Delete this ToDo: ' + todo.name);
    // project.deleteToDo(todo.name);

}