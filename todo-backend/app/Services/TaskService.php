<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\TaskRepositoryInterface;
use App\Events\TaskCreated;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function __construct(
        private TaskRepositoryInterface $taskRepository
    ) {}

    public function getUserTasks(int $userId): Collection
    {
        return $this->taskRepository->getAllByUser($userId);
    }

    public function getTaskById(int $id, int $userId): ?Task
    {
        return $this->taskRepository->findByIdAndUser($id, $userId);
    }

    public function createTask(array $data, int $userId): Task
    {
        $data['user_id'] = $userId;
        $task = $this->taskRepository->create($data);
        
        // Déclencher l'événement
        event(new TaskCreated($task));
        
        return $task;
    }

    public function updateTask(Task $task, array $data): Task
    {
        return $this->taskRepository->update($task, $data);
    }

    public function deleteTask(Task $task): bool
    {
        return $this->taskRepository->delete($task);
    }
}