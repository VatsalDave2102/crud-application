# crud-application
## Hosting link
https://product-management-system-vatsal.netlify.app/

This is a product management system which contains functionalities such as:

## 1. Add
User can input name, price, description, image of product. Product ID will be an auto generated string of length 6.
All the data is stored in localStorage.
 ![Screenshot from 2023-04-03 12-56-10](https://user-images.githubusercontent.com/124878757/229443029-c1abef78-74da-4fb6-95b8-129aefe52960.png)


## 2. View
User can view the products in view/edit products page. A modal will appear of that product when user clicks on the view button of the specific product.
![Screenshot from 2023-04-03 12-56-45](https://user-images.githubusercontent.com/124878757/229443092-227b5faf-2ae2-4233-86df-ca7b91920c98.png)

This is the view modal.
![Screenshot from 2023-04-03 12-56-53](https://user-images.githubusercontent.com/124878757/229443113-dbcde0e4-d710-49fc-85c2-f4ad4be8d5dc.png)

## 3. Edit
User can edit the product details. They cannot leave any field empty while editing. A modal will open for editing the product.
![Screenshot from 2023-04-03 13-17-58](https://user-images.githubusercontent.com/124878757/229445095-b07ea284-d3c3-47e8-b5a9-1071d7630150.png)

## 4. Sort
User can sort the table rows by Product Id, Product Name, Product price in an ascending and descending order. They have to click on the arrow besides Id, Name and Price.

## 5. Search
User can search products by name and Id using the searchbar given above product list.

## 6. Delete
User can delete any product using the delete button. A warning will be given before deleting the product. 
