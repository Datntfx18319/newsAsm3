"use strict";
// kiểm tra người dùng đã đăng nhập
if (currentUser) {
  const newsContainer = document.querySelector("#news-container");
  const btnPrev = document.querySelector("#btn-prev");
  const pageNum = document.querySelector("#page-num");
  const btnNext = document.querySelector("#btn-next");
  // biến này dùng để tính số News tối đa trả về từ API
  let totalResults = 0;
  getDataNews("us", 1);
  /////////////////////////////////////////////////////////
  async function getDataNews(country, page) {
    try {
      // Kết nối với API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=e88a2a5ea3d64b49a988bbb074fc8894`
      );
      const data = await res.json();
      console.log(data);
      // check lỗi API
      if (data.status === "error") {
        throw new Error(data.message);
      }
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
      html += `
      <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								  <img src="${
                    element.urlToImage
                      ? element.urlToImage
                      : "../Image-Not-Available.png"
                  }" 
                  class="card-img"
									alt="img">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${element.title}</h5>
									<p class="card-text">${
                    element.description ? element.description : "No description"
                  }</p>
									<a href="${element.url}" target="_blank"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>`;
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
    getDataNews("us", --pageNum.textContent);
  });
  // bắt sự kiện bấm vào nút Next
  btnNext.addEventListener("click", function () {
    getDataNews("us", ++pageNum.textContent);
  });
} else {
  alert("Vui lòng đăng nhập/đăng kí để sử dụng ứng dụng");
  window.location.href = "../index.html";
  // window.location.assign("../index.html");
}
