//--------------------------------------------------------------------------------
//decl
//--------------------------------------------------------------------------------
	var IOUtils=Java.type('org.apache.commons.io.IOUtils');
//--------------------------------------------------------------------------------
//util
//--------------------------------------------------------------------------------
function print(a){
	try{
		IOUtils.write(a,os);
	}catch(e){
	}
}
function println(a){
	try{
		IOUtils.write(a,os);
		IOUtils.write('\n',os);
	}catch(e){
	}
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
//--------------------------------------------------------------------------------
//code
//--------------------------------------------------------------------------------
println(
	JSON.stringify(
		getMethodsByObject(
			req.class
		),
		'0',
		'\t'
	)
);
println('getParaemters:');
println(req.getParameter('foo'));
println('isFileUpload:');
println(req.isFileUpload());
println('getHeader:');
println(req.getHeader('User-agent'));
println('getHttpServletRequest:');
println(req.getHttpServletRequest());
println('getCookie:');
println(req.getCookie(''));//??
println('getResourcePath:');
println(req.getResourcePath());
println('getRequestString:');
println(req.getRequestString());
println('getRemoteAddr:');
println(req.getRemoteAddr());
println('getFileItemName:');
try{
	println(req.getFileItemName());
}catch(e){
	println(e);
}
println('createFingerprint:');
println(req.createFingerprint());
println('getContext:');
println(req.getContext());
println('getInputStream:');
println(req.getInputStream());
println(
	JSON.stringify(
		getMethods(
			'java.lang.Class'
		),
		0,
		'\t'
	)
)
urlClassLoader.addURL(
	new java.net.URL(
		'http://central.maven.org/maven2/org/apache/commons/commons-lang3/3.9/commons-lang3-3.9.jar'
	)
);
println(
	org.apache.commons.lang3.builder.ReflectionToStringBuilder.toString(
		req,
		org.apache.commons.lang3.builder.ToStringStyle.JSON_STYLE
	)
)
IOUtils.closeQuietly(os);
