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
urlClassLoader.addURL(
	new java.net.URL(
		'http://softsynth.com/jsyn/developers/archives/jsyn-20171016.jar'
	)
);
//--------------------------------------------------------------------------------
//imports
//--------------------------------------------------------------------------------
var JSyn		=Java.type('com.jsyn.JSyn');
var SineOscillator	=Java.type('com.jsyn.unitgen.SineOscillator');
var SawtoothOscillator	=Java.type('com.jsyn.unitgen.SawtoothOscillator');
var AudioDeviceManager	=Java.type('com.jsyn.devices.AudioDeviceManager');
var LineOut		=Java.type('com.jsyn.unitgen.LineOut');
var WhiteNoise		=Java.type('com.jsyn.unitgen.WhiteNoise');
var FilterStateVariable	=Java.type('com.jsyn.unitgen.FilterStateVariable');
var WaveRecorder	=Java.type('com.jsyn.util.WaveRecorder');
//--------------------------------------------------------------------------------
//code
//--------------------------------------------------------------------------------
var numInputChannels=2;
var numOutputChannels=2;
var synth=JSyn.createSynthesizer()
synth.setRealTime(false);
var tempfile=java.io.File.createTempFile("tmpwav", ".wav");
var recorder=new WaveRecorder(synth,tempfile);

var myOut	=new LineOut();
var myNoise	=new WhiteNoise();
var mySaw	=new SawtoothOscillator();
var mySine	=new SineOscillator();
var myFilter	=new FilterStateVariable();

mySine.frequency.set(440.0);
mySine.amplitude.set(0.5);

mySaw.frequency.set(220.0);
mySaw.amplitude.set(0.01);

synth.add(myOut);
synth.add(mySine);
synth.add(mySaw);
synth.add(myNoise);
synth.add(myFilter);

myNoise.output.connect(myFilter.input);
myNoise.start();
myNoise.output.connect(0,myOut.input,0);
myNoise.output.connect(0,myOut.input,1);
synth.start(
	44100,
	AudioDeviceManager.USE_DEFAULT_DEVICE,
	numInputChannels,
	AudioDeviceManager.USE_DEFAULT_DEVICE,
	numOutputChannels
);
mySaw.output.connect(0,recorder.getInput(),0);
mySaw.output.connect(0,recorder.getInput(),1);

recorder.start();
synth.sleepFor(10);
recorder.stop();
synth.stop();
org.apache.commons.io.IOUtils.copy(new java.io.FileInputStream(tempfile),os);
synth.stop();

tempfile.delete()

org.apache.commons.io.IOUtils.closeQuietly(os);

