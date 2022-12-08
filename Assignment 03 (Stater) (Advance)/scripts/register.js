"use strict";
const inputFistName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");
const btnSubmit = document.querySelector("#btn-submit");

// ===========================================
// bắt sự kiện ấn vào nút Register
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu nhập vào từ người dùng
  const user = new User(
    inputFistName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );
  // check dữ liệu nhập vào
  const isValidate = validate(user);
  if (isValidate) {
    userArr.push(user);
    // Update dữ liệu xuống localstorage
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công");
    // chuyển sang trang Login
    window.location.href = "../pages/login.html";
  }
});

function validate(user) {
  let isValidate = true;
  // 1.Không có trường nào bị bỏ trống.
  if (user.fistname.trim().length === 0) {
    alert("Vui lòng nhập fistname");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Vui lòng nhập Lastname");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }
  if (user.password.length === 0) {
    alert("Vui lòng nhập password");
    isValidate = false;
  }
  if (inputPasswordConfirm.value === "") {
    alert("Vui lòng confirm Password");
    isValidate = false;
  }
  // 2.Username không được trùng với Username của các người dùng trước đó.
  if (!userArr.every((item) => item.username !== user.username)) {
    alert("Username đã tồn tại");
    isValidate = false;
  }
  // 3.Password và Confirm Password phải giống nhau.
  if (inputPasswordConfirm.value !== user.password) {
    alert("Password và Password confirm phải giống nhau");
    isValidate = false;
  }
  // 4.Password phải có nhiều hơn 8 ký tự.
  if (user.password.length <= 8) {
    alert("Password phải nhiều hơn 8 ký tự");
    isValidate = false;
  }
  return isValidate;
}
