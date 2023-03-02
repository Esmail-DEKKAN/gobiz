function getUniqueValuesForKey(array, key, value, returnKey) {
    return Array.from(
        new Set(
            array
            .filter(item => item[key] === value)
            .map(item => item[returnKey])
        )
    );
}
function MenuUser(products){
    //console.log("MenuUser");
    const ownerSelect = document.getElementById("owner-select");
    const mainCategorySelect = document.getElementById("mainCategorySelect");
    const subCategorySelect = document.getElementById("subCategorySelect");
    const sizeSelect = document.getElementById("sizeSelect");
    const colorSelect = document.getElementById("colorSelect");
    var	mMainCategory = Object.values(headers)[2];	
    var mSubCategory = Object.values(headers)[3];
    var mSize = Object.values(headers)[7];	
    var mColor = Object.values(headers)[8];

    function setOptions(element,Title,SelectList){
        let CodeHTML = '';
        SelectList.forEach(row => { CodeHTML += ` <option value="${row}">${row}</option> `; });
        element.innerHTML =  Title + CodeHTML;
    }
    /* Main category */
    let mainCategory = products.map(obj => obj[mMainCategory]);
    SelectTitle  = `<option value="">${mMainCategory}</option>`;
    setOptions(mainCategorySelect,SelectTitle,[...new Set(mainCategory)]);

    
    mainCategorySelect.addEventListener("change", function() {
        const selectedMainCategory = this.value;
        subCategorySelect.innerHTML = "<option value=''>Sub Category</option>";
        subCategorySelect.disabled = true;
        sizeSelect.innerHTML = `<option value=''>${mSize}</option>`;
        sizeSelect.disabled = true;
        colorSelect.innerHTML = `<option value=''>${mColor}</option>`;
        colorSelect.disabled = true;
        filterButton.disabled = true;
        if (selectedMainCategory) {
            const subCategories = getUniqueValuesForKey(
                products,
                mMainCategory,
                selectedMainCategory,
                mSubCategory
            );
            subCategorySelect.innerHTML =
                `<option value=''>${mSubCategory}</option>` +
                subCategories
                .map(
                    this_subCategory =>
                    `<option value='${this_subCategory}'>${this_subCategory}</option>`
                )
                .join("");
            subCategorySelect.disabled = false;
        }
    });

    subCategorySelect.addEventListener("change", function() {
        const selectedSubCategory = this.value;
        sizeSelect.innerHTML = `<option value=''>${mSize}</option>`;
        sizeSelect.disabled = true;
        colorSelect.innerHTML = `<option value=''>${mColor}</option>`;
        colorSelect.disabled = true;
        filterButton.disabled = true;
        if (selectedSubCategory) {
            const Size = getUniqueValuesForKey(
                products,
                mSubCategory,
                selectedSubCategory,
                mSize
            );
            sizeSelect.innerHTML =
                `<option value=''>${mSize}</option>` +
                Size
                .map(size => `<option value='${size}'>${size}</option>`)
                .join("");
            sizeSelect.disabled = false;
        }
    });
    sizeSelect.addEventListener("change", function() {
        const selectedSize = this.value;
        colorSelect.innerHTML = `<option value=''>${mColor}</option>`;
        colorSelect.disabled = true;
        filterButton.disabled = true;
        if (selectedSize) {
            const colors = getUniqueValuesForKey(
                products,
                mSize,
                selectedSize,
                mColor
            );
            colorSelect.innerHTML =
                `<option value=''>${mColor}</option>` +
                colors
                .map(color => `<option value='${color}'>${color}</option>`)
                .join("");
            colorSelect.disabled = false;
        }
    });
    colorSelect.addEventListener("change", function() {
        filterButton.disabled = !this.value;
    });
}
