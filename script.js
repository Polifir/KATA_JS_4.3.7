let resSearch;

function debounce(f, ms) {
  let isCooldown = false;
  return function () {
    if (isCooldown) return;
    f.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
}

function deleteBtn(e) {
  if (e.target.tagName === "IMG") {
    e.target.closest("li").remove();
  }
}

ulRep.addEventListener("click", deleteBtn);

function addRep(e) {
  const elem = resSearch[e.target.id];
  search.value = "";
  ul.innerHTML = "";
  ulRep.insertAdjacentHTML(
    "afterbegin",
    `<li class="rep_lists__item">
    <div class="left">
      <ul class="left_lists">
        <li class="left_lists__name">Name: <span>${elem.name}</span></li>
        <li class="left_lists__owner">Owner: <span>${elem.owner.login}</span></li>
        <li class="left_lists__stars">Stars: <span>${elem.stargazers_count}</span></li>
      </ul>
    </div>
    <div class="right">
      <button class="delete"><img src="img/del.svg" alt="del"></button>
    </div>
  </li>`
  );
}

document.getElementById("search").onkeyup = debounce(function (e) {
  let searchValue = e.target.value;
  if (e.target.value === "") {
    ul.innerHTML = "";
  } else {
    fetch(
      `https://api.github.com/search/repositories?q=${searchValue}&per_page=5`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        resSearch = res.items;
        ul.innerHTML = "";
        res.items.map((e, i) => {
          const searchLi = document.createElement("li");
          const searchLiBtn = document.createElement("button");
          searchLi.classList.add("res_list");
          searchLiBtn.classList.add("res_list__btn");
          searchLiBtn.innerHTML = e.name;
          searchLiBtn.id = i;
          searchLiBtn.addEventListener("click", addRep);
          ul.append(searchLi);
          searchLi.append(searchLiBtn);
        });
      });
  }
}, 500);
