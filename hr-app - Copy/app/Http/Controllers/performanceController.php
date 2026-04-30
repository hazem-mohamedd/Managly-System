<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class PerformanceController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month', Carbon::now()->month);
        $year = $request->query('year', Carbon::now()->year);
        $now = Carbon::now();

        $user = $request->user();

        $query = User::with('department');

        // إذا كان المستخدم Supervisor، نجلب فقط موظفي قسمه
        if ($user->role === 'supervisor') {
            $query->where('department_id', $user->department_id);
        }

        $users = $query->withCount([
            // 1. المهام المكتملة
            'tasks as completed_tasks_count' => function ($query) use ($month, $year) {
                $query->whereMonth('due_date', $month)
                      ->whereYear('due_date', $year)
                      ->where('status', 'completed');
            },
            // 2. المهام المطلوبة (المكتملة + المتأخرة)
            'tasks as required_tasks_count' => function ($query) use ($month, $year, $now) {
                $query->whereMonth('due_date', $month)
                      ->whereYear('due_date', $year)
                      ->where(function ($q) use ($now) {
                          $q->where('status', 'completed')
                            ->orWhere('due_date', '<', $now);
                      });
            },
            // 3. إجمالي أيام التسجيل
            'attendances as total_attendance_count' => function ($query) use ($month, $year) {
                $query->whereMonth('date', $month)
                      ->whereYear('date', $year);
            },
            
            'attendances as present_days_count' => function ($query) use ($month, $year) {
                $query->whereMonth('date', $month)
                      ->whereYear('date', $year)
                      ->whereIn('status', ['present', 'late']); 
            },
        ])->get();

        $performances = $users->map(function ($user) {
            // سكور المهام
            $taskScore = $user->required_tasks_count > 0 
                ? ($user->completed_tasks_count / $user->required_tasks_count) * 100 
                : 100;

            // سكور الحضور
            $attendanceScore = $user->total_attendance_count > 0 
                ? ($user->present_days_count / $user->total_attendance_count) * 100 
                : 0;

            $finalScore = ($taskScore + $attendanceScore) / 2;

            return [
                'user_id' => $user->user_id,
                'name'    => $user->first_name . ' ' . $user->last_name, 
                // إضافة اسم القسم هنا (تأكد أن العلاقة في موديل User اسمها department)
                'department_name' => $user->department->dep_name ?? 'N/A',
                'stats' => [
                    'completed_tasks' => (int)$user->completed_tasks_count,
                    'overdue_tasks'   => $user->required_tasks_count - $user->completed_tasks_count,
                    'present_days'    => (int)$user->present_days_count,
                    'absent_days'     => $user->total_attendance_count - $user->present_days_count,
                ],
                'scores' => [
                    'task_performance' => round($taskScore, 1) . '%',
                    'attendance_performance' => round($attendanceScore, 1) . '%',
                    'final_score' => round($finalScore, 1),
                ],
                'rating' => $this->getRatingLabel($finalScore)
            ];
        });

        return response()->json([
            'status' => 'success',
            'month'  => $month,
            'year'   => $year,
            'data'   => $performances
        ]);
    }

    private function getRatingLabel($score)
    {
        if ($score >= 90) return 'Excellent';
        if ($score >= 80) return 'Good';
        if ($score >= 60) return 'Average';
        return 'Needs Improvement';
    }
}