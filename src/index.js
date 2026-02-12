import "./styles.css";
import {projects} from "./logic.js";
import { add } from "lodash";

console.log("Project running");
console.log(projects[0].todos);


projects[0].addToDo("HEY!");
console.log(projects[0].todos);