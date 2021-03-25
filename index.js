if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
let obj = [ //detail nama dan harga belum saya update
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 1.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 2.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 3.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 4.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 5.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 6.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 7.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 8.jpg"
    },
    {
        nama: "nama",
        harga: 500000,
        gambar: "./Gambar/Catur 1.jpg"
    },
    
]
// update dynamic LIST
// selectors
let listBarang = document.getElementById("item-lists");

function createList(obj){
    for (let i = 0; i < obj.length; i++){
        let listContainer = document.createElement("div")
        listContainer.className = ("shop-item")
        listBarang.appendChild(listContainer)

        let gambarBarang = document.createElement("img")
        gambarBarang.className = "shop-item-image"
        listContainer.appendChild(gambarBarang)
        gambarBarang.src = obj[i].gambar

        let itemDetails = document.createElement("div")
        listContainer.appendChild(itemDetails)

        let hargaBarang = document.createElement("h3")
        hargaBarang.className = ("shop-item-price")
        itemDetails.appendChild(hargaBarang)
        hargaBarang.innerHTML = `IDR ${obj[i].harga}`

        let namaBarang = document.createElement("h5")
        namaBarang.className = ("shop-item-title")
        itemDetails.appendChild(namaBarang)
        namaBarang.innerHTML = obj[i].nama

        let tombol = document.createElement("button")
        tombol.className = ("btn-primary"+" "+"shop-item-button"+" "+"btn")
        tombol.type = "button"
        itemDetails.appendChild(tombol)
        tombol.innerHTML = "add"
    }
}
createList(obj)

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('IDR', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'IDR ' + total
}

