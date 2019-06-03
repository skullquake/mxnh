var println=function(a){
	org.apache.commons.io.IOUtils.write(a,os);
	org.apache.commons.io.IOUtils.write('\n',os);
}
//--------------------------------------------------------------------------------
//classloading
//--------------------------------------------------------------------------------
var urls=[
	'https://repo1.maven.org/maven2/net/sourceforge/jadex/jadex-commons/2.4/jadex-commons-2.4.jar',
]
for(var urlidx=0;urlidx<urls.length;urlidx++){
	urlClassLoader.addURL(
		new java.net.URL(
			urls[urlidx]
		)
	);
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
try{
	var ByteClassLoader=Java.type('jadex.commons.ByteClassLoader');
	var cl=new ByteClassLoader(java.lang.Thread.currentThread().getContextClassLoader());
	var CA=cl.loadClass("A",gres['A.class'],false);
	println(JSON.stringify(getMethodsByObject(CA),0,'\t'));
	println(CA);
	var ca=CA.newInstance()
	println(ca);
}catch(e){
	println(e);
}
org.apache.commons.io.IOUtils.closeQuietly(os);
