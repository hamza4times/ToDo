import {projects, deleteProject} from "./logic.js"; // functions [import]
import {getItem, setItem, clearStorage} from "./storage.js"; // functions [import] - storage
import {project, toDo} from "./logic.js"; // classes [import]
export {updateProjectSidebar} // functions [export]

let mainContent = document.querySelector('#main');
let sidebar = document.querySelector('#sidebar');
let projectButtonContainer = document.querySelector('#projectButtonContainer');
let addProjectButton = document.querySelector('#addProjectButton');
let viewAllToDosButton = document.querySelector('#viewAllToDosButton');

viewAllToDosButton.addEventListener('click', () => { // <=========== Under Construction
    for (let i = 0; i < projects.length; i++){
        createProjectPage(projects[i]);
    }
});

addProjectButton.addEventListener('click', () => {
    createNewProjectDialog();
});

function updateProjectSidebar(projects){
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
        updateProjectSidebar(projects);
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
        createToDoUI(todos[i], project);
    }
}

function createToDoUI(todo, project){
    let toDoContainer = document.createElement('div');
    mainContent.appendChild(toDoContainer);
    addID(toDoContainer, "toDoContainer");

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
    editToDoButton.addEventListener('click', () => {openEditToDoDialog(todo, project)});

    let deleteToDoButton = document.createElement('button');
    deleteToDoButton.textContent = "Delete";
    deleteToDoButton.addEventListener('click', () => {deleteToDo(todo, project)});

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

// <-------------------- To Do Buttons ----------------------->

function openEditToDoDialog(todo, project){
    let editToDoDialog = document.createElement('dialog');

    let closeButton = document.createElement('button');
    closeButton.textContent = "Close";

    let editTitleInputField = document.createElement('input');
    editTitleInputField.setAttribute('placeholder', 'title');
    editTitleInputField.value = todo.title;

    let editDescriptionInputField = document.createElement('input');
    editDescriptionInputField.setAttribute('placeholder', 'description');
    editDescriptionInputField.value = todo.description;

    let editDueDateInputField = document.createElement('input');
    editDueDateInputField.setAttribute('type', 'date');
    editDueDateInputField.value = todo.dueDate;

    let editPriorityInputField = document.createElement('input');
    editPriorityInputField.setAttribute('placeholder', 'priority (H/M/L)');
    editPriorityInputField.value = todo.priority;

    let editNotesInputField = document.createElement('input');
    editNotesInputField.setAttribute('placeholder', 'notes');
    editNotesInputField.value = todo.notes;

    let submitButton = document.createElement('button');
    submitButton.textContent = "Submit";

    closeButton.addEventListener('click', () => {
        editToDoDialog.innerHTML = '';
        editToDoDialog.close();
    });

    submitButton.addEventListener('click', () => {
        let title = editTitleInputField.value;
        let description = editDescriptionInputField.value;
        let dueDate = editDueDateInputField.value;
        let priority = editPriorityInputField.value;
        let notes = editNotesInputField.value;
        todo.updateToDo(title, description, dueDate, priority, notes);
        createProjectPage(project);
        editToDoDialog.innerHTML = '';
        editToDoDialog.close();
    });
    

    main.appendChild(editToDoDialog);
    editToDoDialog.appendChild(closeButton);
    editToDoDialog.appendChild(editTitleInputField);
    editToDoDialog.appendChild(editDescriptionInputField);
    editToDoDialog.appendChild(editDueDateInputField);
    editToDoDialog.appendChild(editPriorityInputField);
    editToDoDialog.appendChild(editNotesInputField);
    editToDoDialog.appendChild(submitButton);

    editToDoDialog.showModal();
}

function deleteToDo(todo, project){
    project.deleteToDo(todo.title);
    createProjectPage(project);
}

// <------------------- Tool Kit --------------------->

function addID(domElement, IDname){
    domElement.setAttribute("id", String(IDname));
}

function addClass(domElement, className){
    domElement.setAttribute("class", String(className));
}