const apiKey = `d114bde3033b42e2b269078193ce6b0f`;
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${apiKey}`)
        //`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${apiKey}`
        //`https://newsapi.org/v2/top-headlines?country=us&category&apiKey=${apiKey}`
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

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
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category&apiKey=${apiKey}`
    );
    getNews()
};
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
    getNews()
};
const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${apiKey}`);
    getNews()
};

const openNav = () => {
    document.getElementById("mysidenav").style.width = "250px";
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
    const pageGroup = Math.ceil(page / groupSize);
    //lastPage
    let lastPage = pageGroup * groupSize;
    //마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
    if(lastPage > totalPages) {
        lastPage = totalPages
    }

    //firstPage
    const firstPage = lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize - 1);

    let paginationHTML = ``;
    
    for(let i = firstPage; i <= lastPage; i++){
        paginationHTML += `<li class="page-item ${
            i===page?'active':''
        }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
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
    console.log("movetopage", pageNum);
    page = pageNum;
    getNews()
};
getLatestNews();

 //1. 버튼들에 클릭이벤트주기
 //2. 카테고리별 뉴스 가져고이
 //3. 그 뉴스를 보여주기