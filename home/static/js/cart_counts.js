let get_element = document.getElementById('cart_count');
console.log(get_element.getAttribute('cart-count'));
let textNode = document.createTextNode(get_element.getAttribute('cart-count'));

let div = document.createElement('div')
div.setAttribute('class','position-absolute cart_count translate-middle')
let shape = document.createElement('div')
shape.setAttribute('class','bg-secondary shape-count')
let span = document.createElement('span')
span.setAttribute('class',' ')

span.appendChild(textNode);
shape.appendChild(span)

div.appendChild(shape)
get_element.appendChild(div);


