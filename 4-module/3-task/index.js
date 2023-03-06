function highlight(table) {

  for (let row of table.rows) {
    
    switch (row.cells[3].dataset.available) {
      case 'true':
        row.classList.add('available');
        break;
      case 'false':
        row.classList.add('unavailable');
        break;
      default:        
        if (row.parentNode.tagName === 'TBODY') {
          row.hidden = true;
        }
    }

    switch (row.cells[2].textContent) {
      case 'm':
        row.classList.add('male');
        break;
      case 'f':
        row.classList.add('female');
        break;
    }

    if (row.cells[1].textContent < 18) {
      row.style.textDecoration = 'line-through';
    }

  }
  
}
