let items = JSON.parse(localStorage.getItem('items')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.getElementById('add-expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const itemSelect = document.getElementById('item-select').value;
    const amount = document.getElementById('expense-amount').value;

    const newExpense = { id: Date.now(), itemId: itemSelect, amount, approved: false };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateExpenseList();
});

function updateExpenseList() {
    const expenseList = document.getElementById('user-expense-list');
    expenseList.innerHTML = '';
    expenses.forEach(exp => {
        const li = document.createElement('li');
        const item = items.find(i => i.id === exp.itemId);
        li.textContent = `${item.name} - $${exp.amount} - ${exp.approved ? 'Approved' : 'Pending'}`;
        expenseList.appendChild(li);
    });
}

function populateItemSelect() {
    const itemSelect = document.getElementById('item-select');
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        itemSelect.appendChild(option);
    });
}

populateItemSelect();
updateExpenseList();
