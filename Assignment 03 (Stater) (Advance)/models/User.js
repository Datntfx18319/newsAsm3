"use strict";
// class user đại diện cho thông tin người dùng
class User {
  constructor(
    fistname,
    lastname,
    username,
    password,
    pageSize = 10,
    category = "business"
  ) {
    this.fistname = fistname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // thêm vào để thực hiện yêu cầu số 9
    this.pageSize = pageSize;
    this.category = category;
  }
}

//class task để chứa các thông tin về task trong todo list

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
