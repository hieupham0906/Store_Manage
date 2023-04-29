let left_button = (product_id) => {
    let input = document.getElementById('number'+product_id)
    let value = input.getAttribute("value");
    let right_button = document.getElementById("right_button"+product_id);
    let left_button = document.getElementById("left_button"+product_id);
    right_button.classList.remove("not-allowed");
    value = parseInt(value)
    value <= 1 ? value=1 : value --;
    value == 1 ? left_button.classList.add("not-allowed") : 0;
    input.setAttribute("value", value);
}
let right_button = (product_id) => {
    let input = document.getElementById('number'+product_id)
    let max_value = input.getAttribute("max-value");
    let value = input.getAttribute("value");
    let right_button = document.getElementById("right_button"+product_id);
    let left_button = document.getElementById("left_button"+product_id);
    left_button.classList.remove("not-allowed");
    value = parseInt(value)
    value < max_value ? value++ : 0;
    value == max_value ? right_button.classList.add("not-allowed") : 0;
    input.setAttribute("value", value);
}

let order_view = (check_login, url_action) => {
    if (check_login == 0)
        window.location.href = "/accounts/login";
    let checkboxes = document.querySelectorAll('input[name="select_product"]:checked');
    let values = [];
    let error_value_id = [];
    let fail_value_id = [];
    checkboxes.forEach((checkbox) => {
        number = checkbox.getAttribute("number");
        max_number = checkbox.getAttribute("max-number");
        if(checkbox.getAttribute("number") == 0) {
            error_value_id.push(checkbox.value);
        } else if(number > max_number) {
            fail_value_id.push(checkbox.value);
        } else {
            values.push(checkbox.value);
        }
    });
    console.log(values)
    console.log(error_value_id)
    array_data = []
    values.forEach((values) => {
        let number = document.getElementById('number'+values)
        array_data.push({
            'cart_product_id': values,
            'number': number.value 
        })
    });
    
    if (error_value_id.length <= 0 && fail_value_id.length <= 0) {
        var payload = JSON.stringify(array_data);
        console.log(payload)
        $.ajax({
            url : url_action,
            type: "POST",
            data : payload,
            dataType : "json",
        }).done(function(data){
            console.log(data);
            window.location.href = "order_view_temp" ;
        });
    } else {
        let str = ""
        if(error_value_id.length > 0) {
            let temp = "";
            error_value_id.forEach((values) => {
                temp += String(values) + ",";
            });
            str += "This product " + temp +"is sold out!!!";
        }
        if(fail_value_id.length > 0) {
            let temp = "";
            error_value_id.forEach((values) => {
                temp += String(values) + ",";
            });
            str += "\nThis product " + temp +"is fail number!!!";
        }
        alert(str);
    }
}