<?php namespace Acme\Settings\Components;

use Cms\Classes\ComponentBase;
use Acme\Settings\Models\Slider;
use Response;

class SliderComponent extends ComponentBase
{
    public $promo;

    public function componentDetails()
    {
        return [
            'name'          => 'Блок промо',
            'description'   => 'Добавить промо'
        ];
    }

    public function defineProperties()
    {
        return [
            'promoName' => [
                'title'             => 'Выберите баннер',
                'type'              => 'dropdown',
                'default'           => 'us'
            ],
        ];

    }


    public function getPromoNameOptions()
    {
        return Slider::all()->lists('title', 'id');
    }

    public function onRun()
    {
        $this->promo = Slider::where( 'id', '=', $this->property('promoName') )->first();
    }


}
