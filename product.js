// variables
let table = document.querySelector('.tbody')
let allData = []
allData = JSON.parse(localStorage.getItem('products'))
 
// displaying data on page
function getData() {
      console.log(allData)
      allData.forEach((data, index)=>{
        table.innerHTML += `
      <tr>
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
              <button type="button" class="btn">Delete</button>
            </td>
          </tr>
      `
      })

  }
  getData();