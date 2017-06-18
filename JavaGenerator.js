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
        console.log(out);
        return out;

    }

    function addMember(activity, access, type, id, importline) {
        var obj = {};
        obj.access = access;
        obj.type = type;
        obj.id = id;

        var activity_name = activity.id;
        if (activity_name.indexOf('ListView') !== -1) {
            activity_name = activity.parentActivity;
            //console.log(activities[activity_name],activity_name,importline);
            activities[activity_name].imports[importline] = true;
            activities[activity_name].objects[activity.id + 'Holder'].members[id] = type;
            activities[activity_name].objects[activity.id + 'Holder'].constructor.push(id + '=(' + type + ') findViewById(R.id.' + id + ');');
        } else {
            activities[activity_name].imports[importline] = true;
            activities[activity_name].members.push(obj);
            activities[activity_name].functions.onCreate.content += '\n\t' + id + '=(' + type + ') findViewById(R.id.' + id + ');';
        }


        printJavaActivity(activity_name);
    }

    function createListViewHolderAndAdapter(activity_Name, listviewId) {
        activities[activity_Name].imports['import android.support.v7.widget.LinearLayoutManager;'] = true;
        activities[activity_Name].imports['import android.support.v7.widget.RecyclerView;'] = true;
        activities[activity_Name].imports['import android.view.LayoutInflater;'] = true;
        activities[activity_Name].imports['import android.view.View;'] = true;
        activities[activity_Name].imports['import android.view.ViewGroup;'] = true;
        activities[activity_Name].members.push({
            access: 'private',
            type: listviewId + 'Adapter',
            id: 'm' + listviewId + 'Adapter'
        });
        activities[activity_Name].functions.onCreate.content += '\n\t' + listviewId + '.setLayoutManager(new LinearLayoutManager(getApplicationContext()));';
        activities[activity_Name].functions.onCreate.content += '\n\tm' + listviewId + 'Adapter = new ' + listviewId + 'Adapter(new ArrayList<>());';
        activities[activity_Name].functions.onCreate.content += '\n\t' + listviewId + '.setAdapter(m' + listviewId + 'Adapter);';


        activities[activity_Name].objects[listviewId + 'Holder'] = {
            isHolder: true,
            extends: 'RecyclerView.ViewHolder',
            implements: ['View.OnClickListener'],
            members: {/* TextView1: 'TextView' */},
            constructor: [/*'mSolved = (CheckBox) itemView.findViewById(R.id.right_checkbox);'*/],
            bindData: [/*{viewId: 'TextView1', value: 'title'}*/],
            onClick: {gotoActivity: 'ACTIVITY2'}

        };
        /*
         private class CrimeHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
         private TextView mCrimeTitleHolderTextView;
         private TextView mDateTextView;
         private CheckBox mSolved;
         private Crime mCrime;


         public CrimeHolder(View itemView) {
         super(itemView);
         mCrimeTitleHolderTextView = (TextView) itemView.findViewById(R.id.upper_text_view);
         mDateTextView = (TextView) itemView.findViewById(R.id.lower_text_view);
         mSolved = (CheckBox) itemView.findViewById(R.id.right_checkbox);
         itemView.setOnClickListener(this);
         }

         public void bindCrime(Crime crime) {
         mCrime = crime;
         mCrimeTitleHolderTextView.setText(crime.getTittle());
         mDateTextView.setText(crime.getDate().toString());
         mSolved.setChecked(crime.isSolved());

         }

         @Override
         public void onClick(View v) {
         mPosition = getLayoutPosition();
         Intent intent = CrimePagerActivity.newIntent(getActivity(), mCrime.getId(), mPosition);
         startActivity(intent);

         }
         }
         */

        activities[activity_Name].objects[listviewId + 'Adapter'] = {
            extends: 'RecyclerView.Adapter<' + listviewId + 'Holder>',
            implements: [],
            members: [{type: 'List<' + listviewId + 'Model>', id: 'mList'}],

        };

        /*
         private class CrimeAdapter extends RecyclerView.Adapter<CrimeHolder> {
         public List<Crime> mCrimes;

         public CrimeAdapter(List<Crime> crimes) {
         mCrimes = crimes;
         }

         @Override
         public CrimeHolder onCreateViewHolder(ViewGroup parent, int viewType) {
         LayoutInflater layoutInflater = LayoutInflater.from(getActivity());
         View v = layoutInflater.inflate(R.layout.crime_list_item, parent, false);
         return new CrimeHolder(v);
         }

         @Override
         public void onBindViewHolder(CrimeHolder holder, int position) {
         Crime crime = mCrimes.get(position);
         holder.bindCrime(crime);

         }

         public void setmCrimes(List<Crime> crimes) {
         mCrimes = crimes;
         }

         @Override
         public int getItemCount() {
         return mCrimes.size();
         }
         }
         */

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

        res += '\tprivate ' + listid + 'Model mObject;\n';
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


        res += '\n\tpublic void bindData(' + listid + 'Model object){\n';
        res += '\t\tmObject = object;\n';
        for (var i = 0; i < holder.bindData.length; i++) {
            var obj = holder.bindData[i];
            res += '\t\t' + obj.viewId + '.setText(object.' + obj.value + ');\n'
        }
        res += '\n\t}';


        res += '\n\tpublic void onClick(View v) {\n';
        res += '\t\tIntent intent=new Intent(getApplicationContext(),' + holder.onClick.gotoActivity + '.class);\n';
        res += '\t\tintent.putExtra(\"object\",mObject);\n';
        res += '\t\tstartActivity(intent);\n';
        res += '\t}\n';
        res += '}\n';
        return res;
    }

    function getAdapterStringCode(class_name, adapter) {
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

        for (var i = 0; i < adapter.members.length; i++) {
            var obj = adapter.members[i];
            res += '\tprivate ' + obj.type + ' ' + obj.id + ';\n';
        }

        res += '\tpublic ' + class_name + '(List<' + listid + 'Model> list) {\n';
        res += '\t\tmList = list;\n\t}\n';

        res += '\n\tpublic void setList(List<' + listid + 'Model> list) {\n' +
            '\t\tmList = list;\n\t}\n';

        res += '\tpublic ' + listid + 'Holder onCreateViewHolder(ViewGroup parent, int viewType) {\n' +
            '\t\tLayoutInflater layoutInflater = LayoutInflater.from(getApplicationContext());\n' +
            '\t\tView v = layoutInflater.inflate(R.layout.' + listid + ', parent, false);\n' +
            '\t\treturn new ' + listid + 'Holder(v);\n\t}\n\n';

        res += '\tpublic void onBindViewHolder(' + listid + 'Holder holder, int position) {\n\t\t' +
            listid + 'Model object = mList.get(position);\n' +
            '\t\tholder.bindData(object);\n\t}\n';


        res += '\n\tpublic int getItemCount() {\n' +
            '\t\treturn mList.size();\n\t}\n}';
        return res;
    }

    window.JavaGenerator = window.JavaGenerator || {};
    window.JavaGenerator.printJavaActivity = printJavaActivity;
    window.JavaGenerator.addMember = addMember;
    window.JavaGenerator.generateDefaultJaveActivity = generateDefaultJaveActivity;
    window.JavaGenerator.createListViewHolderAndAdapter = createListViewHolderAndAdapter;
    window.JavaGenerator.getAlladptersAndLists = getAlladptersAndLists;

})();