// variables
let table = document.querySelector(".tbody");
let allData = [];
allData = JSON.parse(localStorage.getItem("products"));

// displaying data on page
function getData() {
  console.log(allData);
  allData.forEach((data, index) => {
    table.innerHTML += `
      <tr index="${index}">
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td><img src ="${data.img}" style="width:40px; height:40px"></td>
            <td>
              <button
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                View
              </button>
              <button type="button" class="btn">Edit</button>
              <button type="button" class="btn delete-btn">Delete</button>
            </td>
          </tr>
      `;
  });
  // delete function
  let allDeleteBtn = document.querySelectorAll(".delete-btn");
  console.log(allDeleteBtn);
  for (let i = 0; i < allDeleteBtn.length; i++) {
    allDeleteBtn[i].onclick = function () {
      var tr = this.closest("tr");
      console.log(tr);
      var index = tr.getAttribute("index");
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#655DBB",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          allData.splice(index, 1);
          localStorage.setItem("products", JSON.stringify(allData));
          tr.remove();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire("Operation cancelled");
        }
      });
    };
  }
}
getData();
