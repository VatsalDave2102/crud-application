// variables
let allData = [];
let id = document.querySelector("#productId");
let pname = document.querySelector("#productName");
let price = document.querySelector("#productPrice");
let img = document.querySelector("#productImg");
let description = document.querySelector("#productDesc");
let previewContainer = document.querySelector(".preview-container");
let imgPreview = document.querySelector(".img-preview");
let previewText = document.querySelector(".img-preview-text");
let submitBtn = document.querySelector(".submit");
let resetBtn = document.querySelector(".reset");

// random hash id generator function
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
id.value = makeid(6);
let reader = new FileReader();
// function for image preview before submitting
function imgPreviewFunc() {
  let file = img.files[0];
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

if (localStorage.getItem("products") == null) {
  allData = [];
} else {
  allData = JSON.parse(localStorage.getItem("products"));
}

// function for submitting product details
submitBtn.addEventListener("click", () => {
  let input = retrieveData();
  if(input.id == ''||input.name == '' ||input.price == ''||input.img==''||input.description==''){
    Swal.fire(
      'Fill the product details',
      '',
      'warning'
    )
  }else{
  allData.push(input);
  let dataString = JSON.stringify(allData);
  localStorage.setItem("products", dataString);
  resetForm();
  Swal.fire(
    'Submitted',
    'Your product details have been added',
    'success'
  )
}
});

// retrieveing input data
function retrieveData() {
  let product = {
    id: "",
    name: "",
    price: "",
    img: "",
    description: "",
  };
  product.id = id.value;
  product.name = pname.value;
  product.price = price.value;
  product.img = imgPreview.src;
  console.log(reader);
  product.description = description.value;
  return product;
}

// reset function
resetBtn.addEventListener("click", resetForm);
function resetForm() {
  previewText.style.display = null;
  imgPreview.style.display = null;
  imgPreview.setAttribute("src", "");
  id.value = makeid(6);
  price.value = "";
  pname.value = "";
  description.value = "";
  img.value = "";
}

