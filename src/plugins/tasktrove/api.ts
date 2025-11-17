import { TasktroveConfig, TasktroveTask, TasktroveApiResponse, TasktroveTaskRaw, TasktroveLabel, TasktroveProject, TasktroveLabelsResponse, TasktroveProjectsResponse } from './types';

const REQUEST_TIMEOUT_SECS = 30000; // 30 seconds in milliseconds

function processTask(rawTask: TasktroveTaskRaw): TasktroveTask {
  const subtasks = rawTask.subtasks || [];
  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const totalSubtasks = subtasks.length;
  
  const commentsCount = rawTask.comments?.length || 0;

  return {
    id: rawTask.id,
    title: rawTask.title,
    completed: rawTask.completed,
    dueDate: rawTask.dueDate || null,
    priority: rawTask.priority || null,
    subtasks: {
      completed: completedSubtasks,
      total: totalSubtasks,
    },
    commentsCount,
    labelIds: rawTask.labels || [],
    projectId: rawTask.projectId || null,
  };
}

export async function fetchTasktroveTasks(
  config: TasktroveConfig
): Promise<TasktroveTask[]> {
  const url = `${config.apiEndpoint}/tasks`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECS),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (errorData.error || errorData.message) {
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data: TasktroveApiResponse = await response.json();

  // Process the tasks from the API response
  if (data && Array.isArray(data.tasks)) {
    return data.tasks.map(processTask);
  }

  throw new Error('Invalid response format: expected a tasks array');
}

export async function fetchTasktroveLabels(
  config: TasktroveConfig
): Promise<TasktroveLabel[]> {
  const url = `${config.apiEndpoint}/labels`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECS),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (errorData.error || errorData.message) {
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data: TasktroveLabelsResponse = await response.json();

  if (data && Array.isArray(data.labels)) {
    return data.labels;
  }

  throw new Error('Invalid response format: expected a labels array');
}

export async function fetchTasktroveProjects(
  config: TasktroveConfig
): Promise<TasktroveProject[]> {
  const url = `${config.apiEndpoint}/projects`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECS),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (errorData.error || errorData.message) {
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data: TasktroveProjectsResponse = await response.json();

  if (data && Array.isArray(data.projects)) {
    return data.projects;
  }

  throw new Error('Invalid response format: expected a projects array');
}

export async function updateTasktroveTask(
  config: TasktroveConfig,
  taskId: string,
  updates: Partial<TasktroveTaskRaw>
): Promise<TasktroveTaskRaw> {
  const url = `${config.apiEndpoint}/tasks`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: taskId,
      ...updates,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECS),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (errorData.error || errorData.message) {
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
    }

    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data: TasktroveTaskRaw = await response.json();
  return data;
}

