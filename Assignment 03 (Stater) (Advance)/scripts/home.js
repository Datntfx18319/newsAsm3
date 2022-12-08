"use strict";
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");

displayHome();

function displayHome() {
  // hiển thị maincontent nếu có người dùng đăng nhập
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // thêm trường wellcomeMessage
    welcomeMessage.textContent = `Welcome ${currentUser.username}`;
  }
  // Nếu không có ai đăng nhập thì ẩn main content và hiển thị logout
  else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}
// bắt sự kiện nut logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn chắc chắn muốn logout chứ?");
  if (isLogout) {
    //gán giá trị curentUser về null
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    displayHome();
  }
});
