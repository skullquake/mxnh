//--------------------------------------------------------------------------------
//imports
//--------------------------------------------------------------------------------
var ScriptEngine                        =Java.type('javax.script.ScriptEngine');
var ScriptEngineManager                 =Java.type('javax.script.ScriptEngineManager');
var ScriptException                     =Java.type('javax.script.ScriptException');
var Binding                             =Java.type('javax.script.Bindings');
var IOUtils				=Java.type("org.apache.commons.io.IOUtils");
//--------------------------------------------------------------------------------
//utils
//--------------------------------------------------------------------------------
function addUrlToClasspath(pathName){
	var/*java.net.URLClassLoader*/ sysloader = /*(java.net.URLClassLoader) */ java.lang.ClassLoader.getSystemClassLoader();
	var/*java.lang.Class*/ sysclass = java.net.URLClassLoader.class;
	var ClassArray = Java.type("java.lang.Class[]");
	var parameters = new ClassArray(1);
	parameters[0]= java.net.URL.class;
	var/*java.lang.reflect.Method*/ method = sysclass.getDeclaredMethod("addURL", parameters);
	method.setAccessible(true);
	var ObjectArray = Java.type("java.lang.Object[]");
	var array = new ObjectArray(1);
	var/*java.io.File*/ f = new java.io.File(pathName);
	if(f.isFile()){
		var/*java.net.URL*/ u = f.toURL();
		array[0]=u;
		//if(u.toString().endsWith(".jar"))
		method.invoke(sysloader, array);
	}else{
		var/*File[]*/ listOfFiles = f.listFiles();
		if(listOfFiles !=null)
			for (var i = 0; i < listOfFiles.length; i++) {
				if (listOfFiles[i].isFile()) {
					var/*java.net.URL*/ u = listOfFiles[i].toURL();
					array[0]=u;
					method.invoke(sysloader, array);
				}
			}
	}
}
function addUrlToClasspath2(urlName){
	var/*java.net.URLClassLoader*/ sysloader = /*(java.net.URLClassLoader) */ java.lang.ClassLoader.getSystemClassLoader();
	var/*java.lang.Class*/ sysclass = java.net.URLClassLoader.class;
	var ClassArray = Java.type("java.lang.Class[]");
	var parameters = new ClassArray(1);
	parameters[0]= java.net.URL.class;
	var/*java.lang.reflect.Method*/ method = sysclass.getDeclaredMethod("addURL", parameters);
	method.setAccessible(true);
	var ObjectArray = Java.type("java.lang.Object[]");
	var array = new ObjectArray(1);
	var u=new java.net.URL(urlName);
	array[0]=u;
	//if(u.toString().endsWith(".jar"))
	//method.invoke(sysloader, array);
	method.invoke(sysloader, u);
	return method;
}
function print(a){
	IOUtils.write(a,os);
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
function ex0(){
	try{
		var cl=new java.net.URLClassLoader([new java.net.URL(
			//'http://clojars.org/repo/com/jsyn/jsyn/16.7.8/jsyn-16.7.8.jar'
			'http://www.softsynth.com/jsyn/developers/archives/jsyn-20171016.jar'

		)]);

		var JSyn=cl.loadClass("com.jsyn.JSyn");
		var synth=JSyn.getMethod('createSynthesizer').invoke(null);


		var tmppath=java.nio.file.Files.createTempDirectory('tmprpc');
		var tempfile=java.io.File.createTempFile("tmpscriptnh", ".wav",new java.io.File(tmppath));

		var WaveRecorder=cl.loadClass("com.jsyn.util.WaveRecorder");
		//var waveRecorder=WaveRecorder.newInstance;//(synth,tempfile,8,8);
		var waveRecorder=Java.type('com.jsyn.util.WaveRecorder');
		//var recorder=WaveRecorder.newInstance(synth,tempfile);

		var SineOscillator=cl.loadClass("com.jsyn.unitgen.SineOscillator");
		var so=SineOscillator.newInstance();
		so.frequency.set(440.0);
		so.amplitude.set(0.5);
		synth.add(so);
		//so.start();
		//so.stop();
		//
		/*
		var doc=cls.getMethod(
				'parse',
				java.lang.String.class
			).invoke(
				null,
				new java.lang.String(gres['res/jsouptest.html'])
			)
		*/
		//IOUtils.write(JSON.stringify(getMethodsByObject(SineOscillator.class),0,'\t'),os);
		//IOUtils.write(JSON.stringify(getMethodsByObject(so.class),0,'\t'),os);
		IOUtils.write(JSON.stringify(getMethodsByObject(waveRecorder.class),0,'\t'),os);

		IOUtils.closeQuietly(os);
	}catch(e){
		IOUtils.write(e,os);
		IOUtils.closeQuietly(os);
	}

	/*
	 *
	File waveFile = new File( "temp_recording.wav" );
	// Default is stereo, 16 bits.
	// recorder = new WaveRecorder( synth, waveFile );
	//
	// Then connect the final output mix to the WaveRecorder and start it running. The WaveRecorder will pull
	// data from the connected units
	//
	// finalMix.output.connect( 0, recorder.getInput(), 0 ); // left
	// finalMix.output.connect( 1, recorder.getInput(), 1 ); // right
	// recorder.start();
	//
	// When you are all done, stop the WaveRecorder and close it. The file outputstream will also be closed.
	//
	// recorder.stop();
	// recorder.close();
	//
	//
	*/
}
function ex01(){
	try{
		var r=addUrlToClasspath2('http://www.softsynth.com/jsyn/developers/archives/jsyn-20171016.jar');
		IOUtils.write(com.mendix.core.Core.getConfiguration().getBasePath(),os);
		//IOUtils.write(r,os);
		//IOUtils.write(Java.type("org.apache.commons.io.IOUtils"),os);
	}catch(e){
		IOUtils.write(e,os);
	}
	IOUtils.closeQuietly(os);
}
ex01();
