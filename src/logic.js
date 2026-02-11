// import { format, compareAsc } from "date-fns";
export {projects};
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


const defualt = new project("defualt", ["example 1", "example 2", "ex3"]);
let projects = [defualt];
