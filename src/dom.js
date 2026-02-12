import {projects, deleteProject, project} from "./logic.js"; // functions
import {project, toDo} from "./logic.js"; // classes

let mainContent = document.querySelector('#main');
let sidebar = document.querySelector('#sidebar');
let addProjectButton = document.querySelector('#addProjectButton');

addProjectButton.addEventListener('click', () => {
    createNewProjectDialog();
});

function updateProjectSidebar(){
    for (let i=0; i < projects.length; i++){
        console.log(projects[i].title);
    }
}

function createNewProjectDialog(){
    let addProjectDialog = document.querySelector('#addProjectDialog');
    addProjectDialog.innerHTML = "";

    let closeButton = document.createElement('button');
    closeButton.textContent = "close";
    closeButton.addEventListener('click', () => addProjectDialog.close());

    let projectNameInputField = document.createElement('input');

    addProjectDialog.appendChild(closeButton);
    addProjectDialog.appendChild(projectNameInputField);

    let submitNewProjectButton = document.createElement('button');

    submitNewProjectButton.addEventListener('click', () => {
        let newProject = new project (projectNameInputField.value, []);
        projects.push(newProject);
        updateProjectSidebar();
    });

    addProjectDialog.appendChild(submitNewProjectButton);
    addProjectDialog.showModal();
}