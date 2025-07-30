<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ) {}

    /**
     * Liste des tâches de l'utilisateur connecté
     */
    public function index(): JsonResponse
    {
        $tasks = $this->taskService->getUserTasks(auth()->id());

        return response()->json([
            'success' => true,
            'tasks' => $tasks
        ]);
    }

    /**
     * Créer une nouvelle tâche
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreurs de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $task = $this->taskService->createTask(
            $request->all(),
            auth()->id()
        );

        return response()->json([
            'success' => true,
            'message' => 'Tâche créée avec succès',
            'task' => $task
        ], 201);
    }

    /**
     * Afficher une tâche spécifique
     */
    public function show(int $id): JsonResponse
    {
        $task = $this->taskService->getTaskById($id, auth()->id());

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Tâche non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'task' => $task
        ]);
    }

    /**
     * Mettre à jour une tâche
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $task = $this->taskService->getTaskById($id, auth()->id());

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Tâche non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreurs de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $updatedTask = $this->taskService->updateTask($task, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Tâche mise à jour avec succès',
            'task' => $updatedTask
        ]);
    }

    /**
     * Supprimer une tâche
     */
    public function destroy(int $id): JsonResponse
    {
        $task = $this->taskService->getTaskById($id, auth()->id());

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Tâche non trouvée'
            ], 404);
        }

        $this->taskService->deleteTask($task);

        return response()->json([
            'success' => true,
            'message' => 'Tâche supprimée avec succès'
        ]);
    }
}
