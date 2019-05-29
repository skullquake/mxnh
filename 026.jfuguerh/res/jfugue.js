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
		'http://www.jfugue.org/jfugue-5.0.9.jar'
	)
);
try{
	var Player=Java.type('org.jfugue.player.Player');
	var Pattern=Java.type('org.jfugue.pattern.Pattern');
	var MidiFileManager=Java.type('org.jfugue.midi.MidiFileManager');
	var rules={
		'Cmajw':	'Cmajw Fmajw',
		'Fmajw':	'Rw Bbmajw',
		'Bbmajw':	'Rw Fmajw',
		'C5q':		'C5q G5q E6q C6q',
		'E6q':		'G6q D6q F6i C6i D6q',
		'G6i+D6i':	'Rq Rq G6i+D6i G6i+d^i Rq'
	};
	var rmp=org.staccato.ReplacementMapPreprocessor.getInstance();
	rmp.setReplacementMap(rules);
	rmp.setIterations(8);
	rmp.setRequireAngleBrackets(false);
	var axiom=new Pattern(
		'T120 '+'V0 I[Flute] Rq C5q '+
		'V1 I[Tubular_Bells] Rq Rq Rq G6i+D6i '+
		'V2 I[Piano] Cmajw E6q '+
		'V3 I[Warm] E6q G6i+D6i '+
		'V4 I[Voice] C6q E6q'
	);
	var player=new Player();
	var tempfile=java.io.File.createTempFile("jfugue", ".mid");
	MidiFileManager.savePatternToMidi(
		axiom,
		tempfile
	);
	res.setContentType('audio/x-midi')
	org.apache.commons.io.IOUtils.copy(new java.io.FileInputStream(tempfile),os);
	tempfile.delete();
}catch(e){
	print(e);
}
org.apache.commons.io.IOUtils.closeQuietly(os);

