/**
 * Created by Ahmed Shaban on 19/06/2017.
 */
(function () {

    var tables=[];    // object contain Name and Array of object contain name , type , option represent columns
    var databaseObj={};  // object contain DATABASE_NAME , DATABASE_TABLE[] , DATABASE_VERSION
    var database;

    var execution="";
    var update="";

    var otherMember="static final String DATABASE_NAME = \"MyDB\";\nfinal Context context;\nDatabaseHelper DBHelper;\nSQLiteDatabase db;\npublic DBAdapter(Context ctx){\ncontext = ctx;\nDBHelper = new DatabaseHelper(context);\n}"

    tables.push({
        name:"medicine",
        columns:[
            {
                name:"medicine_name",
                type:"text",
                option:["primary key"]
            },
            {
                name:"slice_num",
                type:"text",
                option:["not null"]
            },
            {
                name:"bill_num",
                type:"text",
                option:["not null"]
            },
            {
                name:'time',
                type:'text',
                option:["not null"]
            }
        ]
    });

    tables.push({
        name:"doctor",
        columns:[
            {
                name:"name",
                type:"text",
                option:["primary key"]
            },
            {
                name:"phone",
                type:"text",
                option:["not null"]
            }
        ]
    });

    tables.push({
        name:"paper",
        columns:[
            {
                name:"uri",
                type:"text",
                option:["primary key"]
            },
            {
                name:"title",
                type:"text",
                option:["not null"]
            }
        ]
    });


    var prime_key;

    var DATABASE_CREATE=[];

    var open="public DBAdapter open() throws SQLException\n{\n     db = DBHelper.getWritableDatabase();\nreturn this;\n}"
    var close="public void close()\n{\nDBHelper.close();\n}"

    function generateDefaultJaveDatabase() {

        database = {
            package: 'package com.androidmaker.usernanme.projectname;',
            imports: {
                'import android.content.ContentValues;': true,
                'import android.content.Context;': true,
                'import android.database.Cursor;': true,
                'import android.database.SQLException;': true,
                'import android.database.sqlite.SQLiteDatabase;': true,
                'import android.database.sqlite.SQLiteOpenHelper;': true
            },
            classname: 'public class DBAdapter',
            innerclass:{
                sign:"private static class DatabaseHelper extends SQLiteOpenHelper {",
                myConstructor:"DatabaseHelper(Context context){\nsuper(context,"+databaseObj.name+", null, "+databaseObj.version+");\n}",
                functions:{
                    'onCreate': {
                        sig: '@Override\npublic void onCreate(SQLiteDatabase db)',
                        content:''
                    },
                    'onUpgrade': {
                        sig: '@Override \npublic void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)\n',
                        content: ''
                    }
                }
            },
            members: [],
            functions: {

                'insert': {
                    access: 'public',
                    sig: 'long',
                    name: 'insert',
                    params: [],
                    content: ''
                },
                'get': {
                    access: 'public',
                    sig: 'Cursor',
                    name: 'get',
                    params: [],
                    content: ''
                },
                'update': {
                    access: 'public',
                    sig: 'boolean',
                    name: 'delete',
                    params: [],
                    content: ''
                },
                'delete': {
                    access: 'public',
                    sig: 'boolean',
                    name: 'delete',
                    params: [],
                    content: ''
                },
                'getAll': {
                    access: 'public',
                    sig: 'Cursor',
                    name: 'getAll',
                    params: [],
                    content: ''
                }
            }
        }
    }
    
    function constructCreateDB() {

        for (table_index in tables){
            addDatabaseExecution(table_index);
            var table=tables[table_index];
            addTableMember(table.name,table_index);
            var temp="";
            temp= "create table "+table.name+" (";
            for(column_index in table.columns) {
                var column=table.columns[column_index]
                addColumnsMember(column,table.name);
                temp += column.name + " " + column.type;

                for(option_index in column.option){
                    var option=column.option[option_index];
                    temp+=" "+option;
                }

                if (column_index!=table.columns.length-1)
                    temp+=" ,";
            }

            temp+=");";
            var obj={};
            obj.access="private static final";
            obj.type="String";
            obj.name="DATABASE_CREATE"+table_index;
            obj.value=temp;

            database.members.push(obj);
        }
    }

    function printJavaDatabase() {
        var javaObj = database;

        var out = '';
        out += javaObj.package + '\n\n';
        for (var i in javaObj.imports) {
            out += i + '\n';
        }

        out += '\n' + javaObj.classname + ' ';
        out += ' {\n\n';

        for (var i = 0; i < javaObj.members.length; i++) {
            var ob = javaObj.members[i];
            out += ob.access + ' ' + ob.type + ' ' + ob.name + ' = "' +ob.value + '";\n'
        }

        out += otherMember+"\n\n";
        out +=javaObj.innerclass.sign+"\n\n"+javaObj.innerclass.myConstructor+"\n\n";

        for (var fn in javaObj.innerclass.functions) {
            out += '\n';
            var ob = javaObj.innerclass.functions[fn];
            if (fn=='onCreate')
                ob.content='\ntry { \n'+ execution + '\n} catch (SQLException e)\n {e.printStackTrace();}'
            else
                ob.content=update+'\nonCreate(db);';

            out += ob.sig + '{\n ' + ob.content + '\n}';
            //out += '\n}\n';
        }

        out += '\n}\n';

        for(table_index in tables)
        {
            var table = tables[table_index];
            out += '\n';

            prime_key=table.columns[0];


            //insert
            var ob = javaObj.functions['insert'];
            out += ob.access + ' ' + ob.sig + ' ' + ob.name +'_'+table.name+'(';
            ob.params=table.columns;
            ob.content="ContentValues initialValues = new ContentValues();\n"
            for (var j = 0; j < ob.params.length; j++) {
                if (j > 0)out += ' , ';
                out += (ob.params[j].type) + ' '+ob.params[j].name;
                ob.content+="initialValues.put("+table.name+"_"+ob.params[j].name+","+ob.params[j].name+");\n"
            }

            ob.content+="return db.insert(DATABASE_TABLE"+table_index+", null, initialValues);"
            //ob.ccontent+="return db.insert(DATABASE_TABLE, null, initialValues);"

            out += '){\n';
            out += ob.content;
            out += '\n}\n';



            //get
            var ob = javaObj.functions['get'];
            out += ob.access + ' ' + ob.sig + ' ' + ob.name +'_'+table.name+'(';
            ob.params=prime_key;

            //out += (ob.params.type=='text'?'String':'int') + ' '+ob.params[j].name;

            var columns=table.columns;

            out += (ob.params.type) + ' '+ob.params.name;

            ob.content="Cursor mCursor = db.query(true, DATABASE_TABLE"+table_index+", new String[] {";
            table=tables[table_index];
            for (var j = 0; j < table.columns.length; j++) {
                if (j > 0)ob.content += ' , ';
                ob.content+=table.name+"_"+table.columns[j].name;
            }
            ob.content+="}, "+table.name+"_"+prime_key.name+"=" + prime_key.name +", null, null, null, null, null);\n";
            ob.content+="if (mCursor != null) { \nmCursor.moveToFirst();\n}\nreturn mCursor;";

            out += '){\n';
            out += ob.content;
            out += '\n}\n';


            //getAll
            var ob = javaObj.functions['getAll'];
            out += ob.access + ' ' + ob.sig + ' ' + ob.name +'_'+table.name+'(';

            var columns=table.columns;

            ob.content=" return db.query(DATABASE_TABLE"+table_index+", new String[] {";
            for (var j = 0; j < table.columns.length; j++) {
                if (j > 0)ob.content += ' , ';
                ob.content+=table.name+"_"+table.columns[j].name;
            }

            ob.content+="},null, null, null, null, null, null);\n";

            out += '){\n';
            out += ob.content;
            out += '}\n';


            //delete
            var ob = javaObj.functions['delete'];

            out += ob.access + ' ' + ob.sig + ' ' + ob.name +'_'+table.name+'(';
            var columns=table.columns;

            //return db.delete(DATABASE_TABLE, KEY_movie_id + "=" + rowId, null) > 0;
            ob.params=prime_key;
            out += ob.params.type + ' '+ob.params.name;

            ob.content=" return db.delete(DATABASE_TABLE"+table_index+", ";
            ob.content+=table.name+"_"+prime_key.name +"="+prime_key.name+", null) > 0;";

            out += '){\n';
            out += ob.content;
            out += '\n}\n';


            //update
            var ob = javaObj.functions['update'];
            out += ob.access + ' ' + ob.sig + ' ' + ob.name +'_'+table.name+'(';
            ob.params=table.columns;
            ob.content="ContentValues initialValues = new ContentValues();\n"
            for (var j = 0; j < ob.params.length; j++) {
                if (j > 0)out += ' , ';
                out += (ob.params[j].type) + ' ' + ob.params[j].name;

                if (ob.params[j].name!==prime_key.name) {
                    ob.content+="initialValues.put("+table.name+"_"+ob.params[j].name+","+ob.params[j].name+");\n"
                }
            }

            ob.content+="return db.update(DATABASE_TABLE"+table_index+",initialValues,"+table.name+"_"+prime_key.name+"="+prime_key.name+",null) > 0;"

            out += '){\n';
            out += ob.content;
            out += '\n}\n';


        }

        out += '\n}\n';
        console.log(out);
        return out;

    }



    function addTable(name, columns) {
        var obj = {};
        obj.name = name;
        obj.columns = columns;

        tables.push(obj);
    }

    function addDatabase(name,version) {
        databaseObj.name = name;
        databaseObj.version = version;
    }

    function addColumnsMember(column,table_name) {
        var obj={};
        obj.access="private static ";
        obj.type=column.type="text"?"String":"integer";
        obj.name=table_name+"_"+column.name;
        obj.value=column.name;
        database.members.push(obj);
    }

    function addTableMember(table_name,table_index) {
        var obj={};
        obj.access="private static final";
        obj.type="String";
        obj.name="DATABASE_TABLE"+table_index;
        obj.value=table_name;
        database.members.push(obj);
    }

    function addDatabaseExecution(table_index)
    {
        execution+='db.execSQL(DATABASE_CREATE'+table_index+');\n';
        update+='db.execSQL("DROP TABLE IF EXISTS '+tables[table_index].name+'");\n';
    }

    //window.JavaGenerator = window.JavaGenerator || {};
    //window.JavaGenerator.printJavaDatabase = printJavaDatabase;
    //window.JavaGenerator.addMember = addMember;
    //window.JavaGenerator.generateDefaultJaveActivity = generateDefaultJaveActivity;


    addDatabase("DATABASE_NAME",1);
    generateDefaultJaveDatabase();
    constructCreateDB();
    printJavaDatabase();

})();