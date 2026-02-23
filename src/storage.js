export {storageAvailable, setUpLocalStorage, clearStorage, populateStorage}; // <============= functions
import {projects} from "./logic.js"; // Array
import {updateProjectSidebar} from "./dom.js";
import {project, toDo} from "./logic.js"; // Classes

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function clearStorage(){
    if (storageAvailable("localStorage")){
        localStorage.clear();
    } else {
        return 0;
    }
}
// <----------------------------------------------- Improved
function setUpLocalStorage(){
    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("projects")) {
            populateStorage();
            covertToProjectsAndToDosClass(projects);
        } else {
            setProjects();
            covertToProjectsAndToDosClass(projects);
        }
    } else {
        console.log('No Local Storage');
    }
}

function setProjects() {
    if (storageAvailable("localStorage")) {
        const projects = localStorage.getItem("projects");
        updateProjectSidebar(JSON.parse(localStorage.getItem("projects")));
    } else {
        return 0;
    }
}


function populateStorage(){
    if (storageAvailable("localStorage")) {
        localStorage.setItem("projects", JSON.stringify(projects));
    } else {
        return 0;
    }
}

function covertToProjectsAndToDosClass(projectsArray){
    let newProjectArray = [];
    projectsArray.forEach((element) => {
        let projectName = element.name;
        let projectToDos = element.todos;
        let newToDoArray = [];
        projectToDos.forEach((element) => {
            let title = element.title;
            let description = element.description;
            let dueDate = element.dueDate;
            let priority = element.priority;
            let notes = element.notes;
            let newTodo = new toDo(title, description, dueDate, priority, notes);
            newToDoArray.push(newTodo);
        });
        projectToDos = newToDoArray;
        let newProject = new project(projectName, projectToDos);
        newProjectArray.push(newProject);
    });
    projectsArray = newProjectArray;
    newProjectArray = [];

}





// function covertToProjectsAndToDosClass(projectsArray){
//     let newProjectArray = projectsArray.map((element) => {
//         let projectName = element.name;
//         let projectToDos = element.todos;
//         let newToDoArray = projectToDos.map((element) => {

//             let title = element.title;
//             let description = element.description;
//             let dueDate = element.dueDate;
//             let priority = element.priority;
//             let notes = element.notes;

//             let newTodo = new toDo(title, description, dueDate, priority, notes);

//             newToDoArray.push(newTodo);
//         });
//         projectToDos = newToDoArray;
//         let newProject = new project(projectName, projectToDos);
//         newProjectArray.push(newProject);
//     });
//     projectsArray = newProjectArray;

// }