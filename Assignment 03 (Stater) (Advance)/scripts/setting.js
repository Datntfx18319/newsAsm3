"use strict";
if (currentUser) {
  const inputPageSize = document.querySelector("#input-page-size");
  const inputCategory = document.querySelector("#input-category");
  const btnSubmit = document.querySelector("#btn-submit");

  // bắt sự kiện ấn vào nút btnSubmit
  inputPageSize.value = currentUser.pageSize;
  inputCategory.value = currentUser.category;
  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      // Luu xong localStorage
      saveToStorage("currentUser", currentUser);
      // thay đổi trong UserArr
      const changeIndex = userArr.findIndex(
        (item) => item.username === currentUser.username
      );
      console.log(changeIndex);
      userArr.splice(changeIndex, 1, currentUser);
      saveToStorage("userArr", userArr);

      // thông báo ra màn hình
      alert("Cài đặt thành công!");
      // inputPageSize.value = "";
      // inputCategory.value = "General";
    }
  });

  // Hàm valiate dữ liệu của người dùng
  function validate() {
    let isValidate = true;
    // kiểm tra inout oageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("News per page không hợp lệ!");
      isValidate = false;
    }
    // kiểm tra inputCategory
    if (inputCategory.value.trim() === "") {
      alert("Vui lòng nhập Category");
      isValidate = false;
    }
    return isValidate;
  }
}
// nếu chưa đăng nhập thì yêu cầu đăng nhậpa
else {
  alert("Hãy đăng kí/đăng nhập để sử dụng ứng dụng");
  window.location.href = "../index.html";
}
