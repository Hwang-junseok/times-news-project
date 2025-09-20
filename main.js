const apiKey = `d114bde3033b42e2b269078193ce6b0f`;
let newsList = [];
let totalPage = 1;
const menus = document.querySelectorAll(".menus button")
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category&apiKey=${apiKey}`)
        //`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${apiKey}`
        //`https://newsapi.org/v2/top-headlines?country=us&category&apiKey=${apiKey}`
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getNewsByKeyword();
      event.preventDefault(); 
    }
  });

document.getElementById("search-input").addEventListener("focus", function () {
  this.value = ""; 
});

const getNews = async () => {
    try {
        url.searchParams.set("page", page); // => &page = page
        url.searchParams.set("pageSize", pageSize);
        const response = await fetch(url);
        
        const data = await response.json(); 
        if(response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalPage = Math.ceil(data.totalResults / pageSize);
            totalResults = data.totalResults
            render();
            paginationRender();
        }else {
            throw new Error (data.message);
        }
    }catch(error) {
        errorRender(error.message);
    }
};
    
const getLatestNews = async () => {
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category&apiKey=${apiKey}`
    );
    await getNews()
};
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
    await getNews()
};
const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}&apiKey=${apiKey}`);
    await getNews()
};

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};
const closeNav =  () => {
    document.getElementById("mySidenav").style.width = "0";
};
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const render=()=>{
    const newsHTMl = newsList.map(news=>`<div class="row news">
            <div class="col-lg-4">
                <img class="news-img-size news-img" src="${news.urlToImage}" onerror="this.onerror=null; this.src= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"}/>
            </div>
            <div class="col-lg-8">
                <h2>${news.title}</h2>
                <p>
                    ${news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ?news.description.substring(0, 200) + "..."
                        :news.description
                    }
                </p>
                <div>
                    ${news.source.name || "no source"} ${moment(news.publishedAt).fromNow()}
                </div>
            </div>
        </div>`).join('');
    
    document.getElementById("news-board").innerHTML=newsHTMl
};

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
};
const paginationRender = () => {
    //totalResults
    //page
    //pageSize
    //groupSize
    //totalpages
    const totalPages = Math.ceil(totalResults / pageSize);
    //pageGroup
    let paginationHTML = ``;
    const pageGroup = Math.ceil(page / 5);
    //lastPage
    let lastPage = pageGroup * 5;
    //마지막 페이지그룹이 그룹사이즈보다 작다? lastPage = totalPage
    if(lastPage > totalPages) {
        lastPage = totalPages
    }

    //firstPage
    //const firstPage = lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize - 1);
    let firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;
    console.log("fff", firstPage);
    if (page > 1) {
     paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
                        <a class="page-link" href='#'>&lt;&lt;</a>
                      </li><li class="page-item" onclick="moveToPage(${page-1})">
                      <a class="page-link" href="#">&lt;</a>
                      </li>`;
    }
    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${
            i===page?'active':''
        }" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`;
    }
    if(page < totalPage) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})">
                        <a class="page-link" href="#">&gt;</a></li>
                         <li class="page-item" onclick="moveToPage(${totalPage})">
                        <a class="page-link" href='#'>&gt;&gt;</a>
                       </li>`;
    }                    
    document.querySelector(".pagination").innerHTML = paginationHTML

//     <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav>

    //totalPages
};

const moveToPage = (pageNum) => {
    console.log("moveToPage", pageNum);
    page = pageNum;
    getNews()
};
getLatestNews();

 //1. 버튼들에 클릭이벤트주기
 //2. 카테고리별 뉴스 가져고이
 //3. 그 뉴스를 보여주기