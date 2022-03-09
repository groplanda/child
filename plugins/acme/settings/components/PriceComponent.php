<?php namespace Acme\Settings\Components;

use Cms\Classes\ComponentBase;
use Acme\Settings\Models\Price;

class PriceComponent extends ComponentBase
{
    public $price;

    public function componentDetails()
    {
        return [
            'name'          => 'Блок с ценами',
            'description'   => 'Добавить блок с ценами'
        ];
    }

    public function defineProperties()
    {
        return [
            'priceName' => [
                'title'             => 'Выберите раздел',
                'type'              => 'dropdown',
                'default'           => 'us'
            ]
        ];

    }


    public function getPriceNameOptions()
    {
        return Price::all()->lists('title', 'id');
    }

    public function onRun()
    {
        $model = new Price;
        $this->price = $model->where( 'id', '=', $this->property('priceName') )->first();
    }


}
