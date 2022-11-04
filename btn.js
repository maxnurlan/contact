let API = "http://localhost:8000/info";

let named = document.querySelector("#name");
let surname = document.querySelector("#surname");
let phone = document.querySelector("#number");
let image = document.querySelector("#image");
let btnAdd = document.querySelector("#btn");

let list = document.querySelector(".list-item");

let Search = document.querySelector(".inp");
let searchVal = "";

let editName = document.querySelector(".name");
let editSurname = document.querySelector(".surname");
let phoneEdit = document.querySelector(".phone");
let imgEdit = document.querySelector(".image");

let editBtn = document.querySelector(".btn-edit");
let btnSave = document.querySelector(".btn-save");

btnAdd.addEventListener("click", function () {
  let obj = {
    named: named.value,
    surname: surname.value,
    phone: phone.value,
    image: image.value,
  };
  if (
    !obj.named.trim() ||
    !obj.surname.trim() ||
    !obj.phone.trim() ||
    !obj.image.trim()
  ) {
    alert("Заполните поля");
    return;
  }

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => {
    contacts();
  })
  named.value = "";
  surname.value = "";
  phone.value = "";
  image.value = "";

 
});
contacts()

function contacts() {
  fetch(`${API}?q=${searchVal}`)
    .then((firstInfo) => {
      return firstInfo.json();
    })
    .then((secondInfo) => {
      list.innerHTML = "";
      secondInfo.forEach((items) => {
        list.innerHTML += `<div class="card m-5" style="width:18rem"><p class="card-text">${items.named}</p>
    <p class="card-text">${items.surname}</p>
    <p class= "card-text">${items.phone}</p>
    <img  src='${items.image}'  class="card-img-top" width = 150 height = 150 alt="...">
    <a href="#" id=${items.id} data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-dark btn-edit">Edit</a> 
    <a href="#" id=${items.id} onclick='deleteProduct(${items.id})' class="btn btn-dark btn-delete">Delete</a> </div>
    `;
      });
    });
}



document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editName.value = data.named;
        editSurname.value = data.surname;
        phoneEdit.value = data.phone;
        imgEdit.value = data.image;
        btnSave.setAttribute("id", data.id);
      });
  }
});

btnSave.addEventListener("click", function (e) {
  if (!named || !surname || !phone || !image) return;
  console.log(this.id);
  let newEdit = {
    named: editName.value,
    surname: editSurname.value,
    phone: phoneEdit.value,
    image: imgEdit.value,
  };
  saveEdit(newEdit, this.id);
});

function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json; charse=utf-8",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => {
    contacts();
    console.log(id);
  });
}


function deleteProduct(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => contacts());
}

Search.addEventListener("input", () => {
  searchVal = Search.value;
  contacts();
});
