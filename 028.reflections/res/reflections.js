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
	'http://central.maven.org/maven2/javassist/javassist/3.21.0.GA/javassist-3.21.0.GA.jar',
	'http://central.maven.org/maven2/org/reflections/reflections/0.9.11/reflections-0.9.11.jar',
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
		print(Java.type('org.reflections.Reflections'));
		var reflections=new org.reflections.Reflections(
			'com.mendix',
			new org.reflections.scanners.SubTypesScanner(false)
		);
		//var allClasses=		
		//----------------------------------------
		//code
		//----------------------------------------
	}catch(e){
		print(e);
	}
}
ex00();
org.apache.commons.io.IOUtils.closeQuietly(os);

