//api

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzhiM2ExMTc1ZjM4OGRjMzliNGZiM2IwMDllNGQ0NyIsIm5iZiI6MTcyOTEyNjQ3MC44NDUzNywic3ViIjoiNjcwZTc3ZGJiMTVkOTdiMWE5M2Q5NmNjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.24P05rOq9cV0tlJKBVcuCHg45f4_fEwhO4sMMjGqjT8'
    }
};

let movies = []; // ***********전역변수 - 모든 블록에서 사용가능

fetch(
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
    options
)
    .then((response) => response.json())
    .then((response) => {
        console.log(response.results);  //20개 배열
movies = response.results; // 전역변수에 저장
console.log(movies);  //확인용

        for (let i = 0; i < response.results.length; i++) {
            const tempHtml = `
        <div class="movie_card" id="${response.results[i].id}">
                <img src="https://image.tmdb.org/t/p/w500${response.results[i].poster_path}" alt="">
                <h3 id="title">${response.results[i].title}</h3>
                <p>평점: ${response.results[i].vote_average}</p>
            </div>
      `;

            document.querySelector(".movie-container").innerHTML =
                document.querySelector(".movie-container").innerHTML + tempHtml;
        }
    })
    .catch((err) => console.error(err));
//api



//모달
const modalOpenButton = document.querySelector('#modalOpenButton');
const modalCloseButton = document.querySelector('#modalCloseButton');
const modal = document.querySelector('#modalContainer');



// ********* 콘솔로그는 나중에 지워주기

modalOpenButton.addEventListener('click', (event) => {
    //console.log(event.target.closest(".movie_card").id); //확인용
    // closest : 선택한 것과 가장 가까운걸 가져오기
    // event.target : 클릭했을때 선택한거 콘솔찍기

    //숫자로 바꾸기
    //Number(event.target.closest(".movie_card").id);

    
    //아이디값을 뽑아오기 
    const selectedMovie = event.target.closest(".movie_card")
    const selectedId = Number(selectedMovie.id)

console.log(selectedId);
    //전역변수로 저장된 전체 영화목록에서 뽑아온 아이디 찾기
    // 배열 find
    const sameId = movies.find((movie) => { //순회함
        return  movie.id === selectedId;
    });
    console.log(sameId);
    //모달에 들어갈 내용 그리기
    
        const tempHtml = `
        <img id="modalImage" src="https://image.tmdb.org/t/p/w500${sameId.poster_path}" alt="">
            <h2 id="modalTitle">${sameId.title}</h2>
            <p id="modalOverview">${sameId.overview}</p>
            <p><strong>개봉일:</strong> <span id="modalReleaseDate">${sameId.release_date}</span></p>
            <p><strong>평점:</strong> <span id="modalRating">${sameId.vote_average}</span></p>
            <button id="bookmarkBtn" class="modalBookMark" style="display: block;">북마크 추가</button>
            <button id="removeBookmarkBtn" class="modalBookMark" style="display: none;">북마크 취소</button>`;

        document.querySelector(".modal").innerHTML = tempHtml;


        modal.classList.remove('hidden');  //숨기기 취소
});

modalCloseButton.addEventListener('click', () => { //숨기기
    modal.classList.add('hidden');
});

//모달



//북마크
function bookMark() {
    alert('북마크된 영화가 없습니다.');
}


//검색창  

 

search_input_id.addEventListener('click', () => {
    modal.classList.add('hidden');
});




// 이벤트리스너 붙이고 인풋값(검색) 가져오기
// 검색어 넣고 검색 api 호출
// 목록을 화면에 그리기

const searchBtn = document.querySelector("#search_button");
const searchInput = document.querySelector("#search_input_id");
const form = document.querySelector("#form");

form.addEventListener("submit", function (event) {
    event.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false&language=ko-kr&page=1`, options)
        .then(response => response.json())
        .then((response) => {
            movies = response.results; // ********** 전역변수에 저장
            console.log(response.results);

            document.querySelector(".movie-container").innerHTML = '';  // 기존을 초기화
            for (let i = 0; i < response.results.length; i++) {
                const tempHtml = `
            <div class="movie_card" id="${response.results[i].id}">
                    <img src="https://image.tmdb.org/t/p/w500${response.results[i].poster_path}
                    " alt="">
                    <h3 id="title">${response.results[i].title}</h3>
                    <p>평점: ${response.results[i].vote_average}</p>
                </div>`;

                document.querySelector(".movie-container").innerHTML += tempHtml; // + 누적
                
                //왼쪽을 오른쪽으로 바꾼다
            }
        })
        .catch(err => console.error(err));
})