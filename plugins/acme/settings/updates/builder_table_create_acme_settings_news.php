<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsNews extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_news', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('poster')->nullable();
            $table->date('date')->nullable();
            $table->text('tags')->nullable();
            $table->integer('sort_order')->nullable()->default(0);
            $table->boolean('is_published')->nullable()->default(1);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_news');
    }
}
