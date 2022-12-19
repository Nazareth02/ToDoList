// export default function renderDone(title, desc, author) {
//   return `<li class="list_item-task">
//               <h3 class="task-title">${title.value}</h3>
//               <p class="task-description">${desc.value}</p>
//               <p class="task-author">${author.value}</p>
//               <button class="task-button-delete" data-action="delete">Delete</button>
//            `;
// }
export default function renderDone(item, i) {
  return `<li class="list_item-task" id="${i}">
  <h3 class="task-title">${item.title}</h3>
  <p class="task-description">${item.description}</p>
  <p class="task-author">${item.author}</p>
  <button class="task-button-delete" data-action="delete">Delete</button>
 </div>
`;
}
// import { renderDone } from "./_render-card3.js";
