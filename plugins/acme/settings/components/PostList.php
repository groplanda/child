<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\Post;

class PostList extends \Cms\Classes\ComponentBase
{
    public $feedbacks;

    public function componentDetails()
    {
        return [
            'name' => 'Список новостей',
            'description' => 'Отобразить новости'
        ];
    }

    public function defineProperties()
    {
        return [
            'postType' => [
                'title'             => 'Внешний вид',
                'type'              => 'dropdown',
                'default'           => 'list',
                'placeholder'       => 'Выберите тип',
                'options'           => ['default' => 'Главная', 'page' => 'Страница']

            ]
        ];
    }

    public function prepareVars()
    {
      $type = $this->property('postType');
      if ($type == "page") {
        $query = Post::select('id','name','description','is_published','sort_order', 'poster', 'date')->where('is_published', 1)->orderBy('sort_order', 'asc')->get();
      } else {
        $query = Post::select('id','name','description','is_published','sort_order')->where('is_published', 1)->orderBy('sort_order', 'asc')->take(2)->get();
      }
      return $query;
    }

    public function onRun()
    {
      $this->page['posts'] = $this->prepareVars();
    }

    public function onRender()
    {
      $view = $this->property('postType');
      if($view == 'page') {
          return $this->renderPartial('@_page.htm');
      }
    }
}