"use strict";
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const btnSubmit = document.querySelector("#btn-submit");

// bắt sự kiện nhấn vào nút submit
btnSubmit.addEventListener("click", function () {
  const isValidate = validate();
  if (isValidate) {
    // tìm trong Userarr xem thông tin người dùng nhập vào có đúng hay không
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );
    if (user) {
      alert("Đăng nhập thành công");
      // lưu thông tin người dùng hiện tại xuống localStorage
      saveToStorage("currentUser", user);
      // chuyển về trang chủ
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không đúng, vui lòng kiểm tra lại!");
    }
  }
});
// kiểm tra dữ liệu nhập vào đã đúng hay chưa
function validate() {
  let isValidate = true;
  if (inputUsername.value.trim().length === 0) {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }
  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password");
    isValidate = False;
  }
  return isValidate;
}
