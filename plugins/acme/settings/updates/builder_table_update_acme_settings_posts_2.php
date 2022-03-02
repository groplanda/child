<?php namespace Acme\Settings\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateAcmeSettingsPosts2 extends Migration
{
    public function up()
    {
        Schema::table('acme_settings_posts', function($table)
        {
            $table->string('meta_name')->nullable();
            $table->string('meta_description')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('acme_settings_posts', function($table)
        {
            $table->dropColumn('meta_name');
            $table->dropColumn('meta_description');
        });
    }
}
