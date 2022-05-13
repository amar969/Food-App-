const getData = async () => {
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await res.json();
  console.table(data.categories);
  storeDataLocal(data.categories);
};

getData();

const storeDataLocal = async (data) => {
  data.forEach((element) => {
    console.log(element.strCategory);
    localStorage.setItem("categories", JSON.stringify(data));
  });
};

let form_div = document.querySelector(".form-select");

const displayData = async () => {
  let data = JSON.parse(localStorage.getItem("categories"));
  console.log(data);

  data.forEach((element) => {
    let card = document.createElement("div");

    let cate_option = document.createElement("option");
    cate_option.innerHTML = element.strCategory;

    form_div.append(cate_option);
  });
  
};

displayData();


const getCate = () =>{
    let cate = document.getElementById("category").value
    console.log(cate)
    getSelectedCate(cate)
}

let roo_div = document.getElementById("root")

const getSelectedCate = async(item) => {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
    let data = await res.json()
    console.table(data.meals)
    showSelectedCate(data.meals)

}

getSelectedCate()


const showSelectedCate = (items) => {

    roo_div.innerHTML = ""

    items.forEach(el => {

    let main_div = document.createElement("div")
    main_div.classList.add("card")
    
    let item_img = document.createElement("img")
    item_img.src = el.strMealThumb
    item_img.classList.add("card-img-top")

    let item_name = document.createElement("p")
    item_name.innerHTML = el.strMeal
    item_name.classList.add("card-title")
    
    main_div.append(item_img, item_name)

    roo_div.append(main_div)

    })


}
