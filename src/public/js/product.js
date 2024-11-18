const productList=document.getElementById("productList")

let idCart ="0";

function eliminarProducto(id) {
    console.log("asdasdasdasd")
}


const addToCart = async (pid) => {
    const quantityInput = document.getElementById(`quantity-${pid}`);
    const quantity = parseInt(quantityInput.value, 10);
    
    let response 
    
    if(idCart != "0"){
        response = await fetch(`/api/carts/${idCart}/product/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });
    }
    else {
        response = await fetch(`/api/carts/${idCart}/product/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });
    }
        
    if (response.ok) {
        const data = await response.json();
        idCart = data.newCart._id
    } else {
        console.error('Error al actualizar el carrito:', response.statusText);
    }

    console.log("pid: " + pid)
    console.log(idCart)
};


function redirectToCart() {
    console.log("redirectCArt")
    if(idCart != "0")
        window.location.href = `/cart/cid=${idCart}`
}