/**
 * Created by Ahmed Shaban on 01/04/2017.
 */


/**
 * Created by Ahmed Shaban on 11/03/2017.
 */
(function () {
    var activities = [];


    function generateDefaultJaveActivity(activity_name) {
        activities[activity_name] = {
            package: 'package com.androidmaker.usernanme.projectname;',
            imports: {
                'import android.support.v7.app.AppCompatActivity;': true,
                'import android.os.Bundle;': true
            },
            classname: 'public class ' + activity_name.toUpperCase() + ' extends',
            extends: 'AppCompatActivity',
            implements: '',
            members: [/*{access: 'private', type: 'Button', id: 'button1'}*/],
            functions: {
                'onCreate': {
                    access: 'protected',
                    sig: 'void',
                    name: 'onCreate',
                    params: ['Bundle'],
                    content: '\tsuper.onCreate(param1);\n\tsetContentView(R.layout.' + activity_name + ');'
                }
            }

        }


    }

    function printJavaActivity(activity_name) {
        var javaObj = activities[activity_name];

        var out = '';
        out += javaObj.package + '\n\n';
        for (var i in javaObj.imports) {
            out += i + '\n';
        }

        out += '\n' + javaObj.classname + ' ' + javaObj.extends;

        for (var i = 0; i < javaObj.implements.length; i++) {
            if (i == 0) {
                out += ' implements ' + javaObj.implements[0] + ' ';

            } else {
                out += ' , ' + javaObj.implements[i];
            }
        }

        out += ' {\n\n'

        for (var i = 0; i < javaObj.members.length; i++) {
            var ob = javaObj.members[i];
            out += ob.access + ' ' + ob.type + ' ' + ob.id + ';\n'
        }

        for (var fn in javaObj.functions) {
            out += '\n';
            var ob = javaObj.functions[fn];
            out += ob.access + ' ' + ob.sig + ' ' + ob.name + '(';
            for (var j = 0; j < ob.params.length; j++) {
                if (j > 0)out += ' , ';
                out += ob.params[j] + ' param' + (j + 1);
            }

            out += '){\n';
            out += ob.content;
            out += '\n}\n';
        }

        out += '\n}\n';
        console.log(out);
        return out;

    }

    function addMember(activity_name, access, type, id, importline) {
        var obj = {};
        obj.access = access;
        obj.type = type;
        obj.id = id;

        activities[activity_name].imports[importline] = true;
        activities[activity_name].members.push(obj);
        activities[activity_name].functions.onCreate.content += '\n\t' + id + '=(' + type + ') findViewById(R.id.' + id + ');';

        printJavaActivity(activity_name);
    }

    window.JavaGenerator = window.JavaGenerator || {};
    window.JavaGenerator.printJavaActivity = printJavaActivity;
    window.JavaGenerator.addMember = addMember;
    window.JavaGenerator.generateDefaultJaveActivity = generateDefaultJaveActivity;

})();