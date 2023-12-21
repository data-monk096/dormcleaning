let taskList = [];

function addPersonAndTask() {
  const personSelect = document.getElementById('personName');
  const selectedPersonIndex = personSelect.selectedIndex;

  if (selectedPersonIndex === -1) {
    alert('Please select a person.');
    return;
  }

  const personName = personSelect.options[selectedPersonIndex].value;
  const taskSelect = document.getElementById('taskName');
  const selectedTaskIndex = taskSelect.selectedIndex;

  if (selectedTaskIndex === -1) {
    alert('Please select a task.');
    return;
  }

  const taskName = taskSelect.options[selectedTaskIndex].value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  if (personName && taskName && startDate && endDate) {
    taskList.push({
      personName,
      taskName,
      startDate,
      endDate
    });

    // Remove the selected task and person from the dropdown lists
    taskSelect.remove(selectedTaskIndex);
    personSelect.remove(selectedPersonIndex);

    // Reset the selections to the default options (if available)
    if (taskSelect.length > 0) {
      taskSelect.selectedIndex = 0;
    }
    if (personSelect.length > 0) {
      personSelect.selectedIndex = 0;
    }

    displayTaskList();
  } else {
    alert('Please fill in all the fields.');
  }
}

function deleteTask(task) {
  const index = taskList.indexOf(task);

  if (index !== -1) {
    // Get the select elements
    const taskSelect = document.getElementById('taskName');
    const personSelect = document.getElementById('personName');

    // Create new option elements
    const newTaskOption = document.createElement('option');
    newTaskOption.value = task.taskName;
    newTaskOption.text = task.taskName;

    const newPersonOption = document.createElement('option');
    newPersonOption.value = task.personName;
    newPersonOption.text = task.personName;

    // Add the new options back to the select elements
    taskSelect.add(newTaskOption);
    personSelect.add(newPersonOption);

    // Remove the task from the taskList
    taskList.splice(index, 1);

    displayTaskList(); // Update the displayed task list after deletion
  }
}

function displayTaskList() {
  const tbody = document.querySelector('#taskTable tbody');
  tbody.innerHTML = '';

  taskList.forEach(task => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = task.personName;
    row.insertCell(1).textContent = task.taskName;
    row.insertCell(2).textContent = task.startDate;
    row.insertCell(3).textContent = task.endDate;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
      deleteTask(task);
    };
    row.insertCell(4).appendChild(deleteButton);
  });

}

function downloadTaskList() {
  const table = document.getElementById('taskTable');
  const columnsToInclude = [0, 1, 2, 3];
  const ws = XLSX.utils.aoa_to_sheet(
    Array.from(table.rows).map(row =>
      columnsToInclude.map(index => row.cells[index].textContent)
    )
  );

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  wb.SheetNames.push('Sheet 1');
  wb.Sheets['Sheet 1'] = ws;

  // Convert the workbook to a binary Excel file
  const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' });

  // Convert the binary Excel data to a Blob
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

  // Save the Blob as an Excel file using FileSaver.js
  saveAs(blob, 'taskList.xlsx');
}

// Helper function to convert string to ArrayBuffer
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}


function addExtraPerson() {
  const personSelect = document.getElementById('personName');
  const extraPersonInput = document.createElement('input');
  extraPersonInput.type = 'text';
  extraPersonInput.className = 'extra-person-input';
  document.getElementById('extraPersonsContainer').appendChild(extraPersonInput);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Person'; // Changed button text to 'Add Person'
  document.getElementById('extraPersonsContainer').appendChild(addButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  document.getElementById('extraPersonsContainer').appendChild(cancelButton);

  addButton.addEventListener('click', function () {
    const trimmedValue = extraPersonInput.value.trim();
    if (trimmedValue !== "") {
      const newOption = document.createElement('option');
      newOption.value = trimmedValue;
      newOption.text = trimmedValue;
      personSelect.add(newOption);
      extraPersonInput.value = ""; // Clear the input field after adding to the dropdown

      // Remove the input elements and buttons
      extraPersonInput.remove();
      addButton.remove();
      cancelButton.remove();
    }
  });

  cancelButton.addEventListener('click', function () {
    // Remove the input elements and buttons without adding the new option
    extraPersonInput.remove();
    addButton.remove();
    cancelButton.remove();
  });
}

function addExtraTask() {
  const taskSelect = document.getElementById('taskName');
  const extraTaskInput = document.createElement('input');
  extraTaskInput.type = 'text';
  extraTaskInput.className = 'extra-task-input';
  document.getElementById('extraTaskContainer').appendChild(extraTaskInput);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add New Task';
  document.getElementById('extraTaskContainer').appendChild(addButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  document.getElementById('extraTaskContainer').appendChild(cancelButton);

  addButton.addEventListener('click', function () {
    const trimmedValue = extraTaskInput.value.trim();
    if (trimmedValue !== "") {
      const newOption = document.createElement('option');
      newOption.value = trimmedValue;
      newOption.text = trimmedValue;
      taskSelect.add(newOption);
      extraTaskInput.value = ""; // Clear the input field after adding to the dropdown

      // Remove the input elements and buttons
      extraTaskInput.remove();
      addButton.remove();
      cancelButton.remove();
    }
  });

  cancelButton.addEventListener('click', function () {
    // Remove the input elements and buttons without adding the new option
    extraTaskInput.remove();
    addButton.remove();
    cancelButton.remove();
  });
}



