/**
 * Project ini akan mengasah kemampuan kamu dalam memanipulasi array yang berisi object
 *
 * Deskripsi:
 * Terdapat banyak fungsi, namun hanya 4 fungsi saja yang belum bekerja sebagai mana mestinya yaitu
 * 1. createStars: fungsi ini untuk menampilkan star (bintang) sesuai dengan jumlahnya secara dinamis, outputnya berupa array
 * 2. sortPriceAscending: fungsi ini untuk mengurutkan produk berdasarkan harga termurah
 * 3. sortPriceDescending: fungsi ini untuk mengurutkan produk berdasarkan harga tertinggi
 * 4. showProducts: menampilkan semua product,
 *    fungsi showProducts memiliki kriteria sebagai berikut:
 *    - semua product harus muncul semua
 *    - tidak menampilkan barang yang stoknya kurang dari filters.stockMinimal
 *    - jika filters.priceMinimal > 0 maka tampilkan product dengan harga lebih besar dari filters.priceMinimal
 *    - jika filters.priceMaximal > 0 maka tampilkan product dengan harga lebih kecil dari filters.priceMaximal
 *    - jika filters.priceMinimal dan filters.priceMaximal > 0 maka tampilkan product dengan harga pada range tersebut
 *    - jika filters.stars ada isinya, maka tampilkan product-product yang memiliki star sesuai yang ada di array filters.stars.
 *      misal filters.stars isinya [1, 2] maka tampilkan semua product yang memiliki 1 star dan 2 star
 *    - jika filtes.size ada isinya, maka tampilkan product-product yang memiliki size yang sesuai dengan filters.size, jika tidak tampilkan semua
 *    - jika filters.searchText ada isinya, maka tampilkan product-product yang nama atau deskripsinya sesuai dengan filters.searchText
 */
const filters = {
  searchText: "",
  stockMinimal: 1,
  priceMinimal: 0,
  priceMaximal: 9999999999,
  size: "",
  stars: [1, 2, 3, 4, 5],
};

function createStars(totalStars) {
  let stars = [];

  // stars masih hardcode / tidak dinamis
  //   stars.push('<i class="fa fa-star text-warning"></i>');
  //   stars.push('<i class="fa fa-star text-warning"></i>');
  //   stars.push('<i class="fa fa-star text-warning"></i>');
  //   stars.push('<i class="fa fa-star text-secondary"></i>');
  //   stars.push('<i class="fa fa-star text-secondary"></i>');

  // buatlah fungsi untuk mencetak star yang menyala sesuai
  // dengan jumlah totalStars yang ada di parameter fungsi createStars

  for (var i = 0; i < totalStars; i++) {
    stars.push('<i class="fa fa-star text-warning"></i>');
  }

  return stars;
}

function sortPriceAscending() {
  // isi jawaban kamu disini
  products.sort((a, b) => a.price - b.price);
  showProducts();
}

function sortPriceDescending() {
  // isi jawaban kamu disini
  products.sort((a, b) => b.price - a.price);
  showProducts();
}

function showProducts() {
  let productList = document.getElementById("product-list");
  let result = [];
  let search = new RegExp(filters.searchText, "gi");
  productList.innerHTML = "";

  let filteredProduct = products;

  if (filters.priceMinimal) {
    filteredProduct = filteredProduct.filter(
      (product) => product.price >= filters.priceMinimal
    );
  }

  if (filters.priceMaximal) {
    filteredProduct = filteredProduct.filter(
      (product) => product.price <= filters.priceMaximal
    );
  }

  if (filters.stars) {
    filteredProduct = filteredProduct.filter((product) =>
      filters.stars.includes(product.stars)
    );
  }

  if (filters.size) {
    filteredProduct = filteredProduct.filter((product) =>
      product.size == filters.size
    );
  }

  if (filters.searchText) {
    filteredProduct = filteredProduct.filter((product) =>
        product.name.match(search) || product.description.match(search)
    );
  }

  for (let i in filteredProduct) {
    let product = filteredProduct[i];
    let stars = createStars(product.stars);

    // lakukan logika filter kamu disini ...

    result.push(`
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 mt-4">
                <div class="card" onclick="showDetail(this, ${i})">
                    <img class="card-img-top" src="${product.image}" alt="${
      product.name
    }">
                    <div class="card-body">
                        <h4 class="card-title">${product.name}</h4>
                        <p class="text-success">Rp. ${product.price.toLocaleString()}</p>
                        <div class="row">
                            <div class="col-sm-8">${stars.join("")}</div>
                            <div class="col-sm-4"><i class="badge badge-secondary">${
                              product.size
                            }</i></div>
                        </div>
                    </div>
                </div>
            </div>`);
  }

  productList.innerHTML = result.join("");
}

function onSearch(value) {
  filters.searchText = value;

  showProducts();
}

function changeSize(size) {
  filters.size = size;

  showProducts();
}

function changePriceMin(value) {
  filters.priceMinimal = parseFloat(value);

  showProducts();
}

function changePriceMax(value) {
  filters.priceMaximal = parseFloat(value);

  showProducts();
}

function setStar(el, star) {
  if (el.checked) {
    filters.stars.push(star);
  } else {
    filters.stars.splice(filters.stars.indexOf(star), 1);
  }

  showProducts();
}

function modalVisible(show) {
  let modal = document.getElementById("myModal");
  let backdrop = document.getElementById("modal-backdrop");

  if (show) {
    modal.classList.add("show");
    backdrop.classList.add("show");
    document.body.classList.add("modal-open");
  } else {
    modal.classList.remove("show");
    backdrop.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}

document.querySelectorAll('[data-dismiss="modal"]').forEach((b) => {
  b.onclick = () => modalVisible(false);
});

function showDetail(dom, index) {
  let product = products[index];
  let title = document.getElementById("modal-title");
  let detail = document.getElementById("modal-body");
  let description = document.getElementById("modal-description");

  detail.innerHTML = dom.innerHTML;
  description.innerHTML = product.description;
  title.innerHTML = product.name;

  modalVisible(true);
}

showProducts();
