const apiKey = `d114bde3033b42e2b269078193ce6b0f`;
let newsList = [];
const menus = document.querySelectorAll(".menus button")
menus.forEach((menu) => menu.addEventListener("click", (event)=>getNewsByCategory(event)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category&apiKey=${apiKey}`)
        //`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${apiKey}`
        //`https://newsapi.org/v2/top-headlines?country=us&category&apiKey=${apiKey}`

const getNews = async () => {
    try {
        const response = await fetch(url);

        const data = await response.json();
        if(response.status === 200) {
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render();
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

getLatestNews();

 //1. 버튼들에 클릭이벤트주기
 //2. 카테고리별 뉴스 가져고이
 //3. 그 뉴스를 보여주기