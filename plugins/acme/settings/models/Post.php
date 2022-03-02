<?php namespace Acme\Settings\Models;

use Model;

/**
 * Model
 */
class Post extends Model
{
    use \October\Rain\Database\Traits\Validation;
    use \October\Rain\Database\Traits\Sortable;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'acme_settings_posts';

    protected $jsonable = ['tags'];

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    public $attachMany = [
      'images' => ['System\Models\File', 'delete' => true ]
    ];

    public function afterDelete() {
        foreach ($this->gallery as $image) {
            $image->delete();
        }
    }
}
