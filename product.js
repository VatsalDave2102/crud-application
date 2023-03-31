// variables
let table = document.querySelector(".tbody");
let allData = [];
allData = JSON.parse(localStorage.getItem("products"));

// displaying data on page
function getData() {
  console.log(allData);
  allData.forEach((data, index) => {
    table.innerHTML += `
      <tr index="${index}" class="tr">
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td><img src ="${data.img}" style="width:40px; height:40px"></td>
            <td>${data.description}</td>
            <td>
              <button
                type="button"
                class="btn view-btn"
                data-bs-toggle="modal" 
                data-bs-target="#viewModal" 
              >
                View
              </button>
              <button type="button" class="btn edit-btn" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
              <button type="button" class="btn delete-btn">Delete</button>
            </td>
          </tr>
      `;
  });
}
getData();

// delete function
let allDeleteBtn = document.querySelectorAll(".delete-btn");
for (let i = 0; i < allDeleteBtn.length; i++) {
  allDeleteBtn[i].onclick = function () {
    let tr = this.closest("tr");
    console.log(tr);
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
        console.log(allData);
        localStorage.setItem("products", JSON.stringify(allData));
        tr.remove();
        updateIndex();

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
    console.log(tr[i].getAttribute("index"));
  }
  allDeleteBtn = document.querySelectorAll(".delete-btn");
  allEditBtn = document.querySelectorAll(".edit-btn");
  allViewBtn = document.querySelectorAll(".view-btn");
}

// edit function
let allEditBtn = document.querySelectorAll(".edit-btn");
console.log(allEditBtn);
for (let i = 0; i < allEditBtn.length; i++) {
  allEditBtn[i].onclick = function () {
    let tr = this.closest("tr");
    let td = tr.querySelectorAll("td");
    let index = tr.getAttribute("index");
    console.log(td);

    // getting values of selected product
    let currid = td[0].innerHTML;
    let currname = td[1].innerHTML;
    let currprice = td[2].innerHTML;
    let imgTag = td[3].getElementsByTagName("img");
    let currimg = imgTag[0].src;
    let currdescription = td[4].innerHTML;

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
      <button type="button" class="btn update" data-bs-dismiss="modal">Save changes</button>
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
      console.log(allData[index]);
      allData[index] = {
        id: id.value,
        name: pname.value,
        price: price.value,
        img: imgPreview.src,
        description: description.value,
      };
      console.log(allData[index]);
      localStorage.setItem("products", JSON.stringify(allData));
      td[0].innerHTML = allData[index].id;
      td[1].innerHTML = allData[index].name;
      td[2].innerHTML = allData[index].price;
      td[3].getElementsByTagName("img")[0].src = allData[index].img;
      td[4].innerHTML = allData[index].description;
      Swal.fire("Successfully Changed", "", "success");
    };
  };
}

// view function
let allViewBtn = document.querySelectorAll(".view-btn");
console.log(allViewBtn);
for (let i = 0; i < allViewBtn.length; i++) {
  allViewBtn[i].onclick = function () {
    let tr = this.closest("tr");
    let td = tr.querySelectorAll("td");
    let index = tr.getAttribute("index");
    console.log(td);
    let id = td[0].innerHTML;
    let name = td[1].innerHTML;
    let price = td[2].innerHTML;
    let imgTag = td[3].getElementsByTagName("img");
    let img = imgTag[0].src;
    let description = td[4].innerHTML;
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
  searchFunction();
};

function searchFunction() {
  let tr = table.querySelectorAll("tr");

  let filter = searchId.value.toLowerCase();
  console.log(filter);
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    let tdName = tr[i].getElementsByTagName("td")[1];
    let id = td.innerHTML;
    let name = tdName.innerHTML;
    if (
      id.toLowerCase().indexOf(filter) > -1 ||
      name.toLowerCase().indexOf(filter) > -1
    ) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
