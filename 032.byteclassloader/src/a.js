var println=function(a){
	org.apache.commons.io.IOUtils.write(a,os);
	org.apache.commons.io.IOUtils.write('\n',os);
}
//--------------------------------------------------------------------------------
//classloading
//--------------------------------------------------------------------------------
var urls=[
	'https://repo1.maven.org/maven2/net/sourceforge/jadex/jadex-commons/2.4/jadex-commons-2.4.jar',
	'https://nhutil-sandbox.mxapps.io/rhtest?cmd=resopen&key=A.class',
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
	//var cl=new ByteClassLoader(java.lang.Thread.currentThread().getContextClassLoader());
	var cl=new ByteClassLoader(urlClassLoader);
	var CA=cl.loadClass("foo.A",gres['A.class'],false);
	//var CA=cl.loadClass("foo.A",gres['A.class']);
	println(CA);
	var ca=CA.newInstance()
	println(ca);
	println(foo.A);
	//ca.test();
}catch(e){
	println(e);
}

//--------------------------------------------------------------------------------
//custom class loader
//--------------------------------------------------------------------------------
try{
	var BCL=Java.extend(
		Java.type('java.lang.ClassLoader'),
		{
			findClass:function(asdf){
				//println(Java.super(Java.super(BCL)));
				return defineClass(asdf,gres[asdf],0,gres[asdf].length);
			}
		}
	);
	println('a');
	var bcl=new BCL(java.lang.Thread.currentThread().getContextClassLoader());
	println(bcl.findClass('A.class'));
	println('b');
}catch(e){
	println(e);
}

//--------------------------------------------------------------------------------
//url???
//--------------------------------------------------------------------------------

urlClassLoader.loadClass('A');
//--------------------------------------------------------------------------------
//println(Java.type('A'));
//--------------------------------------------------------------------------------
org.apache.commons.io.IOUtils.closeQuietly(os);

