// import { format, compareAsc } from "date-fns";
export {projects, deleteProject, project, toDo};
/*
title, description, dueDate and priority
*/
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
    }
    addToDo(todoName){
        this.todos.push(todoName);
    }
    clearToDos(){
        this.todos = [];
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
}

let exampleToDo1 = new toDo("Walk the dog", "I will walk the dog", new Date(1995, 11, 25, 3, 24, 0, 0), "HIGH!", "DoDoDoDo");
let newProject = new project("projectname", [exampleToDo1]);

let projects = [newProject];

function deleteProject(projectName){
    const index = projects.indexOf(projectName);
        if (index > -1){
            projects.splice(index, 1);
        }
}