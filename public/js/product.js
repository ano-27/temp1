document.addEventListener('DOMContentLoaded', function() {
    console.log('= dom contents loaded =');
    fetchHistories();

    const tbody = document.querySelector('.product-table tbody');
    tbody.addEventListener('click', function(e) {
        if (e.target.classList.contains('product-details-btn')) {
            const productId = e.target.getAttribute('data-id');
            fetchproductDetails(productId);
        } else if (e.target.classList.contains('product-download-btn')){
            const productId = e.target.getAttribute('data-id');
            downloadBill(productId);
        }
    })
});

async function fetchHistories() {
    try {
        const response = await fetch('/api/transaction-product', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log('== fetchHistories() data ==\n', data);
        if (data.success) {
            updateproductTable(data.payments);
        }
    } catch (e) {
        console.log(e);
    }
}

async function updateproductTable(items) {
    const tbody = document.querySelector('.product-table tbody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const itemRow = document.createElement('tr');
        itemRow.className = 'product-row';
        itemRow.innerHTML = `
            <td>${item?.order_id}</td>
            <td>${item?.amount}</td>
            <td>${item?.status}</td>
            <td>
                <button class = "product-details-btn btn" data-id = "${item?.id}"> View Details </button>
            </td>
        `;
        //      <button class = "product-download-btn" data-id = "${item?.id}"> Download Bill </button>
        //  </td>
        // `;
        tbody.append(itemRow);
    });
}

async function fetchproductDetails(productId) {
    window.location.href = `/product/${productId}`;
    // try {
    //     const response = await fetch(`/api/transaction/${productId}`, {
    //         method: 'GET',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const data = await response.json();
    //     if (data.success) {
    //         updateproductDetailsTable(productId, data);
    //     }
    // } catch (e) {
    //     console.log(e);
    // }
}

// async function updateproductDetailsTable(productId, data) {
//     res.render('pages/product-detail.handlebars', {
//         layout: 'main.handlebars',
//         product_id: productId,
//         data: data
//     });
// }

async function downloadBill(productId) {
    //
}