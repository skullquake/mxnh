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

}
function ex01(){
	try{
		var Player=Java.type('org.jfugue.player.Player');
		var Pattern=Java.type('org.jfugue.pattern.Pattern');
		var MidiFileManager=Java.type('org.jfugue.midi.MidiFileManager');
		var pmain=new Pattern();
		var p1=new Pattern(
			"V0 I[Piano]  Cmajh             Fmajh           Cmajq   Gmajq   Cmajw " 
		);
		var p0=new Pattern(
			"V1 I[Piano]  C4i D4i E4i C4iD  F4i E4i D4i F4i G4i F4i G4i G4i C4w " 
		);
		pmain.add(p0);
		pmain.add(p1);
		var player=new Player();
		var tempfile=java.io.File.createTempFile("jfugue", ".mid");
		MidiFileManager.savePatternToMidi(
			pmain,//[p1,p0],
			tempfile
		);
		res.setContentType('audio/x-midi')
		org.apache.commons.io.IOUtils.copy(new java.io.FileInputStream(tempfile),os);
		tempfile.delete();
	}catch(e){
		print(e);
	}

}
function ex02(){
	try{
		var Player=Java.type('org.jfugue.player.Player');
		var Pattern=Java.type('org.jfugue.pattern.Pattern');
		var MidiFileManager=Java.type('org.jfugue.midi.MidiFileManager');
		var pmain=new Pattern();
		var scales=[
			//'A B C D E F G'.split(' '),
			//'A B C D E F# G'.split(' '),
			//'A B C# D E F# G'.split(' ')
			'A B C# D# E F G'.split(' '),
		];
		var dur='whistx'.split('');
		var parts=[
			/*
			{
				instr:'Cello',
				oct:3,
				scale:scales[0],
				dur:'wh'.split('')
			},
			{
				instr:'Violin',
				oct:5,
				scale:scales[0],
				dur:'wh'.split('')
			},
			{
				instr:'Piano',
				oct:5,
				scale:scales[0],
				dur:'hi'.split('')
			},
			{
				instr:'Viola',
				oct:4,
				scale:scales[0],
				dur:'hi'.split('')
			},
			{
				instr:'Trumpet',
				oct:4,
				scale:scales[0],
				dur:'wh'.split('')
			},
			*/
			{
				instr:'Pizzicato_Strings',
				oct:6,
				scale:scales[0],
				volume:10200,
				dur:'h hh hhh'.split('')
			},
			{
				instr:'Flute',
				oct:6,
				scale:scales[0],
				volume:10,
				dur:'h hh hhh'.split('')
			},
			{
				instr:'Piano',
				oct:3,
				scale:new String('Cmaj Gmaj F#maj').split(" "),
				volume:10200,
				dur:'w'.split('')
			}

		];
		var p0s='';
		oct=5;
		tempo=80;
		for(var instridx=0;instridx<parts.length;instridx++){
			//var ps='T'+tempo+' V'+instridx+' I['+instr[instridx]+'] ';
			//var scale=scales[Math.floor(Math.random()*scales.length)]
			var scale=parts[instridx].scale
			var o=parts[instridx].oct;//+Math.floor(Math.random()*2);
			var vol=10;//parts[instridx].volume;//+Math.floor(Math.random()*2);
			var ps='X[Volume]='+vol+' V'+(instridx+1)+' I['+parts[instridx].instr+'] ';
			for(var i=0;i<32;i++){
				var vel=1+Math.floor(Math.random()*100);
				d=parts[instridx].dur[Math.floor(parts[instridx].dur.length*Math.random())]
				n=scale[Math.floor(scale.length*Math.random())]
				//ps+=('A80')+('d3');
				ps+=n+o+d;
				ps+=' ';
			}
			//print(ps)//
			pmain.add(new Pattern(ps));
		}
		var player=new Player();
		var tempfile=java.io.File.createTempFile("jfugue", ".mid");
		MidiFileManager.savePatternToMidi(
			pmain,
			tempfile
		);
		res.setContentType('audio/x-midi')
		org.apache.commons.io.IOUtils.copy(new java.io.FileInputStream(tempfile),os);
		tempfile.delete();
	}catch(e){
		print(e);
	}

}
ex02();
org.apache.commons.io.IOUtils.closeQuietly(os);

