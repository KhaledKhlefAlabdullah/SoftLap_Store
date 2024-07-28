<?php
namespace App\Models;

class Globale
{
    /**
     * Get user poles
     * @param $user object of user who want to get his roles
     * @return array of roles
     */
    public function get_user_Roles($roles_ob){

        // Def array to store roles
        $roles=[];

        // Get role permesstion from role object
        foreach ($roles_ob as $role){
            array_push($roles,$role->role);
        }

        return $roles;
    }
}
