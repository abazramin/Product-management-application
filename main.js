let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let temp;
// Get totsl


function getTotal() {

    if (price.value != '') {

        let result = (+price.value + +texes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = "#fff";

    } else {

        total.innerHTML = '';
        total.style.background = "#a00d02";

    }

}

// Create product
let dataProduct;

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        texes: texes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value != '' && price.value != '' && category.value != '' && newProduct.count < 100) {

        if (mood === 'create') {

            //count
            if (newProduct.count > 1) {

                for (let i = 0; i < newProduct.count; i++) {

                    dataProduct.push(newProduct);

                }

            } else {

                dataProduct.push(newProduct);

            }
        } else {
            dataProduct[temp] = newProduct;
            mood = 'create';
            submit.innerHTML = "create";
            count.style.display = "block";
        }
    }
    // save on  localstorge





    // Save Localstorge
    localStorage.setItem('product', JSON.stringify(dataProduct));


    clearData()

    showDate()

}


// clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    texes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showDate() {

    let table = '';

    for (let i = 0; i < dataProduct.length; i++) {

        table += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].texes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
        <td><button onclick="deleteDate(  ${i}  )" id="delete">حذف</button></td>
        </tr> `;

    }
    document.getElementById("tbody").innerHTML = table;
    let btnDel = document.getElementById("deleteAll");

    if (dataProduct.length > 0) {
        btnDel.innerHTML = `
        <td><button onclick="deleteALl()"> حذف الكل (${dataProduct.length}) </button></td>
        `
    } else {
        btnDel.innerHTML = '';
    }


    getTotal();
}


function deleteALl() {

    localStorage.clear();
    dataProduct.splice(0)
    showDate();

}

showDate()
// delete

function deleteDate(i) {

    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showDate();

}



// update

function updateData(i) {

    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    texes.value = dataProduct[i].texes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerHTML = "Updata";

    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
// search By Title
let searchMood = 'title';


function getSearchMood(id) {

    let search = document.getElementById("search");

    if (id == 'searchTitle') {

        searchMood = 'title';
        search.Placeholder = 'Search By Title';

    } else {

        searchMood = 'category';
        search.Placeholder = 'Search By Category';

    }
    search.Placeholder = "Search By" + searchMood;
    search.focus();
    search.value = '';
    showDate();

}

function searchDate(value) {

    let table = '';

    if (searchMood == "title") {

        for (let i = 0; i < dataProduct.length; i++) {

            if (dataProduct[i].title.includes(value)) {

                table += ` 
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].texes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteDate(  ${i}  )" id="delete">حذف</button></td>
                </tr> `;

            }





        }

    } else {

        for (let i = 0; i < dataProduct.length; i++) {

            if (dataProduct[i].category.includes(value)) {

                table += ` 
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].texes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteDate(  ${i}  )" id="delete">حذف</button></td>
                </tr> `;

            }

        }

    }

    document.getElementById('tbody').innerHTML = table;

}

//clean date