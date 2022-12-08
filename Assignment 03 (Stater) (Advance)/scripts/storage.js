"use strict";

// Lưu dữ liệu xuống dưới LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Lấy dữ liệu dưới LocalStorage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//  lấy dữ liệu từ User localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// console.log(users);

// chuyển đổi về dạng class Intance
const userArr = users.map((user) => parseUser(user));
// console.log(userArr);

let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;
console.log(currentUser);
// lấy dữ liệu từ todoArr từ Local storage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// chuyển đổi về dạng class Intance
const todoArr = todos.map((todo) => parseTask(todo));

function parseUser(userData) {
  const user = new User(
    userData.fistame,
    userData.lastname,
    userData.username,
    userData.password,
    // ///
    userData.pageSize,
    userData.category
  );
  return user;
}

function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
