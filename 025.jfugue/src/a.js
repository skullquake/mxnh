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
function ex00(){
	try{
		var Player=Java.type('org.jfugue.player.Player');
		var Pattern=Java.type('org.jfugue.pattern.Pattern');
		var MidiFileManager=Java.type('org.jfugue.midi.MidiFileManager');
		var patt="T100 V0 C6qa71 D6qa80 E6ha90 F6ha101";
		var pattern=new Pattern(patt);
		var player=new Player();
		var tempfile=java.io.File.createTempFile("jfugue", ".mid");
		MidiFileManager.savePatternToMidi(
			pattern,
			//new java.io.File('/tmp/a.mid')
			tempfile
		);
		res.setContentType('application/midi')
		org.apache.commons.io.IOUtils.copy(new java.io.FileInputStream(tempfile),os);
		tempfile.delete();
	}catch(e){
		print(e);
	}

}
ex00();
org.apache.commons.io.IOUtils.closeQuietly(os);

