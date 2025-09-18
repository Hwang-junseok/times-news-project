const apiKey = `d114bde3033b42e2b269078193ce6b0f`;
let newsList = [];
const getLatestNews = async () => {
    const url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&apiKey=${apiKey}`
    );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddd", newsList);
};


const openNav = () => {
    document.getElementById("mysidenav").style.width = "250px";
};
const closeNav =  () => {
    document.getElementById("mySidenav").style.width = "0";
}
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
                    ${news.source.name || "no source"} ${moment(news.publifshedAt).fromNow()}
                </div>
            </div>
        </div>`).join('');
    console.log("html", newsHTMl)
    document.getElementById("news-board").innerHTML=newsHTMl
};
getLatestNews();

 