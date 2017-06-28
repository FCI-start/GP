/**
 * Created by Ahmed Shaban on 01/04/2017.
 */


/**
 * Created by Ahmed Shaban on 11/03/2017.
 */
(function () {
    var activities = {};


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
                    isOverride: true,
                    access: 'protected',
                    sig: 'void',
                    name: 'onCreate',
                    params: ['Bundle'],
                    content: '\tsuper.onCreate(param1);\n\tsetContentView(R.layout.' + activity_name + ');'
                },
                'onStart': {
                    isOverride: true,
                    access: 'public',
                    sig: 'void',
                    name: 'onStart',
                    params: [],
                    content: '\tsuper.onStart();\n'
                },
                'onStop': {
                    isOverride: true,
                    access: 'public',
                    sig: 'void',
                    name: 'onStop',
                    params: [],
                    content: '\tsuper.onStop();\n'
                }
            }
            , objects: []

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

        out += getAlladptersAndLists(activity_name);

        out += '\n}\n';
        // console.log(out);
        return out;

    }

    function addMember(activity, access, type, id, importline) {
        var obj = {};
        obj.access = access;
        obj.type = type;
        obj.id = id;

        var activity_name = activity.id;
        if (activity_name.indexOf('RecyclerView') !== -1) {
            activity_name = activity.parentActivity;
            //console.log(activities[activity_name],activity_name,importline);
            activities[activity_name].imports[importline] = true;
            activities[activity_name].objects[activity.id + 'Holder'].members[id] = type;
            // console.log("members", activity_name, activity.id, activities[activity_name].objects[activity.id + 'Holder'].members);
            activities[activity_name].objects[activity.id + 'Holder'].constructor.push(id + '=(' + type + ') itemView.findViewById(R.id.' + id + ');');
        } else {
            activities[activity_name].imports[importline] = true;
            activities[activity_name].members.push(obj);
            activities[activity_name].functions.onCreate.content += '\n\t' + id + '=(' + type + ') findViewById(R.id.' + id + ');';
        }


        printJavaActivity(activity_name);
    }

    function createListViewHolderAndAdapter(activity_Name, listviewId) {


        activities[activity_Name].objects[listviewId + 'Holder'] = {
            isHolder: true,
            extends: 'RecyclerView.ViewHolder',
            implements: ['View.OnClickListener'],
            members: {/* TextView1: 'TextView' */},
            constructor: [/*'mSolved = (CheckBox) itemView.findViewById(R.id.right_checkbox);'*/],
            bindData: {}/*{viewId: 'TextView1', value: 'title'}*/,
            onClick: {/*gotoActivity: 'ACTIVITY2'*/}

        };


        activities[activity_Name].objects[listviewId + 'Adapter'] = {
            extends: 'RecyclerView.Adapter<' + listviewId + 'Holder>',
            implements: [],
            members: {}/*{type: 'List<' + listviewId + 'Model>', id: 'mList'}*/,

        };


    }

    function getAlladptersAndLists(activity_name) {
        var res = "";
        var objects = activities[activity_name].objects;
        for (var ob in objects) {
            if (objects[ob].isHolder) {
                res += getHolderStringCode(ob, objects[ob]);
            } else {
                res += getAdapterStringCode(ob, objects[ob]);
            }
        }
        //console.log(res);
        return res;

    }

    function getHolderStringCode(class_name, holder) {
        if (!holder.members['mObject'])return '';

        var listid = class_name.substr(0, class_name.length - 'Holder'.length);

        var res = "private class " + class_name + " extends " + holder.extends;
        for (var i = 0; i < holder.implements.length; i++) {
            if (i == 0)
                res += ' implements ';
            else
                res += ' , ';
            res += holder.implements[i];
        }
        res += '{\n';

        //res += '\tprivate ' + listid + 'Model mObject;\n';
        for (var i in holder.members) {
            res += '\tprivate ' + holder.members[i] + ' ' + i + ';\n';
        }


        res += '\n';
        res += '\tpublic ' + class_name + '(View itemView){\n\t\tsuper(itemView);';
        for (var i = 0; i < holder.constructor.length; i++) {
            var line = holder.constructor[i];
            res += '\n\t\t' + line;
        }
        res += '\n\t}';


        res += '\n\tpublic void bindData(' + holder.members['mObject'] + ' object){\n';
        res += '\t\tmObject = object;\n';
        for (var i in holder.bindData) {
            if (holder.members[i] === 'ImageView')
                res += '\t\tsetImage( ' + i + ', object.' + holder.bindData[i] + ');\n'
            else
                res += '\t\t' + i + '.setText(object.' + holder.bindData[i] + ' + \"\");\n'
        }
        res += '\n\t}';


        res += '\n\tpublic void onClick(View v) {\n';
        if (holder.onClick.gotoActivity) {
            res += '\t\tIntent intent=new Intent(getApplicationContext(),' + holder.onClick.gotoActivity + '.class);\n';
            res += '\t\tintent.putExtra(\"object\",mObject);\n';
            res += '\t\tstartActivity(intent);\n';
        }
        res += '\t}\n';
        res += '}\n';
        return res;
    }

    function getAdapterStringCode(class_name, adapter) {
        if (!adapter.members['mList'])return '';
        var listid = class_name.substr(0, class_name.length - 'Adapter'.length);

        var res = "\nprivate class " + class_name + " extends " + adapter.extends;
        for (var i = 0; i < adapter.implements.length; i++) {
            if (i == 0)
                res += ' implements ';
            else
                res += ' , ';
            res += adapter.implements[i];
        }
        res += '{\n';

        for (var i in adapter.members) {
            res += '\tprivate ' + adapter.members[i] + ' ' + i + ';\n';
        }

        res += '\tpublic ' + class_name + '(' + adapter.members['mList'] + ' list) {\n';
        res += '\t\tmList = list;\n\t}\n';

        res += '\n\tpublic void setList(' + adapter.members['mList'] + ' list) {\n' +
            '\t\tmList = list;\n\t}\n';

        res += '\tpublic ' + listid + 'Holder onCreateViewHolder(ViewGroup parent, int viewType) {\n' +
            '\t\tLayoutInflater layoutInflater = LayoutInflater.from(getApplicationContext());\n' +
            '\t\tView v = layoutInflater.inflate(R.layout.' + listid.toLowerCase() + ', parent, false);\n' +
            '\t\treturn new ' + listid + 'Holder(v);\n\t}\n\n';

        res += '\tpublic void onBindViewHolder(' + listid + 'Holder holder, int position) {\n\t\t' +
            adapter.members['mList'].substr(5, adapter.members['mList'].length - 6) +
            ' object = mList.get(position);\n' +
            '\t\tholder.bindData(object);\n\t}\n';


        res += '\n\tpublic int getItemCount() {\n' +
            '\t\treturn mList.size();\n\t}\n}';
        return res;
    }


    function getHolderMembers(activity, list_view) {
        return activities[activity].objects[list_view + 'Holder'].members;
    }

    function bindMember(activityId, listViewId, ViewId, memberId) {
        activities[activityId].objects[listViewId + 'Holder'].bindData[ViewId] = memberId;
    }


    function addApiFunction(activityId, listviewId, url, method, objectPath, idPath) {
        var strCallInner = method.header.substr(5, method.header.length - 6);
        var listType = strCallInner;
        if (objectPath)
            listType += '.' + objectPath;

        var strContent = '';

        activities[activityId].members.push({
            access: 'private',
            type: listviewId + 'Adapter',
            id: 'm' + listviewId + 'Adapter'
        });

        strContent += '\n\t' + listviewId + '.setLayoutManager(new LinearLayoutManager(getApplicationContext()));';
        strContent += '\n\tm' + listviewId + 'Adapter = new ' + listviewId + 'Adapter(new ArrayList<' + listType + '>());';
        strContent += '\n\t' + listviewId + '.setAdapter(m' + listviewId + 'Adapter);\n';


        strContent += '\t\tRetrofit retrofit = new Retrofit.Builder()\n' +
            '\t\t\t.baseUrl(\"' + url + '\")\n' +
            '\t\t\t.addConverterFactory(GsonConverterFactory.create())\n' +
            '\t\t\t.build();\n' +
            '\t\t' + listviewId + 'Interface client = retrofit.create(' + listviewId + 'Interface.class);\n' +
            '\t\t' + method.header + ' call = client.getData';

        var cnt = 0, par = '';
        //Todo 2060 handle null Extra
        for (var i in method.params) {
            if (cnt)par += ' , ';

            if (method.params[i].isDynamic) {
                par += 'getIntent().getStringExtra(\"' + method.params[i].key + '\")';
                cnt++;
            } else {
                par += '\"' + method.params[i].key + '\"';
            }
        }
        strContent += '( ' + par + ' );\n\n';


        var strBody = '';
        if (objectPath)
            strBody = '\t\t\t\tList<' + strCallInner + '.' + objectPath + '> list = response.body().' + idPath + ';\n';
        else
            strBody = '\t\t\t\t' + strCallInner + ' list = response.body();\n';

        strBody += '\t\t\t\tm' + listviewId + 'Adapter.setList(list);\n' +
            '\t\t\t\tm' + listviewId + 'Adapter.notifyDataSetChanged();\n';

        strContent += '\t\tcall.enqueue(' +
            'new Callback<' + strCallInner + '>() {\n' +
            '\t\t\t@Override\n' +
            '\t\t\tpublic void onResponse(' + method.header + ' call,' + method.header.replace('Call', 'Response') + ' response) {\n' +
            strBody +
            '\t\t\t}\n' +
            '\t\t\t@Override\n' +
            '\t\t\tpublic void onFailure(' + method.header + ' call, Throwable t) {\n' +
            '\t\t\t}\n' +
            '\t\t});\n';


        //console.log(strContent);
        activities[activityId].functions['render' + listviewId] = {
            isOverride: false,
            access: 'private',
            sig: 'void',
            name: 'render' + listviewId,
            params: [],
            content: strContent
        };

        activities[activityId].functions['setImage'] = {
            access: 'private',
            sig: 'void',
            name: 'setImage',
            params: ['ImageView', 'String'],
            content: 'Picasso.with(getApplicationContext()).load(param2).into(param1);'
        };

        if (activities[activityId].functions['onCreate'].content.indexOf('render' + listviewId + '();') === -1)
            activities[activityId].functions['onCreate'].content += '\n\t\trender' + listviewId + '();\n';

        addRecyclerImports(activityId);
    }

    function addModelTypeToHolder(activtyId, listViewId, type) {
        activities[activtyId].objects[listViewId + 'Holder'].members['mObject'] = type;
        activities[activtyId].objects[listViewId + 'Adapter'].members['mList'] = 'List<' + type + '>';
    }


    function addRecyclerImports(activityId) {
        activities[activityId].imports['import android.support.v7.widget.LinearLayoutManager;'] = true;
        activities[activityId].imports['import android.view.LayoutInflater;'] = true;
        activities[activityId].imports['import android.view.View;'] = true;
        activities[activityId].imports['import android.view.ViewGroup;'] = true;
        activities[activityId].imports['import com.squareup.picasso.Picasso;'] = true;
        activities[activityId].imports['import java.util.ArrayList;'] = true;
        activities[activityId].imports['import retrofit2.Call;'] = true;
        activities[activityId].imports['import java.util.List;'] = true;
        activities[activityId].imports['import retrofit2.Callback;'] = true;
        activities[activityId].imports['import retrofit2.Response;'] = true;
        activities[activityId].imports['import retrofit2.Retrofit;'] = true;
        activities[activityId].imports['import retrofit2.converter.gson.GsonConverterFactory;'] = true;
        //activities[activityId].imports[''] = true;
    }


    function printJavaActivities() {
        for (i in activities)
            console.log(printJavaActivity(i));
    }


    function getFunctionName(activityId) {
        var strName = "action";
        var cnt = 1;
        while (1) {
            if (!activities[activityId].functions[strName + cnt])
                return strName + cnt;
            cnt++;
        }
    }

    function isValdFunctionName(name, activityId) {
        var reg = new RegExp("^[a-zA-Z_][0-9A-Za-z_]*$");
        return reg.test(name) && !activities[activityId].functions[name];
    }

    function addCodeFunction(funName, strCode, activityId, appendTo) {
        activities[activityId].functions[funName] = {
            isOverride: false,
            access: 'private',
            sig: 'void',
            name: funName,
            params: [],
            content: strCode
        };

        if (appendTo !== 'none') {
            activities[activityId].functions[appendTo].content += '\t' + funName + '();\n';
        }
    }

    function getAllActionFunctionNames() {
        var activityId = window.ProjectManager.getCurrentActivy().id;
        var list = [];
        for (var name in activities[activityId].functions) {
            if (!activities[activityId].functions[name].isOverride)
                list.push(name);
        }
        return list;
    }


    window.JavaGenerator = window.JavaGenerator || {};
    window.JavaGenerator.printJavaActivity = printJavaActivity;
    window.JavaGenerator.printJavaActivities = printJavaActivities;
    window.JavaGenerator.addMember = addMember;
    window.JavaGenerator.generateDefaultJaveActivity = generateDefaultJaveActivity;
    window.JavaGenerator.createListViewHolderAndAdapter = createListViewHolderAndAdapter;
    window.JavaGenerator.getAlladptersAndLists = getAlladptersAndLists;
    window.JavaGenerator.getHolderMembers = getHolderMembers;
    window.JavaGenerator.bindMember = bindMember;
    window.JavaGenerator.addApiFunction = addApiFunction;
    window.JavaGenerator.addModelTypeToHolder = addModelTypeToHolder;
    window.JavaGenerator.getFunctionName = getFunctionName;
    window.JavaGenerator.isValdFunctionName = isValdFunctionName;
    window.JavaGenerator.addCodeFunction = addCodeFunction;
    window.JavaGenerator.getAllActionFunctionNames = getAllActionFunctionNames;

})();