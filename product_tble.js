function updateStock(input) {
    const row = input.closest('tr');
    const stock = parseInt(row.querySelector('.stock').textContent);
    const sold = parseInt(input.value);
    const remainingCell = row.querySelector('.remaining');
    const remaining = Math.max(stock - sold, 0);
    remainingCell.textContent = remaining;
  }
