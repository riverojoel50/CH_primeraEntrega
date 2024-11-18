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
    if(idCart != "0")
        window.location.href = `/cart/${idCart}`
}


async function eliminarProducto(pid, cid){
    const itemToRemove = document.getElementById(pid);
    if (itemToRemove) {
        itemToRemove.remove();
    }

    let response = await fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });


}

function redirectToProduct(pid){
    console.log("idredirect product" + pid)
    window.location.href = `/product/${pid}`
}

async function eliminarTodos(cid) {
    console.log(cid) 

    let response = await fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });


    window.location.reload();
}