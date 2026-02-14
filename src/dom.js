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
    for (let i=0; i < projects.length; i++){
        let projectName = projects[i].name;
        let projectText = document.createElement('h1');
        projectText.textContent = projectName;
        sidebar.appendChild(projectText);
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