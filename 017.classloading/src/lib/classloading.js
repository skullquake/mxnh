try{
	glib.addUrlToClasspath=function(str_url){
		var/*java.net.URLClassLoader*/ sysloader = /*(java.net.URLClassLoader) */ java.lang.ClassLoader.getSystemClassLoader();
		var/*java.lang.Class*/ sysclass = java.net.URLClassLoader.class;
		var ClassArray = Java.type("java.lang.Class[]");
		var parameters = new ClassArray(1);
		parameters[0]= java.net.URL.class;
		var/*java.lang.reflect.Method*/ method = sysclass.getDeclaredMethod("addURL", parameters);
		method.setAccessible(true);
		var ObjectArray = Java.type("java.lang.Object[]");
		method.invoke(sysloader,[new java.net.URL(str_url)]);
	};
	'glib.classloading attached\n';
}catch(e){
	e;
}
