/**
 * Created by shawara on 6/13/2017.
 */

// var JavaObj = {
//     members: [{type: 'List<"JavaBeen1">', id: 'employees'}],
//     objects: [
//         {
//             JavaBeen1: {
//                 members: [
//                     {type: 'String', id: 'firstName'}
//                     {type: 'String', id: 'lastName'}
//                 ],
//                 objects: []
//             }
//         }
//     ]
// };

function JsonToJavaObject(strJson) {
    var JavaObject = createEmptyJObject();
    var js = JSON.parse(strJson);
    if (isArray(js))
        js = js[0];

    function createEmptyJObject() {
        return {
            members: [],
            objects: []
        };
    }

    function isArray(obj) {
        return isObject(obj) && (obj instanceof Array);
    }

    function isObject(obj) {
        return obj && (typeof obj === "object");
    }

    function isLong(n) {
        return isInt(n) && n > 1e9;
    }

    function isInt(n) {
        return Number(n) === n && n % 1 === 0;
    }

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    function isBoolean(n) {
        return typeof n === 'boolean';
    }

    function isString(n) {
        return typeof n === 'string';
    }


    function getType(n) {
        if (isLong(n)) {
            return 'long';
        } else if (isInt(n)) {
            return 'int';
        } else if (isFloat(n)) {
            return 'double'
        } else if (isBoolean(n)) {
            return 'boolean';
        } else if (isString(n)) {
            return 'String';
        }
    }

    function createClassName(name) {
        return name.charAt(0).toUpperCase() + name.substr(1) + 'Bean';
    }

    function getObjectJava(object, javaObject) {
        for (var i in object) {
            if (isArray(object[i])) {

                var listL = '', listR = '';
                var listobj = object[i];
                while (isArray(listobj)) {
                    listL += 'List< ';
                    listR += ' >';
                    listobj = listobj[0];
                }
                if (isObject(listobj)) {
                    javaObject.members.push({type: 'List<' + createClassName(i) + '>', id: i});

                    var obj = {};
                    obj[createClassName(i)] = getObjectJava(listobj, createEmptyJObject());
                    javaObject.objects.push(obj);

                } else {
                    javaObject.members.push({type: listL + getType(listobj) + listR, id: i});

                }


            } else if (isObject(object[i])) {
                javaObject.members.push({type: createClassName(i), id: i});

                var obj = {};
                obj[createClassName(i)] = getObjectJava(object[i], createEmptyJObject());
                javaObject.objects.push(obj);

            } else {
                javaObject.members.push({type: getType(object[i]), id: i});

            }
        }
        return javaObject;
    }


    getObjectJava(js, JavaObject);

    var stringJavaObjectCode = getStringClass(JavaObject, 'Model', '');

    function getStringClass(javaObject, class_name, tapes) {
        var res = tapes + 'public class ' + class_name + ' {\n';
        for (var m = 0; m < javaObject.members.length; m++) {
            var ob = javaObject.members[m];
            res += tapes + '\tpublic ' + ob.type + ' ' + ob.id + ';\n';
        }


        for (var m = 0; m < javaObject.objects.length; m++) {
            var ob = javaObject.objects[m];

            for (var cl in ob) {
                res += '\n' + getStringClass(ob[cl], cl, tapes + '\t');
            }
        }

        res += tapes + '}\n';
        return res;
    }

    return stringJavaObjectCode;
}


var text1 = '{ "employees" : [' +
    '{ "firstName":"John" , "lastName":"Doe" , "age":15 , "rate":12.5 ,"isWorking":true },' +
    '{ "firstName":"Anna" , "lastName":"Smith" ,"age":22 , "rate":25.5,"isWorking":true },' +
    '{ "firstName":"Peter" , "lastName":"Jones","age":21 , "rate":22.5,"isWorking":true } ]}';
var text2 = `
[{"lastName":"Khodyrev","country":"Russia","lastOnlineTimeSeconds":1497785239,"city":"Moscow","rating":1977,"friendOfCount":78,"titlePhoto":"http://userpic.codeforces.com/1592/title/27e43714e4bea090.jpg","handle":"DmitriyH","avatar":"http://userpic.codeforces.com/1592/avatar/7cef566902732053.jpg","firstName":"Dmitriy","contribution":39,"organization":"KL","rank":"candidate master","maxRating":2072,"registrationTimeSeconds":1268570311,"maxRank":"candidate master"},{"lastName":"Fefer","country":"Russia","lastOnlineTimeSeconds":1493884037,"city":"Saratov","rating":2240,"friendOfCount":243,"titlePhoto":"http://userpic.codeforces.com/242/title/151ab49dee0779f8.jpg","handle":"Fefer_Ivan","avatar":"http://userpic.codeforces.com/242/avatar/c4e6a102a9e66281.jpg","firstName":"Ivan","contribution":32,"organization":"aimtech","rank":"master","maxRating":2476,"registrationTimeSeconds":1264960450,"maxRank":"grandmaster"}]
`;

console.log(JsonToJavaObject(text2));