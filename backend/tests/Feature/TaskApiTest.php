<?php


namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the registration process.
     *
     * @return void
     */
    public function test_register()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure(['message', 'user' => ['id', 'name', 'email']]);
    }

    /**
     * Test the login process and obtain an access token.
     *
     * @return void
     */
    public function test_login()
    {
        $user = User::factory()->create([
            'email' => 'testuser@example.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'access_token',
                'token_type',
                'user' => ['id', 'name', 'email'],
            ]);
    }

    /**
     * Test creating a new task.
     *
     * @return void
     */
    public function test_create_task()
    {

        $user = User::factory()->create();
        $token = $user->createToken('Test-Token')->plainTextToken;

        $response = $this->postJson('/api/tasks', [
            'title' => 'New Task',
            'description' => 'Task description here',
        ], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Task created successfully.',
                'task' => [
                    'title' => 'New Task',
                    'description' => 'Task description here',
                ],
            ]);
    }

    /**
     * Test fetching all tasks.
     *
     * @return void
     */
    public function test_get_tasks()
    {
        $user = User::factory()->create();
        $token = $user->createToken('Test-Token')->plainTextToken;


        Task::create([
            'title' => 'Test Task',
            'description' => 'This is a test task.',
            'user_id' => $user->id,
        ]);

        $response = $this->getJson('/api/tasks', [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['tasks']);
    }

    /**
     * Test updating a task.
     *
     * @return void
     */
    public function test_update_task()
    {
        $user = User::factory()->create();
        $task = Task::create([
            'title' => 'Old Title',
            'description' => 'Old description',
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('Test-Token')->plainTextToken;

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated description',
        ], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Task updated successfully.',
                'task' => [
                    'title' => 'Updated Title',
                    'description' => 'Updated description',
                ],
            ]);
    }

    /**
     * Test deleting a task.
     *
     * @return void
     */
    public function test_delete_task()
    {
        $user = User::factory()->create();
        $task = Task::create([
            'title' => 'Task to delete',
            'description' => 'This task will be deleted',
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('Test-Token')->plainTextToken;

        $response = $this->deleteJson("/api/tasks/{$task->id}", [], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Task deleted successfully.']);
    }

    /**
     * Test marking a task as completed.
     *
     * @return void
     */
    public function test_complete_task()
    {
        $user = User::factory()->create();
        $task = Task::create([
            'title' => 'Incomplete Task',
            'description' => 'This task will be marked as completed',
            'user_id' => $user->id,
        ]);

        $token = $user->createToken('Test-Token')->plainTextToken;

        $response = $this->patchJson("/api/tasks/{$task->id}/complete", [], [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Task marked as completed.',
                'task' => [
                    'status' => 'completed',
                ],
            ]);
    }
}
