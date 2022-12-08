"use strict";
if (currentUser) {
  const inputTask = document.querySelector("#input-task");
  const btnAdd = document.querySelector("#btn-add");
  const todoList = document.querySelector("#todo-list");

  displayTodoList();
  function displayTodoList() {
    // từ mảng todoArr lọc ra các task của curentUser
    let html = "";
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach((todo) => {
        html += `<li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>`;
      });
    todoList.innerHTML = html;
    // bắt các sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }
  // bắt sự kiện thêm vào nút Add task
  btnAdd.addEventListener("click", function () {
    // validate Data
    if (validate()) {
      const todo = new Task(inputTask.value, currentUser.username, false);
      // thêm task mới vào mảng todoArr
      todoArr.push(todo);
      // lưu dữ liệu xuống localstorage
      saveToStorage("todoArr", todoArr);
      // hiển thị các list nhiệm vụ
      displayTodoList();
      // reset các form nhập dữ liệu
      inputTask.value = "";
    }
  });

  // hàm bắt sự kiện hoàn thành nhiệm vụ
  function eventToggleTasks() {
    // lấy tất cả phần tử li chứa noioj dung của nhiệm vụ và bắt sự kiện click vào li này
    document.querySelectorAll("#todo-list li").forEach((liEl) => {
      liEl.addEventListener("click", function (e) {
        // tránh nút delete ra
        if (e.target !== liEl.children[0]) {
          liEl.classList.toggle("checked");
          // tìm task vừa click vào
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1)
          );
          // thay thuộc tính isDone của nó
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // lưu cập nhật xuống localStogare
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  ///////////////////
  // hàm xóa các sự kiện
  function eventDeleteTasks() {
    // bắt sự kiện ấn vào nút xóa
    document.querySelectorAll("#todo-list .close").forEach((closeEl) => {
      closeEl.addEventListener("click", function () {
        // kiểm tra task muốn xóa
        console.log(closeEl.parentElement.textContent.slice(0, -1));
        const isDelete = confirm("Bạn thục sự muốn xóa nhiệm vụ?");
        if (isDelete) {
          const deleteItem = todoArr.findIndex(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === closeEl.parentElement.textContent.slice(0, -1)
          );
          // xóa task đó ra khỏi mảng
          // console.log(deleteItem);
          todoArr.splice(deleteItem, 1);
          // lưu xống localStorage
          saveToStorage("todoArr", todoArr);
          // gọi lại hàm hiển thị
          displayTodoList();
        }
      });
    });
  }
  function validate() {
    let isValidate = true;
    if (inputTask.value.trim() === "") {
      alert("Vui lòng nhập Task!");
      isValidate = false;
    }
    document.querySelectorAll("#todo-list li").forEach((liEl) => {
      if (liEl.textContent.slice(0, -1) == inputTask.value.trim()) {
        alert("Task trùng lặp");
        isValidate = false;
      }
    });
    return isValidate;
  }
}
// nếu chưa đăng nhập thì yêu cầu người dùng đăng nhập
else {
  alert("Hãy đăng nhập để sử dụng ứng dụng");
  window.location.href = "../index.html";
}
