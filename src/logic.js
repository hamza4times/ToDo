export {projects, deleteProject, project, toDo}; // functions
import {populateStorage, setProjects} from "./storage.js"; // storage
// ------------------------ Classes -------------------
class project{
    constructor(name, todos){
        this.name = name;
        this.todos = todos;
    }
    deleteToDo(todoName){
        const index = this.todos.indexOf(todoName);
        if (index > -1){
            this.todos.splice(index, 1);
        }
        populateStorage();
    }
    addToDo(todoName){
        this.todos.push(todoName);
        populateStorage();
    }
    clearToDos(){
        this.todos = [];
        populateStorage();
    }
}
class toDo{
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }
    updateToDo(newTitle, newDescription, newDueDate, newPriority, newNotes){
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
        this.notes = newNotes;
        populateStorage();
    }
}

let projects = [];

function deleteProject(projectName){
    const index = projects.indexOf(projectName);
        if (index > -1){
            projects.splice(index, 1);
        }
    populateStorage();
}

function addDefualtProject(){ // <==== ToDo
    //To-Do
    // let exampleToDo1 = new toDo("Walk the dog", "I will walk the dog", new Date(1995, 11, 25, 3, 24, 0, 0), "HIGH!", "DoDoDoDo");
    // let newProject = new project("projectname", [exampleToDo1]);
}