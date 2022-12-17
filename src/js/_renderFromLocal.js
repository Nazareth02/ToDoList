// import {renderFromLocal} from "./_renderFromLocal.js";
// ------------------------------------------------------------
export function renderFromLocal(item, i) {
  return `<li class="list_item-task" id="${i}">
    <h3 class="task-title">${item.title}</h3>
    <p class="task-description">${item.description}</p>
    <p class="task-author">${item.author}</p>
    <div class="task_buttons">
    <button class="task-button-delete" data-action="delete">Delete</button>
    <button class="task-button prog" id="${i}" data-action="progress" >In progress</button>
   </div>
  `;
}
export function renderFromLocalProg(item, i) {
  return `<li class="list_item-task" id="${i}">
    <h3 class="task-title">${item.title}</h3>
    <p class="task-description">${item.description}</p>
    <p class="task-author">${item.author}</p>
    <div class="task_buttons">
  <button class="task-button done" id="${i}" data-action="done">Done</button>
  </div>
 </div>
  `;
}
