document.getElementById("billForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const registerNo = document.getElementById("registerNo").value;
    const studentName = document.getElementById("studentName").value;
    const department = document.getElementById("department").value;
    const billType = document.getElementById("billType").value;
    const billAmount = document.getElementById("billAmount").value;
    const billDate = document.getElementById("billDate").value;

    if (registerNo && studentName && department && billAmount && billDate) {
        const bill = {
            registerNo: registerNo,
            studentName: studentName,
            department: department,
            billType: billType,
            billAmount: billAmount,
            billDate: billDate,
            lastUpdated: new Date().toLocaleString()
        };

        let bills = JSON.parse(localStorage.getItem("bills")) || [];
        bills.push(bill);
        localStorage.setItem("bills", JSON.stringify(bills));

        document.getElementById("billForm").reset();
        displayBills();
    }
});

function displayBills() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    const tableBody = document.getElementById("billsTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = '';

    bills.forEach((bill, index) => {
        const newRow = tableBody.insertRow();

        newRow.insertCell(0).textContent = bill.registerNo;
        newRow.insertCell(1).textContent = bill.studentName;
        newRow.insertCell(2).textContent = bill.department;
        newRow.insertCell(3).textContent = bill.billType.charAt(0).toUpperCase() + bill.billType.slice(1);
        newRow.insertCell(4).textContent = "₹" + bill.billAmount;
        newRow.insertCell(5).textContent = bill.billDate;
        newRow.insertCell(6).textContent = bill.lastUpdated;
        
        const actionCell = newRow.insertCell(7);

        // Print button for each bill
        const printButton = document.createElement("button");
        printButton.textContent = "Print";
        printButton.classList.add("print-btn");
        printButton.onclick = function() {
            printSingleBill(bill);
        };
        actionCell.appendChild(printButton);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = function() {
            deleteBill(index);
        };
        actionCell.appendChild(deleteButton);
    });
}

function deleteBill(index) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.splice(index, 1);
    localStorage.setItem("bills", JSON.stringify(bills));
    displayBills();
}

// Function to print a single bill
function printSingleBill(bill) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
    
            <title>Bill Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                .bill-container { border: 2px solid black; padding: 20px; display: inline-block; text-align: left; }
                h2 { color: #007bff; }
                .college-name { font-size: 20px; font-weight: bold; color: #ff5733; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { padding: 10px; text-align: left; border: 1px solid #000; }
                th { background-color: #007bff; color: white; }
            </style>
        </head>
        <body>
            <div class="bill-container">
            <center>
             <img src="download.jpeg" alt="College Logo" class="logo">
             <div class="college-name">A.V.V.M. Sri Pushpam College</div>
             <center>
                
                
                <h2>Bill Receipt</h2>
                <table>
                    <tr><th>Register No</th><td>${bill.registerNo}</td></tr>
                    <tr><th>Student Name</th><td>${bill.studentName}</td></tr>
                    <tr><th>Department</th><td>${bill.department}</td></tr>
                    <tr><th>Bill Type</th><td>${bill.billType}</td></tr>
                    <tr><th>Amount</th><td>₹${bill.billAmount}</td></tr>
                    <tr><th>Date</th><td>${bill.billDate}</td></tr>
                    <tr><th>Last Updated</th><td>${bill.lastUpdated}</td></tr>
                </table>
            </div>
            <script>window.print();</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

window.onload = function() {
    displayBills();
};

// **Bill History Page Script**
function displayBillHistory() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    const tableBody = document.getElementById("historyTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = '';

    bills.forEach((bill) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = bill.registerNo;
        newRow.insertCell(1).textContent = bill.studentName;
        newRow.insertCell(2).textContent = bill.department;
        newRow.insertCell(3).textContent = bill.billType;
        newRow.insertCell(4).textContent = "₹" + bill.billAmount;
        newRow.insertCell(5).textContent = bill.billDate;
        newRow.insertCell(6).textContent = bill.lastUpdated;
    });
}

function printBillHistory() {
    window.print();
}

if (document.getElementById("historyTable")) {
    displayBillHistory();
}
