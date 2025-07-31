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
        
        // Déclencher l'événement avec gestion d'erreur
        try {
            event(new TaskCreated($task));
        } catch (\Exception $e) {
            // Log l'erreur mais ne pas interrompre la création de la tâche
            \Log::error('Erreur de broadcasting:', [
                'message' => $e->getMessage(),
                'task_id' => $task->id
            ]);
        }
        
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