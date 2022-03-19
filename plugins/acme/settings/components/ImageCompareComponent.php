<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\ImageCompare;

class ImageCompareComponent extends \Cms\Classes\ComponentBase
{
    public $comparies;

    public function componentDetails()
    {
        return [
            'name' => 'Фото до и после',
            'description' => 'Отобразить блок'
        ];
    }

    public function onRun()
    {
        $this->comparies = ImageCompare::where('is_active', 1)->orderBy('sort_order', 'asc')->get();
    }
}
