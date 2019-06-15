/* -------------------------------------------------------------------------------- */
/* vars */
/* -------------------------------------------------------------------------------- */
var IOUtils=Java.type("org.apache.commons.io.IOUtils");
var os=res.getOutputStream();
/* -------------------------------------------------------------------------------- */
/* util */
/* -------------------------------------------------------------------------------- */
function IMendixObject2Json(o){
    var ret={};
    if(o!=null){
        try{
            var mob=o.getMetaObject();
            var arr_mp=mob.getMetaPrimitives();
            arr_mp.forEach(
                function(obj_mp){
                    ret[obj_mp.getName().toString()]=o.getValue(root.getContext(),obj_mp.getName().toString())
                }
            );                        
        }catch(e){
            ret.error=e.toString();
        }           
    }else{
    }
    return ret;
}
function mxserialize(o){
    var ret=[];
    switch(typeof(o)){
        case 'object':
            if(o.length!=null){
                for(var i=0;i<o.length;i++){
                    ret.push(IMendixObject2Json(o[i])); 
                }
            }else{
                return IMendixObject2Json(o);
            }
            break;
        default:
            return {'error':'serialization error'};
            break;
    }
    return ret;
}
function printmxobj(o){
	println(
		JSON.stringify(
			mxserialize(o),
			0,
			'\t'
		)
	);
}
function getMethods(c){
    var r={};
    try{
        r.classmethods=[];
        var methods=java.lang.Class.forName(c).getDeclaredMethods();
        for(var i=0;i<methods.length;i++){
            var mobj={};
            mobj.name=methods[i].getName();
            var parametersobj=[];
            var parameters=methods[i].getParameterTypes();
            for(var j=0;j<parameters.length;j++){
                parametersobj.push(parameters[j].getName().toString());
            }
            mobj.parameters=parametersobj;
            r.classmethods.push(mobj);
        }
    }catch(e){
        r.error=e.toString();
    }
    return r;
}
function getMethodsByObject(c){
    var r={};
    try{
        r.classmethods=[];
        var methods=c.getMethods();
        for(var i=0;i<methods.length;i++){
            var mobj={};
            mobj.name=methods[i].getName();
            var parametersobj=[];
            var parameters=methods[i].getParameterTypes();
            for(var j=0;j<parameters.length;j++){
                parametersobj.push(parameters[j].getName().toString());
            }
            mobj.parameters=parametersobj;
            r.classmethods.push(mobj);
        }
    }catch(e){
        r.error=e.toString();
    }
    return r;
}
function printMethods(a){
	if(typeof(a)=='string'){
		println(
			JSON.stringify(
				getMethods(a),
				0,
				'\t'
			)
		);

	}else if(typeof(a)=='object'){
		println(
			JSON.stringify(
				getMethodsByObject(a),
				0,
				'\t'
			)
		);
	}else{
		println('Invalid arg');
	}
}
function print(a){
	IOUtils.write(
		a,
		os
	);
}
function println(a){
	print(a);
	print('\n');
}
/* -------------------------------------------------------------------------------- */
/* code */
/* -------------------------------------------------------------------------------- */
try{
	/*var a=com.mendix.core.Core.createXPathQuery('//System.FileDocument');*/
	/*var a=com.mendix.core.Core.createXPathQuery("//System.FileDocument[HasContents=true()]")*/
	var a=com.mendix.core.Core.createXPathQuery("//System.FileDocument[HasContents=$HASCONTENTS and Name=$NAME]");
	a.setOffset(0);
	a.setDepth(1);
	a.setDisableSecurity(true);
	a.setShouldRetrieveCount(true);
	a.addSort('createdDate',true);
	a.amount=1;
	a.setVariable('HASCONTENTS',true);
	a.setVariable('NAME','Script Export - 6/12/19 12:23 PM.json');
	var b=a.execute(root.getContext());
	printmxobj(b);
	println(a.class);
}catch(e){
	println(e);
}

