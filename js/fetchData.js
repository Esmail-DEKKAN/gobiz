function fetchData() {
    //console.log("load DataBase");
    var request = new XMLHttpRequest();
    request.open('GET', 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSXdu2BEMg-HK6vicRYTmIskyAXS4dVKEIzRZFipBBYuwR9k_1bX7Kw_L9jUONWdUSsHhYUZIKDvS6k/pub?output=csv', false);
    request.send();
    if (request.status >= 200 && request.status < 400) {
        var data = request.responseText.split('\r\n');
        headers = data[0].split(',');
        products = [];
        for (var i = 1; i < data.length; i++) {
            var productData = data[i].split(',');
            if (productData.length < headers.length) {
            continue;
            }
            var product = {};
            for (var j = 0; j < headers.length; j++) {
            product[headers[j]] = productData[j];
            }
            products.push(product);
        }
        DataBase = products;
    } else {
        console.error('Error while fetching data from Google Sheet');
    }
}
function ProductGrid(products,headers,min, max){
    var Owner = Object.values(headers)[0];	
    var ProductName = Object.values(headers)[1];
    var	MainCategory = Object.values(headers)[2];	
    var SubCategory = Object.values(headers)[3];	
    var company = Object.values(headers)[4];
    var price = Object.values(headers)[5];
    var StockQuantity = Object.values(headers)[6];
    var Size = Object.values(headers)[7];	
    var Color = Object.values(headers)[8];
    var	ProductId = Object.values(headers)[9];	
    var URLs = Object.values(headers)[10];

    const productsGrid = document.querySelector('#Filtred-Products');
    let productsHTML = '';
    let count=0;
    //console.log("products",products);
    products.forEach(product => {
        let _price = product[price];
        if(Number( _price ) >= min && Number( _price ) <= max ){//console.log("_price:\n",_price);
            document.querySelector('#Results').innerHTML = `<h4> Availbale Products: </h4>`;
            productsHTML += `
                <div class="w-1/1 lg:w-1/3 p-4">
                    <div class="p-4 bg-white shadow-lg rounded-lg">
                        <div id="slider-container-${count}" class="slider-container" style="height: 449.649px;">
                            <div class="slider">
                                <div class="slider-track" style="width: 300px; transform: translateX(-100%);"></div>
                            </div>
                            <button class="slider-btn slider-btn-prev" style="border: solid;">&lt;</button>
                            <button class="slider-btn slider-btn-next" style="border: solid;">&gt;</button>
                        </div>
                        <span class="py-1 px-2 bg-red-500 rounded text-xs text-white">Hot</span>
                        <div class="w-full mb-1 mt-1 justify-between items-center">
                            <div>
                                <h3 id="6257f6f020364_product_name" class="text-sm font-medium">
                                    ${product[ProductName]}</h3>
                                <span id="6257f6f020364_subtitle" class="text-xs text-gray-500">${product[company]}</span>
                            </div>
                        </div>
                        <div class="w-full mb-1 justify-between items-center">
                            <h4 class="text-sm mb-3 font-bold"><span id="6257f6f020364_currency">$</span> <span id="6257f6f020364_price">${product[price]}</span>
                            </h4>
                            <a onclick="if (!window.__cfRLUnblockHandlers) return false; addToCart('6257f6f020364')" 
                            class="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-md text-white transition duration-200">Add			   </a>
                        </div>
                    </div>
                </div>
            `;
            count+=1; 
        }
    });
    if (count == 0){
        document.querySelector('#Results').innerHTML = `<h4> No things to Show!. </h4>`;
    }
    productsGrid.innerHTML = productsHTML;
    count2=0;
    setTimeout(()=>{
        products.forEach(product => {
            let urls=product[URLs].split(`\"`).filter(function (el){return el!="";})[0].split(`\n`)
            //console.log("urls<<",urls);
            sliderMaker(document.querySelector(`#slider-container-${count2}`), urls)
            count2+=1;
        });
    },900);
    
}

function CategoryGrid(){
    var request = new XMLHttpRequest();
    let catHTML= ""; 
    url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSXdu2BEMg-HK6vicRYTmIskyAXS4dVKEIzRZFipBBYuwR9k_1bX7Kw_L9jUONWdUSsHhYUZIKDvS6k/pub?gid=983383517&single=true&output=csv";
    request.open('GET', url, false);
    request.send();
    if (request.status >= 200 && request.status < 400) {
        var data = request.responseText.split('\r\n');
        let header = data[0].split(',');
        //console.log("header :",header);
        let categoryImgUrls = [];
        for (var i = 1; i < data.length; i++) {
            var catData = data[i].split(',');
            if (catData.length < header.length) {
            continue;
            }
            var cat = {};
            for (var j = 0; j < header.length; j++) {
                if(catData[j]!=""){
                    cat[header[j]] = catData[j];
                }
            }
            categoryImgUrls.push(cat);
            //console.log("cat :",cat);
        }
        categoryImgUrls.forEach(cat =>{
            //console.log('cat["categories"]',categoryImgUrls,cat["categories"]);
            catHTML+=`
            <div class="w-1/1 lg:w-1/3 p-4" onclick="AddDel(this,products);">
                <div class="p-4 bg-white shadow-lg rounded-lg">
                    <div>
                        <h1 id="categoriesName" style="font-size:40px;">${cat["categories"]}<h1>
                    </div>
                    <div class="w-full mb-2">
                        <img class="rounded pb-2" id="6257f6f01d1e1_product_image" src="${cat["categoryUrl"]}" alt="${cat["categories"]}">
                    </div>
                </div>
            </div>
            `;
        });
    }
    else {
    console.error('Error while fetching data from Google Sheet');
    } 
    let categories=document.querySelector("#Categories");
    categories.innerHTML = catHTML;
}

function loading(){
    //console.log("AddDel!");
    const img = document.createElement("img");
    img.setAttribute("src", "images/loading.gif");
    img.setAttribute("id", "loading");
    img.setAttribute("style", "padding:20px; width=20px");
    document.querySelector("#Results").appendChild(img);
}
function AddDel(el,products){
    var request = new XMLHttpRequest();
    url="https://docs.google.com/spreadsheets/d/e/2PACX-1vSXdu2BEMg-HK6vicRYTmIskyAXS4dVKEIzRZFipBBYuwR9k_1bX7Kw_L9jUONWdUSsHhYUZIKDvS6k/pub?gid=325958979&single=true&output=csv";
    request.open('GET', url, false);
    request.send();
    let header = {};
    let subcategoryImgUrls = [];
    if (request.status >= 200 && request.status < 400) {
        var data = request.responseText.split('\r\n');
        header = data[0].split(',');
        //console.log("header :",header);
        
        for (var i = 1; i < data.length; i++) {
            var catData = data[i].split(',');
            if (catData.length < header.length) {
            continue;
            }
            var cat = {};
            for (var j = 0; j < header.length; j++) {
                if(catData[j]!=""){
                    cat[header[j]] = catData[j];
                }
            }
            subcategoryImgUrls.push(cat);
        }
    }
    let Cat=el.querySelector("#categoriesName").textContent;
    const subCat = getUniqueValuesForKey(
        products,
        Object.values(headers)[2],
        Cat,
        Object.values(headers)[3]
    );
    let subcatHTML="";
    let num=0;
    let subCatUrl = Object.values(header)[1];
    subCat.forEach(subCat =>{
        //console.log("subcat :","\n", subCat,"\n",subcategoryImgUrls[num][Object.values(header)[1]]);
        //console.log('cat["categories"]',categoryImgUrls,cat["categories"]);
        subcatHTML+=`
        <div class="w-1/1 lg:w-1/3 p-4" onclick="AddDelsub(this,products);">
            <div class="p-4 bg-white shadow-lg rounded-lg">
                <div>
                    <h4 id="Cat" style="visibility:hidden">${Cat}</h4>
                    <h1 id="subCat" style="font-size:40px;">${subCat}<h1>
                </div>
                <div class="w-full mb-2">
                    <img class="rounded pb-2" id="6257f6f01d1e1_product_image" src="${subcategoryImgUrls[num][subCatUrl]}" alt="${subCat}">
                </div>
            </div>
        </div>
        `;
        num+=1;
    });
    let shop=document.querySelector("#shop");
    let SubCategories=document.querySelector("#SubCategories");
    SubCategories.innerHTML = subcatHTML;
    section_category=document.querySelector(".Categories")
    section_products=document.querySelector(".Filtred-Products")
    session_subCat=document.querySelector(".SubCategories")
    session_subCat.append(SubCategories);
    shop.append(session_subCat);
    shop.append(section_category);
    shop.append(section_products);
};
function AddDelsub(subCatel,products){
    CatName=subCatel.querySelector("#Cat").textContent
    subCatName=subCatel.querySelector("#subCat").textContent
    p = products.filter((item) => item[`${Object.values(headers)[2]}`] === CatName)
                .filter((item) => item[`${Object.values(headers)[3]}`] === subCatName)

    let subcatHTML='';
    //console.log("P",p);
    p.forEach(prod =>{
        //console.log('cat["categories"]',categoryImgUrls,cat["categories"]);
        subcatHTML+=`
        <div class="w-1/1 lg:w-1/3 p-4">
            <div class="p-4 bg-white shadow-lg rounded-lg">
                <div>
                    <h4 id="Cat" style="visibility:hidden">${CatName}</h4>
                    <h1 id="subCat" style="font-size:40px;">${prod[Object.values(headers)[1]]}<h1>
                </div>
                <div class="w-full mb-2">
                    <img class="rounded pb-2" id="6257f6f01d1e1_product_image" src="https://www.apple.com/v/iphone-14/d/images/overview/design/gallery_xdr_blue__e1dgjo6d86eu_large.jpg" alt="${prod[Object.values(headers)[1]]}">
                </div>
            </div>
        </div>
        `;
        
    });

    //////////////////

    var Owner = Object.values(headers)[0];	
    var ProductName = Object.values(headers)[1];
    var	MainCategory = Object.values(headers)[2];	
    var SubCategory = Object.values(headers)[3];	
    var company = Object.values(headers)[4];
    var price = Object.values(headers)[5];
    var StockQuantity = Object.values(headers)[6];
    var Size = Object.values(headers)[7];	
    var Color = Object.values(headers)[8];
    var	ProductId = Object.values(headers)[9];	
    var URLs = Object.values(headers)[10];

    const productsGrid = document.querySelector('#Filtred-Products');
    let productsHTML = '';
    let count=1;
    //console.log("products",products);
    p.forEach(product => {
        productsHTML += `
        <div class="w-1/1 lg:w-1/3 p-4">
            <div class="p-4 bg-white shadow-lg rounded-lg">
                <div id="slider-container-${count}" class="slider-container" style="height: 449.649px;">
                    <div class="slider">
                        <div class="slider-track" style="width: 300px; transform: translateX(-100%);"></div>
                    </div>
                    <button class="slider-btn slider-btn-prev" style="border: solid;">&lt;</button>
                    <button class="slider-btn slider-btn-next" style="border: solid;">&gt;</button>
                </div>
                <span class="py-1 px-2 bg-red-500 rounded text-xs text-white">Hot</span>
                <div class="w-full mb-1 mt-1 justify-between items-center">
                    <div>
                        <h3 id="6257f6f020364_product_name" class="text-sm font-medium">
                            ${product[ProductName]}</h3>
                        <span id="6257f6f020364_subtitle" class="text-xs text-gray-500">${product[company]}</span>
                    </div>
                </div>
                <div class="w-full mb-1 justify-between items-center">
                    <h4 class="text-sm mb-3 font-bold"><span id="6257f6f020364_currency">$</span> <span id="6257f6f020364_price">${product[price]}</span>
                    </h4>
                    <a onclick="if (!window.__cfRLUnblockHandlers) return false; addToCart('6257f6f020364')" 
                    class="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded text-md text-white transition duration-200">Add			   </a>
                </div>
            </div>
        </div>
        `;
        count+=1; 
        
    });
    productsGrid.innerHTML = productsHTML;
    count2=1;
    setTimeout(()=>{
        p.forEach(product => {
            let urls=product[URLs].split(`\"`).filter(function (el){return el!="";})[0].split(`\n`)
            //console.log("urls<<",urls,"\n",product,count2);
            sliderMaker(document.querySelector(`#slider-container-${count2}`), urls)
            count2+=1;
        });
    },900);
    //////////////////////////
    let shop=document.querySelector("#shop");
    let prods=document.querySelector("#Filtred-Products");
    let section_category=document.querySelector(".Categories")
    //prods.innerHTML = subcatHTML;
    session_subCat=document.querySelector(".SubCategories")
    section_products=document.querySelector(".Filtred-Products")
    section_products.append(productsGrid);
    shop.append(section_products);
    shop.append(session_subCat);
    shop.append(section_category);
}
