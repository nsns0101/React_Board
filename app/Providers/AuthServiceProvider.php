<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->registerPolicies();

        //관리자 권한   app\User참고
        Gate::before(function ($user) {
            if ($user->isAdmin()) return true;
        });

        //게시글 삭제 권한
        Gate::define('board_delete', function ($user, $model) {
            \Log::info($user->id === $model->user_id);
            return $user->id === $model->user_id;
        });
    }
}
