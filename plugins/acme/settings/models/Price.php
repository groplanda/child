<?php namespace Acme\Settings\Models;

use Model;

/**
 * Model
 */
class Price extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;
    use \October\Rain\Database\Traits\SimpleTree;


    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_settings_prices';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    protected $jsonable = ['list'];
}

