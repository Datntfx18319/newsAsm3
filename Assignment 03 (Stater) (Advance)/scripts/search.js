"use strict";
// kiểm tra người dùng đã đăng nhập
if (currentUser) {
  const navPageNum = document.querySelector("#nav-page-num");
  const btnSubmit = document.querySelector("#btn-submit");
  const formSearch = document.querySelector("#search-form");
  const inputQuery = document.querySelector("#input-query");
  const newsContainer = document.querySelector("#news-container");
  const btnPrev = document.querySelector("#btn-prev");
  const pageNum = document.querySelector("#page-num");
  const btnNext = document.querySelector("#btn-next");

  // biến này dùng để tính số News tối đa trả về từ API
  let totalResults = 0;
  let keywords = "";
  navPageNum.style.display = "none";
  // bắt sự kiện ấn vào nút submit
  formSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    btnSubmit.click();
  });

  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = 1;
    newsContainer.innerHTML = "";
    if (inputQuery.value.trim() === "") {
      // ấn các nút chuyển trang khi chưa nhập keywords
      navPageNum.style.display = "none";
      alert("Vui lòng nhập keywords để tìm kiếm!");
    } else {
      keywords = inputQuery.value;
      getDataNewsByKeywords(keywords, 1);
    }
  });
  /////////////////////////////////////////////////////////
  async function getDataNewsByKeywords(keywords, page) {
    try {
      // Kết nối với API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=e88a2a5ea3d64b49a988bbb074fc8894`
      );
      const data = await res.json();
      console.log(data);
      // check lỗi API
      if (data.status === "error") {
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }
      if (data.totalResults == 0) {
        navPageNum.style.display = "none";
        throw new Error(
          "Không có bài viết nào liên quan đến từ khóa bạn tìm kiếm, vui lòng thử lại bằng từ khóa khác"
        );
      }
      navPageNum.style.display = "block";
      // gọi hàm hiển thị list News
      displayNewsList(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  // Hàm hiênr thị ListNews lên trang
  function displayNewsList(data) {
    // lấy giá trị cho biến totalResults
    totalResults = data.totalResults;
    // kiểm tra có ẩn các nút Next, pre hay chưa và ẩn đi
    checkBntPrev();
    checkBntNext();

    let html = "";
    // tạo các HTMl các News để hiển thị
    // thay thế các ảnh null bằng hình ảnh no-img....
    data.articles.forEach((element) => {
      return (html += `
      <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4 col-lg-4">
								  <img src=${
                    element.urlToImage
                      ? element.urlToImage
                      : "../Image-Not-Available.png"
                  }
                  class="card-img"
									alt="img">
							</div>
							<div class="col-md-8 col-lg-8">
								<div class="card-body">
									<h5 class="card-title">${element.title}</h5>
									<p class="card-text">${
                    element.description ? element.description : "No description"
                  }</p>
									<a href=${element.url} target="_blank"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`);
    });
    newsContainer.innerHTML = html;
  }

  // hàm kiểm tra và ẩn nút prev
  function checkBntPrev() {
    // nếu pageNumber là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }
  // hàm kiểm tra và ẩn nút Next
  function checkBntNext() {
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }
  // Bắt sự kiện bấm vào nút prev
  btnPrev.addEventListener("click", function () {
    getDataNewsByKeywords(keywords, --pageNum.textContent);
  });
  // bắt sự kiện bấm vào nút Next
  btnNext.addEventListener("click", function () {
    getDataNewsByKeywords(keywords, ++pageNum.textContent);
  });
} else {
  alert("Vui lòng đăng nhập/đăng kí để sử dụng ứng dụng");
  window.location.href = "../index.html";
  // window.location.assign("../index.html");
}
