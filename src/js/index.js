import renderMakeToDo from "./_render-card1.js";
import renderInProg from "./_render-card2.js";
import renderDone from "./_render-card3";
import { renderFromLocal } from "./_renderFromLocal.js";
import { renderFromLocalProg } from "./_renderFromLocal.js";

//created and outed new Date(object)//
const $HEADER = document.querySelector(".site_header");
let dateOut = $HEADER.querySelector(".date");
const $CURRENTDATE = new Date();
let dateDay = +$CURRENTDATE.getDate();
let dateMonth = +$CURRENTDATE.getMonth() + 1;
let dateYear = +$CURRENTDATE.getFullYear();
dateOut.textContent = dateDay + "." + dateMonth + "." + dateYear;
if (dateDay < 10) {
  dateOut.textContent = "0" + dateDay + "." + dateMonth + "." + dateYear;
}
//  -----------------------------------------------//

// creating pop up functional//
const $MAIN = document.querySelector(".main");
let btnAdd = $MAIN.querySelector(".list_item-btn-add");
const $TASKFORM = document.querySelector(".task-form");

//pops up//
btnAdd.addEventListener("click", () => {
  $TASKFORM.classList.add("active");
});

//close element + cancel btn//
let cancelBtn = $TASKFORM.querySelector(".cancel-task_btn");
let closeElem = $TASKFORM.querySelector(".close");
let formContent = $TASKFORM.querySelector(".form-content");
closeElem.addEventListener("click", () => {
  $TASKFORM.classList.remove("active");
});
cancelBtn.addEventListener("click", (e) => {
  $TASKFORM.classList.remove("active");
  e.preventDefault();
});

const $FOOTER = document.querySelector("site-footer");

//  -----------------------------------------------//

//small validation + creating task //
let createBtn = $TASKFORM.querySelector(".create-task_btn");
let userTitle = $TASKFORM.querySelector("#user_title");
let userDesc = $TASKFORM.querySelector("#user_description");
let userAuthor = $TASKFORM.querySelector("#user_author");

// creating task
let MakeToDo = [];
let InProgress = [];
let Done = [];
//подтягиваем верстку, если есть значение в Local Storage//
let MakeWrap = $MAIN.querySelector(".task-wrapper_Make");
let ProgWrap = $MAIN.querySelector(".task-wrapper_Prog");
let DoneWrap = $MAIN.querySelector(".task-wrapper_Done");
let TotalNumSecond = $MAIN.querySelector(".total-second");
let TotalNum = $MAIN.querySelector(".list_item-total-num");
let TotalNumThird = $MAIN.querySelector(".list_item-total-num.third");
if (
  localStorage.getItem("key") ||
  localStorage.getItem("keyProg") ||
  localStorage.getItem("keyDone")
) {
  let parsed = JSON.parse(localStorage.getItem("key"));
  let parsedProg = JSON.parse(localStorage.getItem("keyProg"));
  let parsedDone = JSON.parse(localStorage.getItem("keyDone"));
  MakeToDo = parsed;
  InProgress = parsedProg;
  Done = parsedDone;
  function displayMessages() {
    MakeToDo.forEach(function (item, idx) {
      MakeWrap.innerHTML += renderFromLocal(item, idx);
    });

    InProgress.forEach(function (item, idx) {
      ProgWrap.innerHTML += renderFromLocalProg(item, idx);
      TotalNumSecond.innerHTML = InProgress.length;
    });
    Done.forEach((item, idx) => {
      DoneWrap.innerHTML += renderDone(item, idx);
      TotalNumThird.innerHTML = Done.length;
    });
  }
  displayMessages();
}
//------------------------------------------------//
function CreateObject(title, description, author) {
  this.title = title;
  this.description = description;
  this.author = author;
}

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Validation
  if (!userDesc.value || !userTitle.value) {
    return;
  }
  //
  let task = new CreateObject(
    userTitle.value,
    userDesc.value,
    userAuthor.value
  );
  MakeToDo.push(task);
  MakeWrap.innerHTML = ""; //Эта строчка решила все мои проблемы)))
  MakeToDo.forEach(function (item, idx) {
    MakeWrap.innerHTML += renderMakeToDo(item, idx);
  });

  clearValue(userTitle, userDesc, userAuthor);
  $TASKFORM.classList.toggle("active");
  localUpdate();
});
function clearValue(title, desc, author) {
  title.value = "";
  desc.value = "";
  author.value = "";
}
function localUpdate() {
  let str = JSON.stringify(MakeToDo);
  localStorage.setItem("key", str);
}
function localUpdateProgress() {
  let str = JSON.stringify(InProgress);
  localStorage.setItem("keyProg", str);
}
function localUpdateDone() {
  let str = JSON.stringify(Done);
  localStorage.setItem("keyDone", str);
}
// Total number MakeToDo
createBtn.addEventListener("click", () => {
  TotalNum.innerHTML = MakeToDo.length;
});
TotalNum.innerHTML = MakeToDo.length;
//
// логика удаления ВСЕХ тасков из массива и из DOM
let btnRemoveAll = $MAIN.querySelector("#btn-removeAll");
btnRemoveAll.addEventListener("click", deleteAllTasks);
function deleteAllTasks() {
  DoneWrap.innerHTML = "";
  Done.splice(0, Done.length);
  TotalNumThird.innerHTML = Done.length;
  localUpdateDone();
}
// // логика удаления ОТДЕЛЬНОГО таска из массива и из DOM
let taskWrappers = $MAIN.querySelector(".task-wrappers");
taskWrappers.addEventListener("click", deleteTask);
function deleteTask(e) {
  if (e.target.dataset.action === "delete") {
    MakeWrap.innerHTML = "";
    MakeToDo.splice(0, 1);
    MakeToDo.forEach(function (item, idx) {
      MakeWrap.innerHTML += renderMakeToDo(item, idx);
      TotalNum.innerHTML = MakeToDo.length;
    });
    TotalNum.innerHTML = MakeToDo.length;
    localUpdate();
  }
}
DoneWrap.addEventListener("click", deleteTaskDone);
function deleteTaskDone(e) {
  if (e.target.dataset.action === "delete") {
    DoneWrap.innerHTML = "";
    Done.splice(e.target, 1);
    Done.forEach(function (item, idx) {
      DoneWrap.innerHTML += renderDone(item, idx);
      TotalNumThird.innerHTML = Done.length;
    });
    TotalNumThird.innerHTML = Done.length;
    localUpdateDone();
  }
}

// --------------------------------------------------------
// перeмещение из одной колонки в другую
let BtnInProg = $MAIN.querySelectorAll(".task-button.prog");
taskWrappers.addEventListener("click", MoveTask);
function MoveTask(e) {
  if (e.target.dataset.action === "progress") {
    const targetClosest = e.target.closest(".list_item-task");
    let TargetId = targetClosest.id;
    MakeWrap.innerHTML = "";
    ProgWrap.innerHTML = "";
    InProgress.push(MakeToDo[TargetId]); // элемент массива, который соответствует айдишнику event target
    MakeToDo.splice(TargetId, 1);
    MakeToDo.forEach(function (item, idx) {
      MakeWrap.innerHTML += renderMakeToDo(item, idx);
      TotalNum.innerHTML = MakeToDo.length;
    });
    if (MakeToDo.length == 0) {
      TotalNum.innerHTML = "0";
    }
    InProgress.forEach(function (item, idx) {
      ProgWrap.innerHTML += renderInProg(item, idx);
      TotalNumSecond.innerHTML = InProgress.length;
    });
    localUpdate();
    localUpdateProgress();
  }
}
ProgWrap.addEventListener("click", MoveTaskDone);
function MoveTaskDone(e) {
  if (e.target.dataset.action === "done") {
    let TargetClosest = e.target.closest(".list_item-task");
    let TargetId = TargetClosest.id;
    Done.push(InProgress[TargetId]);
    InProgress.splice(TargetId, 1);
    ProgWrap.innerHTML = "";
    DoneWrap.innerHTML = "";
    InProgress.forEach((el, idx) => {
      ProgWrap.innerHTML += renderInProg(el, idx);
      TotalNumSecond.innerHTML = InProgress.length;
    });
    if (InProgress.length == 0) {
      TotalNumSecond.innerHTML = "0";
    }
    Done.forEach((el, idx) => {
      DoneWrap.innerHTML += renderDone(el, idx);
      TotalNumThird.innerHTML = Done.length;
    });
  }
  localUpdateProgress();
  localUpdateDone();
}
