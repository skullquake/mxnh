try{
	glib.getMethods=function(c){
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
	};
	glib.getMethodsByObject=function(c){
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
	};
	'glib.reflect attached\n';
}catch(e){
	e;
}

