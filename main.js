// Select form elements
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit');

// Select table and summary elements
const tableBody = document.querySelector('tbody');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const netIncome = document.getElementById('net-income');

// Initialize income and expense totals
let incomeTotal = 0;
let expenseTotal = 0;

// Add event listener to submit button
submitButton.addEventListener('click', addItem);

function addItem(event) {
	// Prevent form from submitting and page from reloading
	event.preventDefault();

	// Get form values
	const amount = amountInput.value;
	const date = dateInput.value;
	const category = categoryInput.value;

    // Validate input
	if (!amount || !date || !category) {
		alert('Please enter all fields.');
		return;
	}

	if (isNaN(amount) || amount <= 0) {
		alert('Please enter a valid amount.');
		return;
	}

	// Validate date
    const currentDate = new Date();
    const inputDate = new Date(date);
    if (inputDate > currentDate) {
        alert('Please enter a date that is not in the future.');
        return;
    }
    
	// Clear form inputs
	amountInput.value = '';
	dateInput.value = '';

	// Calculate net amount and update totals
	let netAmount;
	if (category === 'income') {
		netAmount = amount;
		incomeTotal += Number(amount);
	} else {
		netAmount = -amount;
		expenseTotal += Number(amount);
	}
	netIncome.textContent = incomeTotal - expenseTotal;
	totalIncome.textContent = incomeTotal;
	totalExpenses.textContent = expenseTotal;

	// Create new table row and cells
	const newRow = document.createElement('tr');
	const dateCell = document.createElement('td');
	const categoryCell = document.createElement('td');
	const amountCell = document.createElement('td');
	const deleteCell = document.createElement('td');
	const deleteButton = document.createElement('button');

	// Add content and attributes to cells and button
	dateCell.textContent = date;
	categoryCell.textContent = category;
	amountCell.textContent = amount;
	deleteButton.textContent = 'Delete';
	deleteButton.setAttribute('type', 'button');
	deleteButton.addEventListener('click', deleteItem);

	// Append cells and button to row
	deleteCell.appendChild(deleteButton);
	newRow.appendChild(dateCell);
	newRow.appendChild(categoryCell);
	newRow.appendChild(amountCell);
	newRow.appendChild(deleteCell);

	// Append row to table body
	tableBody.appendChild(newRow);
}

function deleteItem(event) {
	// Get row and amount
	const row = event.target.parentNode.parentNode;
	const amount = row.children[2].textContent;

	// Calculate net amount and update totals
	let netAmount;
	if (row.children[1].textContent === 'income') {
		netAmount = -amount;
		incomeTotal -= Number(amount);
	} else {
		netAmount = amount;
		expenseTotal -= Number(amount);
	}
	netIncome.textContent = incomeTotal - expenseTotal;
	totalIncome.textContent = incomeTotal;
	totalExpenses.textContent = expenseTotal;

	// Remove row from table body
	row.remove();
}

// Get the viewport width
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

// Check if the viewport width is less than 600px (i.e. a mobile device)
if (viewportWidth < 600) {
  // Modify the styles for the body element
  document.body.style.padding = "10px";

  // Modify the styles for the h1 element
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.fontSize = "36px";
    h1.style.marginBottom = "10px";
  }

  // Modify the styles for the form element
  const form = document.querySelector("form");
  if (form) {
    form.style.padding = "10px";
  }

  // Modify the styles for the label elements
  const labels = document.querySelectorAll("label");
  if (labels) {
    labels.forEach((label) => {
      label.style.fontSize = "16px";
      label.style.marginBottom = "5px";
    });
  }
}
