// export default function renderInProg(title, desc, author) {
//   return `<li class="list_item-task">
//   <h3 class="task-title">${title}</h3>
//   <p class="task-description">${desc}</p>
//   <p class="task-author">${author}</p>
//   <div class="task_buttons">
//   <button class="task-button done" data-action="done">Done</button>
//  </div>
// `;
// }
export default function renderInProg(item, i) {
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
import { renderMakeToDo } from "./_render-card2.js";
