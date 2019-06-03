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
