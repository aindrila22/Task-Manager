<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function getTasks(Request $request)
    {
        $user = $request->user(); // Get authenticated user

       // $tasks = $user->tasks; // Assuming a relationship between User and Task
        $tasks = $user->tasks()->orderBy('created_at', 'desc')->get();
        return response()->json([
            'tasks' => $tasks,
        ], 200);
    }
    public function createTask(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $user = $request->user(); // Get authenticated user

        $task = $user->tasks()->create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
        ]);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
        ], 201);
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // Check if the task belongs to the authenticated user
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized to update this task.',
            ], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task->update($validatedData);

        return response()->json([
            'message' => 'Task updated successfully.',
            'task' => $task,
        ], 200);
    }
    public function deleteTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // Check if the task belongs to the authenticated user
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized to delete this task.',
            ], 403);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully.',
        ], 200);
    }
    public function completeTask(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // Check if the task belongs to the authenticated user
        if ($task->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized to complete this task.',
            ], 403);
        }

        $task->update(['status' => 'completed']); // Assuming there's a 'status' field

        return response()->json([
            'message' => 'Task marked as completed.',
            'task' => $task,
        ], 200);
    }
}
