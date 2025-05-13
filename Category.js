const form = document.getElementById('productForm');
const tableBody = document.querySelector('#productTable tbody');

// Αποστολή παραγγελίας
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(form);
  const product = {
    storeNumber: data.get('storeNumber'),
    name: data.get('name'),
    code: data.get('code'),
    category: data.get('category'),
    quantity: data.get('quantity'),
    fromDate: data.get('fromDate'),
    toDate: data.get('toDate'),
  };

  fetch('save_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Η παραγγελία αποθηκεύτηκε!');
      renderProduct(product); // Προσθήκη στον πίνακα απευθείας
      form.reset();
    } else {
      alert('Αποτυχία αποθήκευσης');
    }
  })
  .catch(err => {
    console.error('Σφάλμα:', err);
    alert('Σφάλμα αποστολής');
  });
});

// Προσθήκη προϊόντος στον πίνακα
function renderProduct(product) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${product.storeNumber}</td>
    <td>${product.name}</td>
    <td>${product.code}</td>
    <td>${product.category}</td>
    <td>${product.quantity}</td>
    <td>${product.fromDate} - ${product.toDate}</td>
  `;
  tableBody.appendChild(row);
}

// Φόρτωση υπαρχόντων παραγγελιών
window.addEventListener('DOMContentLoaded', () => {
  fetch('get_orders.php')
    .then(res => res.json())
    .then(data => {
      data.forEach(product => renderProduct(product));
    })
    .catch(err => console.error('Σφάλμα κατά την ανάκτηση παραγγελιών:', err));
});


function fetchFilteredOrders(category) {
  const params = new URLSearchParams({
    category: category, // π.χ. "Ζυμαρικά"
    storeNumber: 1,     // προαιρετικά
    fromDate: '2024-01-01',
    toDate: '2024-12-31'
  });

  fetch('get_orders.php?' + params.toString())
    .then(res => res.json())
    .then(data => {
      displayTable(data);
    });
}

function displayTable(data) {
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Κατάστημα</th><th>Όνομα</th><th>Κωδικός</th>
        <th>Κατηγορία</th><th>Ποσότητα</th><th>Ημερομηνίες</th>
      </tr>
    </thead>
    <tbody>
      ${data.map(item => `
        <tr>
          <td>${item.store_number}</td>
          <td>${item.name}</td>
          <td>${item.code}</td>
          <td>${item.category}</td>
          <td>${item.quantity}</td>
          <td>${item.from_date} - ${item.to_date}</td>
        </tr>`).join('')}
    </tbody>
  `;
  document.body.innerHTML = '';
  document.body.appendChild(table);

  const printBtn = document.createElement('button');
  printBtn.innerText = 'Εκτύπωση';
  printBtn.onclick = () => window.print();
  document.body.appendChild(printBtn);
}
