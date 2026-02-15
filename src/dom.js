import {projects, deleteProject} from "./logic.js"; // functions [import]
import {project, toDo} from "./logic.js"; // classes [import]
export {updateProjectSidebar} // functions [export]

let mainContent = document.querySelector('#main');
let sidebar = document.querySelector('#sidebar');
let addProjectButton = document.querySelector('#addProjectButton');


addProjectButton.addEventListener('click', () => {
    createNewProjectDialog();
});

function updateProjectSidebar(){
    sidebar.innerHTML = '';
    for (let i=0; i < projects.length; i++){
        let projectName = projects[i].name;
        let projectBTN = document.createElement('button');
        projectBTN.textContent = projectName;

        projectBTN.addEventListener('click', () =>{
            createProjectPage(projects[i]);
        })

        sidebar.appendChild(projectBTN);
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
        let todo = todos[i];
        let todoText = document.createElement('h1');
        todoText.textContent = todo;
        main.appendChild(todoText);
    }
}

function openCreateNewToDoDialog(project){
    let newToDoDialog = document.createElement('dialog');

    let closeButton = document.createElement('button');
    let titleInputField = document.createElement('input');
    let descriptionInputField = document.createElement('input');
    let dueDateInputField = document.createElement('input');
    let priorityInputField = document.createElement('input');
    let notesInputField = document.createElement('input');
    let submitButton = document.createElement('button');

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