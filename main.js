let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let inputs = document.querySelectorAll(".price input");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let create = document.querySelector("#create");
// deleteAll button
let deleteAll = document.createElement("button");
deleteAll.innerHTML = "delete all";
let tab = document.querySelector("table");
tab.before(deleteAll);
// deleteAll button

let mood = "create";
let tmp;
// localStorage.clear()
//Start Total
let result = 0;
inputs.forEach(function (ele) {
  ele.onkeyup = function () {
    if (price.value !== "") {
      result = +price.value + +ads.value + +taxes.value - discount.value;
      total.innerHTML = result;
      total.classList.add("done");
    } else {
      total.innerHTML = "";
      total.classList.remove("done");
    }
  };
});
//End Total
// start localstorage
let dataProduct;
if (localStorage.getItem("product") !== null) {
  dataProduct = JSON.parse(localStorage.getItem("product"));
} else {
  dataProduct = [];
}
create.onclick = function () {
  let productObj = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // start clean
  if (price.value !== "" && title.value !== "" && category.value !=="" && count.value < 100) {
    // start update product
    if (mood === "create") {
      //count
      if (productObj.count > 1) {
        for (let i = 0; i < productObj.count; i++) {
          dataProduct.push(productObj);
        }
      } else {
        dataProduct.push(productObj);
      }
      //count
    } else {
      dataProduct[tmp] = productObj;
      mood = "create";
      count.style.display = "block";
      create.innerHTML = "create";
    }
    // end update product
    clearData();
    total.classList.remove("done");
  } 
  // end clean
  localStorage.setItem("product", JSON.stringify(dataProduct));
  table = "";
  readData();
  deleteAll.style.display = "block";
};
// end localstorage
// start clearData
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}
// End clearData
//start read data
let tBody = document.querySelector("#bodyTable");
let table = "";
function readData() {
  for (let i = 0; i < dataProduct.length; i++) {
    table += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateProduct(${i})">update</button></td>
    <td><button onclick="deleteButton(${i})">delete</button></td>
  </tr>`;
  }
  tBody.innerHTML = table;
}
readData();
//end read data
//start delete button
function deleteButton(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  table = "";
  readData();
}
//end delete button
// start clear All Data by deleteall button
if (dataProduct.length > 0) {
  deleteAll.style.display = "block";
  deleteAll.onclick = function () {
    dataProduct.splice(0);
    localStorage.product = JSON.stringify(dataProduct);
    table = "";
    deleteAll.style.display = "none";
    readData();
  };
} else {
  deleteAll.style.display = "none";
}
// end clear All Data by deleteall button
// start update data
function updateProduct(i) {
  count.style.display = "none";
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  total.innerHTML = dataProduct[i].total;
  total.classList.add("done");
  create.innerHTML = "update";
  mood = "update";
  tmp = i;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// end update data
// start search data
let searchTitle = document.querySelector("#searchTilte");
let searchCategory = document.querySelector("#searchCategory");
let search = document.querySelector("#search");

function clickSearch() {
  search.value = ""
  readData();
  search.focus();
  search.placeholder = "search by " + searchMood;
}

searchTitle.onclick = function () {
  searchMood = "title";
  clickSearch()
};
searchCategory.onclick = function () {
  searchMood = "category";
  clickSearch()
};

function dataLoop(i) {
  table += `<tr>
    <td>${i + 1}</td>
    <td>${dataProduct[i].title}</td>
    <td>${dataProduct[i].price}</td>
    <td>${dataProduct[i].taxes}</td>
    <td>${dataProduct[i].ads}</td>
    <td>${dataProduct[i].discount}</td>
    <td>${dataProduct[i].total}</td>
    <td>${dataProduct[i].category}</td>
    <td><button onclick="updateProduct(${i})">update</button></td>
    <td><button onclick="deleteButton(${i})">delete</button></td>
  </tr>`;
}

let searchMood = "title";
search.onkeyup = function () {
  if (searchMood === "title") {
    table=""
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(search.value.toLowerCase())) {
        dataLoop(i)
      }
    }
  } else {
    table=""
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(search.value.toLowerCase())) {
        dataLoop(i)
      }
    }
  }
  tBody.innerHTML=table
};
// end search data
