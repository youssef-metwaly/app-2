


var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");

var lightBoxContainer = document.querySelector("#lightBoxContainer");

var closeBtn = document.querySelector("#closeBtn");


var indexVisit = 0;

var productList ;




if ( localStorage.getItem("myProduct") != null ) {

    productList = JSON.parse ( localStorage.getItem("myProduct") );
    displayData(productList);
}
else {
    productList = [];
}




function addProduct() {

    if(validationName() == true && validationUrl() == true ){

        var product = {
            name  : bookmarkName.value, 
            url : bookmarkURL.value
        }
    
        productList.push(product);

        localStorage.setItem("myProduct" , JSON.stringify(productList));

        clearForm();
        displayData(productList);
        console.log(productList);

    }else {
        lightBoxContainer.classList.remove("d-none");
    }
}


function clearForm() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}



function displayData() {
    var box = "";
    for(var i = 0 ; i < productList.length ; i++){
        box +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${productList[i].name}</td>
            <td><a onclick="visitItem(${i})" href="${productList[i].url}" target="_blank"><button class="btn btn-visit pe-2"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button onclick="deleteItem( ${i} )" class="btn btn-delete pe-2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = box;
}



function deleteItem(index) {
    productList.splice ( index , 1 );

    localStorage.setItem("myProduct" , JSON.stringify(productList));

    displayData();
}


function visitItem(index) {
    indexVisit = index ;
    bookmarkName.value;
}



function validationName() {

    var regexName = /^\w{3,}(\s+\w+)*$/ ;
    var text = bookmarkName.value ;


    if (regexName.test(text) == true) {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        return true;

    }
    else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        return false;
    }
    
}

function validationUrl() {

    var regexUrl = /^(https?:\/\/).*\.com$/ ;
    var textUrl = bookmarkURL.value ;


    if (regexUrl.test(textUrl) == true) {
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");
        return true;

    }
    else{
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");
        return false;
    }
    
}



closeBtn.addEventListener('click' , function(eventInfo) {
    lightBoxContainer.style.display = 'none'
})

lightBoxContainer.addEventListener('click' , function(eventInfo){
    lightBoxContainer.style.display = 'none'
})

lightBoxContainer.firstElementChild.addEventListener('click', function(eventInfo){
    eventInfo.stopPropagation()
})