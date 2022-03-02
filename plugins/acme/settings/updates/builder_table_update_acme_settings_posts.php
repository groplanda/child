<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateAcmeSettingsPosts extends Migration
{
    public function up()
    {
        Schema::rename('acme_settings_news', 'acme_settings_posts');
    }
    
    public function down()
    {
        Schema::rename('acme_settings_posts', 'acme_settings_news');
    }
}
