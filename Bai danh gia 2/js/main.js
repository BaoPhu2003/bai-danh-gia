let count=0;
render();
function render() {
    for (let i = 0; i < PRODUCTS.length; i++) {
        document.getElementById('listProducts').innerHTML+= `
        <div class="row align-items-center">
        <div class="col-6 col-md-4">
        <img src="img/${PRODUCTS[i].thumb}" alt="" class="img-fluid">
        </div>
        <div class="col-6 col-md-8">
        <h6>${PRODUCTS[i].name}</h6>
        <div class="form-group">
            <div class="d-flex">
                <button class="btn btn-primary"> - </button>
                <input type="text" class="form-control value-number mx-1 " value="1" min="0">
                <button class="btn btn-primary"> + </button>
                </div>
                    <button class="btn btn-danger btn-block mt-1 btn-add-to-cart">$${PRODUCTS[i].price}</button>
                </div>
            </div>
        </div> 
    `
    }
    let get_d_flex = document.querySelectorAll('.d-flex')
    let get_value_number = document.querySelectorAll('.value-number')
    btn_primary(get_d_flex, get_value_number);
    let get_btn_add_to_cart = document.querySelectorAll('.btn-add-to-cart')
    render_your_cart(get_btn_add_to_cart,get_value_number);
}
function btn_primary(get_d_flex, get_value_number) {
    for (let i = 0; i <  get_d_flex.length; i++) {
        let get_btn_primary = get_d_flex[i].querySelectorAll('.btn-primary')
        check_input(get_value_number[i], i);
        get_btn_primary[0].onclick=()=>{
            temp = parseInt(get_value_number[i].value);
            if(temp > 1) 
                get_value_number[i].value= --temp;
        }
        get_btn_primary[1].onclick=()=>{
            temp = parseInt(get_value_number[i].value);
            get_value_number[i].value= ++temp;
        }
    }
}
function check_input(input) {
    input.addEventListener('change',()=>{
        let check = parseInt(input.value*1);
        console.log(typeof check);
        if(isNaN(check)){
            window.alert('Vui lòng nhập số')
            input.value = 1;
        }
    });
}
function render_your_cart(get_btn_add_to_cart,get_value_number) {
    for (let i = 0; i < get_btn_add_to_cart.length; i++) {
        let get_list_product = document.getElementById('listProducts')
        get_btn_add_to_cart[i].onclick=()=>{
            carts.push({
                name: PRODUCTS[i].name,
                price: PRODUCTS[i].price,
                quantity: get_list_product.querySelectorAll('.value-number')[i].value
            })
            render_temp();
            update_your_cart();
        }
    } 
}
function render_temp() {
    console.log(carts);
    let xhmtl = '';
    for (let i = 0; i < carts.length; i++) { 
            xhmtl +=`
            <tr class="product-item">
                <td class="count">${i + 1}</td>
                <td>${carts[i].name}<td>    
                <td class="origin-price">${carts[i].price}</td>
                <td>
                    <input type="number" class="form-control product-quantity" min='0' value="${carts[i].quantity}">
                </td>
                <td><span class="fw-bold product-subtotal">$${carts[i].price*carts[i].quantity}</span></td>
                <td>
                    <button type="button" class="btn btn-link btn-sm btn-rounded btn-update">Update</button>
                    <button type="button" class="btn btn-link btn-sm btn-rounded btn-delete">Delete</button>
                </td>
            </tr>`
        }
    document.getElementById('cardProducts').innerHTML = xhmtl;
    delete_child(); 
    update_child(); 
}
function update_your_cart() {
    let quantity_buy = 0;
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
        quantity_buy += parseInt(carts[i].quantity)
        total += parseInt(carts[i].price*carts[i].quantity)
    document.querySelector('tfoot').innerHTML=`
        <tr>
            <td colspan="4" >There are <span id="count" >${quantity_buy}</span> items in your shopping cart.</td>
            <td colspan="2"><span class="fw-bold text-danger" id="toTal">$${total}</span></td>
        </tr>`
    }
}
function delete_child(){
    let get_product_item =document.querySelectorAll('.product-item');
    get_product_item.forEach((value, index) => {
        value.querySelector('.btn-delete').onclick = () =>{
            value.parentNode.removeChild(value);
            carts.splice(index,1)
            update_your_cart();
            count-=1;
            reload_stt();
        }
    });
}
function reload_stt() {
    let get_product_item = document.querySelectorAll('.product-item');
    for (let i = 1; i <= count; i++) {
        get_product_item[ i - 1 ].querySelector('.count').innerText = i;
    }
}
function update_child() {
    let get_product_item =document.querySelectorAll('.product-item');
    get_product_item.forEach((value,i) => {
        value.querySelector('.btn-update').onclick = () =>{
            carts[i].quantity = value.querySelector('.product-quantity').value
            console.log(carts[i].quantity);
            // carts.splice(0,quantity)
            render_temp();
            update_your_cart()
        }
    });
}
