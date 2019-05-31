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
print(
	JSON.stringify(
		getMethodsByObject(
			req.class
		),
		'0',
		'\t'
	)
);
print('getParaemters:');
print(req.getParameter('foo'));
print('isFileUpload:');
print(req.isFileUpload());
print('getHeader:');
print(req.getHeader('User-agent'));
print('getHttpServletRequest:');
print(req.getHttpServletRequest());
print('getCookie:');
print(req.getCookie(''));//??
print('getResourcePath:');
print(req.getResourcePath());
print('getRequestString:');
print(req.getRequestString());
print('getRemoteAddr:');
print(req.getRemoteAddr());
print('getFileItemName:');
try{
	print(req.getFileItemName());
}catch(e){
	print(e);
}
print('createFingerprint:');
print(req.createFingerprint());
print('getContext:');
print(req.getContext());
print('getInputStream:');
print(req.getInputStream());
IOUtils.closeQuietly(os);
