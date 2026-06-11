// LOGIN - Screen 1 to Screen 2/5
function login() {
  let id = document.getElementById('empId').value;
  let pass = document.getElementById('password').value;
  
  if(id == "" || pass == "") {
    document.getElementById('login-error').innerText = "Enter both fields";
    return;
  }
  
  document.getElementById('login-screen').style.display = 'none';
  
  if(id == "admin") {
    document.getElementById('admin-screen').style.display = 'block';
  } else {
    document.getElementById('welcome-text').innerText = "Welcome " + id;
    document.getElementById('dashboard-screen').style.display = 'block';
  }
}

// LOGOUT - Back to Screen 1
function logout() {
  document.querySelectorAll('.container').forEach(div => div.style.display = 'none');
  document.getElementById('login-screen').style.display = 'block';
  document.getElementById('login-error').innerText = "";
}

// NAVIGATION
function showApplyLeave() {
  document.getElementById('dashboard-screen').style.display = 'none';
  document.getElementById('apply-screen').style.display = 'block';
}

function showLeaveStatus() {
  document.getElementById('dashboard-screen').style.display = 'none';
  document.getElementById('status-screen').style.display = 'block';
  loadLeaveStatus(); // load table when opening
}

function backToDashboard() {
  document.querySelectorAll('.container').forEach(div => div.style.display = 'none');
  document.getElementById('dashboard-screen').style.display = 'block';
}

// STEP 6: SAVE LEAVE DATA
function submitLeave() {
  let name = document.getElementById('empName').value;
  let type = document.getElementById('leaveType').value;
  let from = document.getElementById('fromDate').value;
  let to = document.getElementById('toDate').value;
  let reason = document.getElementById('reason').value;
  
  if(name=="" || type=="" || from=="" || to=="" || reason=="") {
    alert("Fill all fields first");
    return;
  }
  
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  let newLeave = {
    id: Date.now(),
    name: name,
    type: type,
    from: from,
    to: to,
    reason: reason,
    status: "Pending"
  };
  leaves.push(newLeave);
  localStorage.setItem('leaves', JSON.stringify(leaves));
  
  alert("Leave Request Created successfully!");
  
  document.getElementById('empName').value = "";
  document.getElementById('leaveType').value = "";
  document.getElementById('fromDate').value = "";
  document.getElementById('toDate').value = "";
  document.getElementById('reason').value = "";
  
  backToDashboard();
}

function loadLeaveStatus() {
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  let table = document.getElementById('leaveTable');
  table.innerHTML = "<tr><th>Leave ID</th><th>From Date</th><th>To Date</th><th>Status</th></tr>";
  
  leaves.forEach(l => {
    table.innerHTML += `<tr><td>${l.id}</td><td>${l.from}</td><td>${l.to}</td><td>${l.status}</td></tr>`;
  });
}

// ADMIN BUTTONS
function viewRequests() {
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  let table = document.getElementById('leaveTable');
  table.innerHTML = '<tr><th>ID</th><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Status</th></tr>';
  
  leaves.forEach(l => {
    table.innerHTML += `<tr><td>${l.id}</td><td>${l.emp}</td><td>${l.type}</td><td>${l.from}</td><td>${l.to}</td><td>${l.status}</td></tr>`;
  });
}

function approveLeave() {
  let id = prompt("Enter Leave ID to Approve:");
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  leaves = leaves.map(l => l.id == id ? {...l, status: 'Approved'} : l);
  localStorage.setItem('leaves', JSON.stringify(leaves));
  alert("Leave Approved!");
  viewRequests();
}

function rejectLeave() {
  let id = prompt("Enter Leave ID to Reject:");
  let leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  leaves = leaves.map(l => l.id == id ? {...l, status: 'Rejected'} : l);
  localStorage.setItem('leaves', JSON.stringify(leaves));
  alert("Leave Rejected!");
  viewRequests();
}