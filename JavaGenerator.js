/**
 * Created by Ahmed Shaban on 01/04/2017.
 */


/**
 * Created by Ahmed Shaban on 11/03/2017.
 */
(function () {
var activities=[];

    activities['ACTIVITY1']={
        package:'',
        imports:{'android.support.v7.app.AppCompatActivity;':true,'android.view.View;':true},
        classname:'ACTIVITY1',
        extends:'AppCompatActivity',
        implements:'',
        functions:[
            {
                sig:'void' ,
                access:'protected',
                name:'onCreate',
                params:['Bundle'],
                content:' super.onCreate(savedInstanceState);\n\tsetContentView(R.layout.activity_main);'
            }
        ]
    }

    function setup()
    {

    }

    window.generateJavaCode = window.generateJavaCode || {};

})();