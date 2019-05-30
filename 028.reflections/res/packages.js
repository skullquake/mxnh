//--------------------------------------------------------------------------------
//util
//--------------------------------------------------------------------------------
function print(a){
	org.apache.commons.io.IOUtils.write(a,os);
	org.apache.commons.io.IOUtils.write('\n',os);
}
//--------------------------------------------------------------------------------
//classloading
//--------------------------------------------------------------------------------
var urls=[
	'http://central.maven.org/maven2/com/google/guava/guava/20.0/guava-20.0.jar',
]
for(var urlidx=0;urlidx<urls.length;urlidx++){
	urlClassLoader.addURL(
		new java.net.URL(
			urls[urlidx]
		)
	);
}
//
function ex00(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		//----------------------------------------
		//code
		//----------------------------------------
		var path=com.google.common.reflect.ClassPath.from(java.lang.Thread.currentThread().getContextClassLoader());
		var r=java.lang.Package.getPackages();
		for(var i=0;i<r.length;i++){
			print('['+i+']:\t'+r[i].getName());
			print(path.getTopLevelClasses(r[i].getName()));
		};
		//print(Java.type('com.google.common.reflect.ClassPath'));
	}catch(e){
		print(e);
	}
}
ex00();
org.apache.commons.io.IOUtils.closeQuietly(os);

