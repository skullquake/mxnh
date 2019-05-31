//--------------------------------------------------------------------------------
//decl
//--------------------------------------------------------------------------------
	var IOUtils=Java.type('org.apache.commons.io.IOUtils');
//--------------------------------------------------------------------------------
//util
//--------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------
//code
//--------------------------------------------------------------------------------
;
IOUtils.write(
	JSON.stringify(
		getMethodsByObject(
			req.class
		),
		'0',
		'\t'
	),
	os
);
IOUtils.closeQuietly(os);

