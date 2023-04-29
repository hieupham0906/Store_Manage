// dung jquery, js ko chay vi chua load het du lieu dau vao dc
$(document).ready(function() {    
    let create_item = (id, name, number, price, describe, producer, image, url_product_detail) => {
        let add_cart_param =  id  + ",'" + image + "','" + name  + "','" + number  + "','" + price  + "','"
                                + describe  + "','" + producer  + "','/cart/cart_add/'";
        // console.log(add_cart_param)
        // str = 
        // "<div class='col'>"
        // +"    <div class='card shadow-sm'>"
        // +"        <img class='img-thumbnail view_img' src='/media/"+image+"' alt=''>"
        // +"        <div class='card-body'>"
        // +"            <h3 class='card-text text-center'>"+name+"</h3>"
        // +"            <h5 class='card-text text-center'>Total product: "+number+"</h5>"
        // +"            <h5 class='card-text text-center'>Price: "+price+"$</h5>"
        // +"            <h5 class='card-text text-center'>Producer: "+producer+"</h5>"
        // +"            <div class='d-flex justify-content-end align-items-center'>"
        // +"                <div class='btn-group'>"
        // +"                    <a href='"+url_product_detail+"'>"
        // +"                        <button class='btn btn-sm btn-outline-secondary mx-1'>View detail</button>"
        // +"                    </a>"
        // +"                    <div id='buynow"+id+"'>"
        // +"                    <button class='btn btn-sm btn-outline-secondary mx-1' id='product"+id+"'" + " onClick=add_cart("+ add_cart_param +")>"
        // +"                        Buy now"
        // +"                    </button>"
        // +"                    </div>"
        // +"                </div>"
        // +"            </div>"
        // +"        </div>"
        // +"    </div>"
        // +"</div>"
        

        // console.log(str)
        // return str;

        let productDiv = document.createElement('div');
        productDiv.className = 'col';

        let productCard = document.createElement('div');
        productCard.className = 'card shadow-sm';

        let productImg = document.createElement('img');
        productImg.className = 'img-thumbnail view_img';
        productImg.src = '/media/'+image;
        productImg.alt = '';

        let productCardBody = document.createElement('div');
        productCardBody.className = 'card-body';

        let productName = document.createElement('h3');
        productName.className = 'card-text text-center';
        productName.textContent = name;

        let productTotal = document.createElement('h5');
        productTotal.className = 'card-text text-center';
        productTotal.textContent = 'Total product: '+number;

        let productPrice = document.createElement('h5');
        productPrice.className = 'card-text text-center';
        productPrice.textContent = 'Price: '+price+'$';

        let productProducer = document.createElement('h5');
        productProducer.className = 'card-text text-center';
        productProducer.textContent = 'Producer: '+producer;

        let productButtonGroup = document.createElement('div');
        productButtonGroup.className = 'd-flex justify-content-end align-items-center';

        let viewDetailLink = document.createElement('a');
        viewDetailLink.href = url_product_detail;

        let viewDetailButton = document.createElement('button');
        viewDetailButton.className = 'btn btn-sm btn-outline-secondary mx-1';
        viewDetailButton.textContent = 'View detail';

        let buyNowButtonDiv = document.createElement('div');
        buyNowButtonDiv.id = 'buynow'+id;

        let buyNowButton = document.createElement('button');
        buyNowButton.className = 'btn btn-sm btn-outline-secondary mx-1';
        buyNowButton.id = 'product'+id;
        buyNowButton.textContent = 'Buy now';
        buyNowButton.onclick = function() {
            add_cart(id,image,name,number,price,
                        describe,producer,'/cart/cart_add/');
        }

        viewDetailLink.appendChild(viewDetailButton);
        productButtonGroup.appendChild(viewDetailLink);
        buyNowButtonDiv.appendChild(buyNowButton);
        productButtonGroup.appendChild(buyNowButtonDiv);

        productCardBody.appendChild(productName);
        productCardBody.appendChild(productTotal);
        productCardBody.appendChild(productPrice);
        productCardBody.appendChild(productProducer);
        productCardBody.appendChild(productButtonGroup);

        productCard.appendChild(productImg);
        productCard.appendChild(productCardBody);

        productDiv.appendChild(productCard);
        return productDiv

    }

    let show_product_html = (products) => {
        products.forEach( (element) => {
            // show_product.innerHTML += create_item(
            //                             element.id, 
            //                             element.name, 
            //                             element.number, 
            //                             element.price, 
            //                             element.describe, 
            //                             element.producer, 
            //                             element.image, 
            //                             element.url_product_detail)
            show_product.append(
                create_item(
                    element.id, 
                    element.name, 
                    element.number, 
                    element.price, 
                    element.describe, 
                    element.producer, 
                    element.image, 
                    element.url_product_detail
                ))

        });

        if(products.length == 0) {
            show_product.innerHTML += "<span class='text-center w-100'>No entry of product</span>"
        }

    }

    $('#sort_product').click(function() {
        show_product.innerHTML = "";
        let sort = document.querySelector('input[name="sort"]:checked').value;
        console.log(sort);
        let field = document.getElementById("field").value;
        console.log(field);
        
        // let product_temp = products.sort((sort) ? 1 : (r1.value < r2.value) ? -1 : 0);
        let product_temp;
        switch(field) {
            case "name":
                if (sort == "desc")
                    product_temp = products.sort(
                        (p1, p2) => (p1.name < p2.name) ? 1 : (p1.name > p2.name) ? -1 : 0
                    );
                else 
                    product_temp = products.sort(
                        (p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0
                    );
                break;
            case "price":
                if (sort == "desc")
                    product_temp = products.sort(
                        (p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0
                    );
                else 
                    product_temp = products.sort(
                        (p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0
                    );
                break;
            default:
                if (sort == "desc")
                    product_temp = products.sort(
                        (p1, p2) => (p1.producer < p2.producer) ? 1 : (p1.producer > p2.producer) ? -1 : 0
                    );
                else 
                    product_temp = products.sort(
                        (p1, p2) => (p1.producer > p2.producer) ? 1 : (p1.producer < p2.producer) ? -1 : 0
                    );
        }
        document.getElementById("search_product").value = "";
        products = product_temp;
        show_product_html(products);
    })

    $('#search_product').keyup(function() {
        show_product.innerHTML = "";
        let searchText = $(this).val().toLowerCase();
        console.log(searchText);
        arr_search = []
        products.forEach( (element) => {
            // console.log(element)
            if(element.name.toLowerCase().includes(searchText)) {
                arr_search.push(element);
            }
        });
        // console.log(arr_search);
        show_product_html(arr_search);
    })

    let show_product = document.getElementById('show_product');
    let products = window.products;
    show_product_html(products);

    let categories = window.categories;
    let category_list = [];
    // console.log(categories);

    categories.forEach((element) => {
        if (element.parent_id != "None"){
            categories.forEach((element_parent) => {
                if (element_parent.id == element.parent_id){
                    element_parent.list.push(element)
                    return;
                }
            })
        }
    })
    categories.forEach((element) => {
        if (element.parent_id == "None"){
            category_list.push(element);
        }
    })
    // console.log(category_list);
    let show_categories = (category_list) => {
        let categories = document.getElementById('categories');
        str =
        "<li class='nav-item position-relative'>"
        +"    <a class='p-2 text-white not-decoration' type='button' href='/products/product_category/0'>"
        +"        <i class='fa-solid fa-house'></i>"
        +"        All"
        +"    </a>"
        +"</li>"
        
        for(let i=0; i<category_list.length; i++) {
            // console.log(category_list[i].list.length)
            str += 
            "<li class='nav-item position-relative'>"
            +"  <a class='p-2 text-white not-decoration text-capitalize' type='button' href="+category_list[i].url+">"
            +category_list[i].name
            +"  </a>"

            if(category_list[i].list.length >0) {
                // console.log(category_list[i].name)
                str +=
                "<div class='position-absolute top-100 start-0 bg-secondary categories_sub d-none' id='categories_child' style='z-index:1;'>"
                +"    <div class='d-flex'>"

                category_list[i].list.forEach((categories_lv1) =>{
                    // console.log(categories_lv1.name)
                    str +=
                    "<div class='border-end'>"
                    +"<a class='p-2 text-center text-white not-decoration w-100 text-capitalize' type='button' href="+categories_lv1.url+">"
                    +"    <strong>"+categories_lv1.name+"</strong>"
                    +"</a>"
                    
                    if(categories_lv1.list.length >0) {
                        categories_lv1.list.forEach((categories_lv2) => {
                            str +=
                            "<a class='p-2 text-center text-white not-decoration w-100 text-capitalize' type='button' href="+categories_lv2.url+">"
                            +categories_lv2.name
                            +"</a>"
                        })
                    }
                    str += "</div>"
                })
                    
            }
                str += "</div>"
                str += "</li>"
        }
        categories.innerHTML += str;
    }
    show_categories(category_list);


    $("#categories li").hover(function(){
        $(this).find("#categories_child").removeClass("d-none");
        }, function(){
            $(this).find("#categories_child").addClass("d-none");
    });
})