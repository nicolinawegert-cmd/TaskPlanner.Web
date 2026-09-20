const API_URL = 'http://localhost:5035/api/tasks'

export async function getTasks() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Could not fetch tasks')
  }

  return await response.json()
}

export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (!response.ok) {
    throw new Error('Could not create task')
  }

  return await response.json()
}

export async function updateTask(id, task) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  if (!response.ok) {
    throw new Error('Could not update task')
  }

  return await response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Could not delete task');
  }
}

export async function uploadTaskFile(id, file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/${id}/file`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Could not upload task file');
  }

  return await response.json();
}
