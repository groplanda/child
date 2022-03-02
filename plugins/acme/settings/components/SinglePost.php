<?php namespace Acme\Settings\Components;

use Acme\Settings\Models\Post;

class SinglePost extends \Cms\Classes\ComponentBase
{
    public $feedbacks;

    public function componentDetails()
    {
        return [
            'name' => 'Одиночная новость',
            'description' => 'Отобразить новость'
        ];
    }


    public function onRun()
    {
      $id = $this->param('id');
      $post = Post::with(['images'])->where('is_published', 1)->where('id', $id)->first();

      if($post == null) {
        return \Response::make($this->controller->run('404'), 404);
      }

      $this->page['post'] = $post;
      $this->page->title = $post->name;
      $this->page->meta_title = $post->meta_name;
      $this->page->meta_description = $post->meta_description;
    }


}