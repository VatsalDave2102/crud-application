// variables
let table = document.querySelector(".tbody");
let th = document.querySelectorAll("th");
let allData = [];
allData = JSON.parse(localStorage.getItem("products"));
let editModal = document.querySelector("#editModal");

// truncate function for description
function truncate(str, maxlength) {
  return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
}

// displaying data on page
function getData() {
  allData.forEach((data, index) => {
    let truncatedDesc = truncate(data.description, 20);
    table.innerHTML += `
      <tr index="${index}" class="tr">
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td><img src ="${data.img}" style="width:40px; height:40px"></td>
            <td>${truncatedDesc}</td>
            <td>
              <button type="button" class="btn view-btn" data-bs-toggle="modal" data-bs-target="#viewModal">View</button>
              <button type="button" class="btn edit-btn m-2 " data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
              <button type="button" class="btn delete-btn">Delete</button>
            </td>
          </tr>
      `;
  });
}
getData();

// delete function
let allDeleteBtn = document.querySelectorAll(".delete-btn");
// looping through all delete buttons and getting their closest table row then deleteting them from localStorage and DOM
for (let i = 0; i < allDeleteBtn.length; i++) {
  allDeleteBtn[i].onclick = function () {
    let tr = this.closest("tr");
    let id = tr.getAttribute("index");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#655DBB",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        allData.splice(id, 1);
        localStorage.setItem("products", JSON.stringify(allData));
        tr.remove();
        updateIndex();
        noDataMsg();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Operation cancelled");
      }
    });
  };
}

// to update the index attribute in all table rows after any product gets deleted otherwise the index
// will remain same as before and user won't be albe to delete other products, calling this function after every deletion
function updateIndex() {
  let tr = document.querySelectorAll(".tr");
  for (let i = 0; i < tr.length; i++) {
    tr[i].setAttribute("index", i);
  }
  allDeleteBtn = document.querySelectorAll(".delete-btn");
  allEditBtn = document.querySelectorAll(".edit-btn");
  allViewBtn = document.querySelectorAll(".view-btn");
}

// edit function
let allEditBtn = document.querySelectorAll(".edit-btn");
for (let i = 0; i < allEditBtn.length; i++) {
  allEditBtn[i].onclick = function () {
    let tr = this.closest("tr");
    let td = tr.querySelectorAll("td");
    let index = tr.getAttribute("index");

    // getting values of selected product
    let currid = allData[index].id;
    let currname = allData[index].name;
    let currprice = allData[index].price;
    let currimg = allData[index].img;
    let currdescription = allData[index].description;

    // adding a modal to edit the product
    let editModal = document.querySelector(".edit-modal");
    editModal.innerHTML = `
    <div class="modal-body">
    <div class="container-md p-3 product-form">
    <form>
      <div class="row">
        <div class="mb-3 col-md-6 col-12">
          <label for="productId" class="form-label">Product Id:</label>
          <input 
            disabled
            type="text"
            class="form-control"
            id="productId"
            name="productId"
            readonly
          />
        </div>
        <div class="mb-3 col-md-6 col-12">
          <label for="productName" class="form-label">Product Name:</label>
          <input
            type="text"
            class="form-control"
            id="productName"
            name="productName"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="mb-3 col-md-6 col-12">
          <label for="productPrice" class="form-label">Product Price:</label>
          <input
            type="number"
            class="form-control"
            id="productPrice"
            name="productPrice"
            required
          />
        </div>
        <div class="mb-3 col-md-6 col-12">
          <label for="productImg" class="form-label"
            >Insert Product Image:</label
          >
          <input
            class="form-control"
            type="file"
            accept="image/*"
            id="productImg"
            name="productImg"
            onchange="imgPreviewFunc()"
            required
          />
        </div>
      </div>
      <div class="row d-flex flex-md-row flex-column-reverse">
        <div class="mb-3 col-md-6 col-12">
          <label for="productDesc" class="form-label"
            >Product description:</label
          >
          <textarea
            type="text"
            class="form-control"
            id="productDesc"
            name="productDesc"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="col-md-6 col-12 mb-3 d-flex justify-content-center preview-container" style="position:relative; left:5%">
          <img id="imgPreview" alt="Image Preview" class="img-preview img-thumbnail" style="width: 150px; height: 150px" />
          <span class="img-preview-text">Image preview</span>
        </div>
      </div>
    </form>
  </div>
    </div>
    <div class="modal-footer">
      <button
      type="button"
      class="btn"
      data-bs-dismiss="modal"
      >           
      Close
      </button>
      <button type="button" class="btn update">Save changes</button>
    </div>
        `;

    // getting edit form elements
    let id = document.querySelector("#productId");
    let pname = document.querySelector("#productName");
    let price = document.querySelector("#productPrice");
    let description = document.querySelector("#productDesc");
    let updateBtn = document.querySelector(".update");
    let imgPreview = document.querySelector(".img-preview");
    let previewText = document.querySelector(".img-preview-text");

    // assigning form elements the values of product that has been selected
    id.value = currid;
    pname.value = currname;
    price.value = currprice;
    description.value = currdescription;
    previewText.style.display = "none";
    imgPreview.style.display = "block";
    imgPreview.setAttribute("src", currimg);

    // updating product
    updateBtn.onclick = function () {
      // checking if any input field is empty
      if (
        id.value == "" ||
        pname.value == "" ||
        price.value == "" ||
        description.value == ""
      ) {
        Swal.fire("Fill the product details", "", "warning");
      } //checking if all the fields are same as before
      else if (    
        allData[index].id == id.value &&
        allData[index].name == pname.value &&
        allData[index].price == price.value &&
        allData[index].description == description.value &&
        allData[index].img == imgPreview.src
      ) {
        Swal.fire("You haven't made any changes", "", "warning");
      } //assigning new data and updating it in localStorage 
      else {
        allData[index] = {
          id: id.value,
          name: pname.value,
          price: price.value,
          img: imgPreview.src,
          description: description.value,
        };
        localStorage.setItem("products", JSON.stringify(allData));
        td[0].innerHTML = allData[index].id;
        td[1].innerHTML = allData[index].name;
        td[2].innerHTML = allData[index].price;
        td[3].getElementsByTagName("img")[0].src = allData[index].img;
        let truncatedDesc = truncate(allData[index].description, 20)
        td[4].innerHTML = truncatedDesc;
        Swal.fire("Successfully Changed", "", "success");
      }
    };
  };
}

// view function
let allViewBtn = document.querySelectorAll(".view-btn");
for (let i = 0; i < allViewBtn.length; i++) {
  allViewBtn[i].onclick = function () {
    let tr = this.closest("tr");
    let td = tr.querySelectorAll("td");
    let index = tr.getAttribute("index");
    let id = allData[index].id;
    let name = allData[index].name;
    let price = allData[index].price;
    let img = allData[index].img;
    let description = allData[index].description;
    let viewModal = document.querySelector(".view-modal");
    viewModal.innerHTML = `
    <div class="modal-body">
      <div class="card mb-3">
        <div class="row d-flex align-items-center">
          <div class = "col">
            <img src="${img}" class="card-img-top img-fluid" alt="...">
          </div>
          <div class = "col">
            <div class="card-body">
              <h3 class="card-title">${name}</h3>
              <p class="card-text"><strong>Id :</strong> ${id}</p>
              <p class="card-text"><strong>Price :</strong> ${price}</p>
              <p class="card-text"><strong>Description :</strong> ${description}</p>
            </div>
          </div>  
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn"
        data-bs-dismiss="modal"
      >             
      Close
      </button>
    </div>
        `;
  };
}

// image PreviewFunc()
function imgPreviewFunc() {
  let img = document.querySelector("#productImg");
  let previewContainer = document.querySelector(".preview-container");
  let imgPreview = document.querySelector(".img-preview");
  let previewText = document.querySelector(".img-preview-text");
  let file = img.files[0];
  let reader = new FileReader();
  if (file) {
    previewText.style.display = "none";
    imgPreview.style.display = "block";
    reader.addEventListener("load", function () {
      imgPreview.setAttribute("src", this.result);
    });
    reader.readAsDataURL(file);
  } else {
    previewText.style.display = null;
    imgPreview.style.display = null;
    imgPreview.setAttribute("src", "");
  }
}

// search function
let searchId = document.querySelector(".search-input");
searchId.oninput = function () {
  debounceSearch()
};

function searchFunction() {
  let tr = table.querySelectorAll("tr");

  let filter = searchId.value.toLowerCase();
  for (let i = 0; i < tr.length; i++) {
    let tdId = tr[i].getElementsByTagName("td")[0];
    let tdName = tr[i].getElementsByTagName("td")[1];
    let id = tdId.innerHTML;
    let name = tdName.innerHTML;
    if (
      id.toLowerCase().indexOf(filter) > -1 ||
      name.toLowerCase().indexOf(filter) > -1
    ) {
      tr[i].style.display = "";
      noData.style.display = 'none'
    } else {
      tr[i].style.display = "none";
      noData.style.display = 'block'
    }
  }
}

function debounce(fn, delay){
  let timer;
  return function(){
    let context = this, args = arguments
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context,args)
    }, delay);
  }
}

let debounceSearch = debounce(searchFunction, 500)

// sorting function
function sortTable(column, asc = true) {
  // getting rows as array instead of nodelist for sort purpose
  let direction = asc ? 1 : -1;
  let rows = Array.from(table.querySelectorAll("tr"));

  // sort each row
  let sortedRow = rows.sort((a, b) => {
    let acol = a.querySelector(`td:nth-child(${column + 1})`).innerHTML.trim();
    let bcol = b.querySelector(`td:nth-child(${column + 1})`).innerHTML.trim();

    return acol > bcol ? 1 * direction : -1 * direction;
  });

  // remove all existing TR from the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // re-adding the childs
  table.append(...sortedRow);

  // remember how column is sorted
  th.forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  th[column].classList.toggle("th-sort-asc", asc);
  th[column].classList.toggle("th-sort-desc", !asc);
}

let idAsc = document.querySelector(".id-asc");
let idDesc = document.querySelector(".id-desc");
let nameAsc = document.querySelector(".name-asc");
let nameDesc = document.querySelector(".name-desc");
let priceAsc = document.querySelector(".price-asc");
let priceDesc = document.querySelector(".price-desc");

let sortBtns = document.querySelectorAll(".sorter");
for (let i = 0; i < sortBtns.length; i++) {
  if (i == 0) {
    sortBtns[0].onclick = function () {
      sortTable(0, true);
      idAsc.style.color = "rgba(0,0,0,1)";
      idDesc.style.color = "rgba(0,0,0,0.5)";
      nameDesc.style.color = "rgba(0,0,0,0.5)";
      nameAsc.style.color = "rgba(0,0,0,0.5)";
      priceAsc.style.color = "rgba(0,0,0,0.5)";
      priceDesc.style.color = "rgba(0,0,0,0.5)";
    };
  }
  if (i == 1) {
    sortBtns[1].onclick = function () {
      sortTable(0, false);
      idAsc.style.color = "rgba(0,0,0,0.5)";
      idDesc.style.color = "rgba(0,0,0,1)";
      nameDesc.style.color = "rgba(0,0,0,0.5)";
      nameAsc.style.color = "rgba(0,0,0,0.5)";
      priceAsc.style.color = "rgba(0,0,0,0.5)";
      priceDesc.style.color = "rgba(0,0,0,0.5)";
    };
  }
  if (i == 2) {
    sortBtns[2].onclick = function () {
      sortTable(1, true);
      idAsc.style.color = "rgba(0,0,0,0.5)";
      idDesc.style.color = "rgba(0,0,0,0.5)";
      nameDesc.style.color = "rgba(0,0,0,0.5)";
      nameAsc.style.color = "rgba(0,0,0,1)";
      priceAsc.style.color = "rgba(0,0,0,0.5)";
      priceDesc.style.color = "rgba(0,0,0,0.5)";
    };
  }
  if (i == 3) {
    sortBtns[3].onclick = function () {
      sortTable(1, false);
      idAsc.style.color = "rgba(0,0,0,0.5)";
      idDesc.style.color = "rgba(0,0,0,0.5)";
      nameDesc.style.color = "rgba(0,0,0,1)";
      nameAsc.style.color = "rgba(0,0,0,0.5)";
      priceAsc.style.color = "rgba(0,0,0,0.5)";
      priceDesc.style.color = "rgba(0,0,0,0.5)";
    };
  }
  if (i == 4) {
    sortBtns[4].onclick = function () {
      sortTable(2, true);
      idAsc.style.color = "rgba(0,0,0,0.5)";
      idDesc.style.color = "rgba(0,0,0,0.5)";
      nameDesc.style.color = "rgba(0,0,0,0.5)";
      nameAsc.style.color = "rgba(0,0,0,0.5)";
      priceAsc.style.color = "rgba(0,0,0,1)";
      priceDesc.style.color = "rgba(0,0,0,0.5)";
    };
  }
  if (i == 5) {
    sortBtns[5].onclick = function () {
      sortTable(2, false);
      idAsc.style.color = "rgba(0,0,0,0,5)";
      idDesc.style.color = "rgba(0,0,0,0.5)";
      nameDesc.style.color = "rgba(0,0,0,0.5)";
      nameAsc.style.color = "rgba(0,0,0,0.5)";
      priceAsc.style.color = "rgba(0,0,0,0.5)";
      priceDesc.style.color = "rgba(0,0,0,1)";
    };
  }
}

//  adding no data message
let noData = document.querySelector(".no-data");

function noDataMsg() {
  console.log(table);
  let tr = table.querySelectorAll("tr");
  console.log(tr);
  if (tr.length == 0) {
    noData.style.display = "block";
  } else {
    noData.style.display = "none";
  }
}
noDataMsg();

// clear filter function
let clearFilterBtn = document.querySelector(".clear-filter");
clearFilterBtn.onclick = function () {
  table.innerHTML = "";
  getData();
};
