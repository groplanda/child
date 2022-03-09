<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAcmeSettingsPrices extends Migration
{
    public function up()
    {
        Schema::create('acme_settings_prices', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('index')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->text('list')->nullable();
            $table->integer('sort_order')->nullable()->default(0);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('acme_settings_prices');
    }
}
