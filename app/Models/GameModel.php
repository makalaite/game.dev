<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameModel extends Model
{
    protected $table = 'kb_game';

    protected $fillable = ['id', 'name', 'score', 'duration', 'average_speed', 'level'];

}
