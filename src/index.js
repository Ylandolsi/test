import { greeting } from "./greeting.js";
import "./style.css";
console.log(greeting);

import js from "./js.png";
   
const image = document.createElement("img");
image.src = js;
   
document.body.appendChild(image);