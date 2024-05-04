var myElement = document.getElementById("movieName");
var body = document.getElementsByTagName("body")[0];
var div = document.getElementById("row");
body.className = "container-fluid mt-2";

function apiCall() {
  let span = document.createElement("span");
  span.id = myElement.value;
  span.className = "col";
  let img = document.createElement("img");
  let p = document.createElement("p");
  let h1 = document.createElement("h1");
  let rm = document.createElement("input");
  rm.setAttribute("type", "button");
  rm.setAttribute("value", "Remove");
  rm.setAttribute("class", "btn btn-danger");
  rm.setAttribute("onClick", "return removeElement('" + span.id + "')");
  img.className = "poster rounded img-responsive";
  let check = document.createElement("input");
  check.setAttribute("type", "button");
  check.setAttribute("value", "More");
  check.setAttribute("class", "btn btn-success");
  check.setAttribute("onClick", "return moreInfo('" + span.id + "')");
  $.getJSON(
    "http://www.omdbapi.com/?i=tt3896198&apikey=aa00ff9e&t=" +
      encodeURI(myElement.value)
  ).then(function (res) {
    if (res.Error == "Movie not found!" || res.Error == "Movie not found!") {
      return false;
    }
    h1.innerHTML = res.Title + " (" + res.Released.slice(-4) + ")";
    p.textContent = res.Plot;
    img.setAttribute("src", res.Poster);
    span.appendChild(img);
    span.appendChild(h1);
    span.appendChild(p);
    span.appendChild(check);
    span.appendChild(rm);
    div.appendChild(span);
  });
  return false;
}

function sample() {
  let name = "Ip Man";
  myElement.value = name;
  apiCall();

  name = "Kung Fu Panda";
  myElement.value = name;
  apiCall();

  name = "Don";
  myElement.value = name;
  apiCall();

  name = "Boss";
  myElement.value = name;
  apiCall();

  name = "Ip Man 2";
  myElement.value = name;
  apiCall();

  name = "Ip Man 3";
  myElement.value = name;
  apiCall();
  return false;
}

function removeElement(txt) {
  let id = document.getElementById(txt);
  id.remove();

  return false;
}

function moreInfo(txt) {
  clearAll();
  let span = document.createElement("span");
  span.id = txt;

  $.getJSON(
    "http://www.omdbapi.com/?i=tt3896198&apikey=aa00ff9e&t=" + encodeURI(txt)
  ).then(function (res) {
    if (res.Error == "Movie not found!" || res.Error == "Movie not found!") {
      return false;
    }
    let table = document.createElement("table");
    table.className = "table table-primary";
    Object.keys(res).forEach((key, element) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      tr.className = "row";
      td1.className = "col col-2";
      td2.className = "col col-10";
      td1.innerHTML = key;
      td2.innerHTML = res[key];
      if (key == "Ratings") {
        td2.innerHTML = "";
        res[key].forEach(function (e) {
          td2.innerHTML = e;

          let ratingTable = document.createElement("table");
          Object.keys(e).forEach((key) => {
            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            td1.innerHTML = key;
            td2.innerHTML = e[key];
            tr.appendChild(td1);
            tr.appendChild(td2);
            ratingTable.appendChild(tr);
          });
          td2.appendChild(ratingTable);
        });
      }
      if (key == "Poster") {
        let img = document.createElement("img");
        img.src = td2.innerHTML;
        img.className = "img-fluid";
        td2.innerHTML = "";
        td2.appendChild(img);
      }
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    });
    span.className = "container";
    span.appendChild(table);
    div.appendChild(span);
  });
}

function clearAll() {
  let root = document.getElementById("row").getElementsByTagName("span");

  for (let i = root.length - 1; i >= 0; i--) {
    root[i].remove();
  }

  return false;
}
