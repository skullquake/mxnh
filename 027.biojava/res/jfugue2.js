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
	var pmain=new Pattern();
	var scales=[
		new String('A B C D E F G#').split(' '),
		new String('A B C D E F# G').split(' '),
		new String('A B C D E F G').split(' '),
		new String('A B C# D E F# G').split(' '),
		new String('A B C# D# E F G').split(' '),
	];
	var dur='whistx'.split('');
	instruments=[
		/*
		"Piano",
		"Bright_Acoustic",
		"Electric_Grand",
		"Honkey_Tonk",
		"Electric_Piano",
		"Electric_Piano_2",
		"Harpischord",
		"Clavinet",
		"Celesta",
		"Glockenspiel",
		"Music_Box",
		"Vibraphone",
		"Marimba",
		"Xylophone",
		"Tubular_Bells",
		"Dulcimer",
		"Drawbar_Organ",
		"Percussive_Organ",
		"Rock_Organ",
		"Church_Organ",
		"Reed_Organ",
		"Accordian",
		"Harmonica",
		"Tango_Accordian",
		"Guitar",
		"Steel_String_Guitar",
		"Electric_Jazz_Guitar",
		"Electric_Clean_Guitar",
		"Electric_muted_Guitar",
		"Overdriven_Guitar",
		"Distortion_Guitar",
		"Guitar_Harmonics",
		"Acoustic_Bass",
		"Electric_Bass_Finger",
		"Electric_Bass_Pick",
		"Fretless_Bass",
		"Slap_Bass_1",
		"Slap_Bass_2",
		"Synth_Bass_1",
		"Synth_Bass_2",
		"Violin",
		"Viola",
		"Cello",
		"Contrabass",
		"Tremolo_Strings",
		*/
		"Pizzicato_Strings",
		"Orchestral_Strings",
		"Timpani",
		"String_Ensemble_1",
		"String_Ensemble_2",
		"Synth_strings_1",
		"Synth_strings_2",
		/*
		"Choir_Aahs",
		"Voice_Oohs",
		"Synth_Voice",
		"Orchestra_Hit",
		"Trumpet",
		"Trombone",
		"Tuba",
		"Muted_Trumpet",
		"French_Horn",
		"Brass_Section",
		"Synth_brass_1",
		"Synth_brass_2",
		"Soprano_Sax",
		"Alto_Sax",
		"Tenor_Sax",
		"Baritone_Sax",
		"Oboe",
		"English_Horn",
		"Bassoon",
		"Clarinet",
		"Piccolo",
		"Flute",
		"Recorder",
		"Pan_Flute",
		"Blown_Bottle",
		"Skakuhachi",
		"Whistle",
		"Ocarina",
		"Square",
		"Sawtooth",
		"Calliope",
		"Chiff",
		"Charang",
		"Voice",
		"Fifths",
		"Basslead",
		"New_Age",
		"Warm",
		"Polysynth",
		"Choir",
		"Bowed",
		"Metallic",
		"Halo",
		"Sweep",
		"Rain",
		"Soundtrack",
		"Crystal",
		"Atmosphere",
		"Brightness",
		"Goblins",
		"Echoes",
		"Sci-fi",
		"Sitar",
		"Banjo",
		"Shamisen",
		"Koto",
		"Kalimba",
		"Bagpipe",
		"Fiddle",
		"Shanai",
		"Tinkle_Bell",
		"Agogo",
		"Steel_Drums",
		"Woodblock",
		"Taiko_Drum",
		"Melodic_Tom",
		"Synth_Drum",
		"Reverse_Cymbal",
		"Guitar_Fret_Noise",
		"Breath_Noise",
		"Seashore",
		"Bird_Tweet",
		"Telephone_Ring",
		"Helicopter",
		"Applause",
		"Gunshot" 
		*/
	];
	var parts=[
		{
			instr:instruments[Math.floor(Math.random()*instruments.length)],
			oct:5,
			scale:scales[0],
			volume:10200,
			dur:'q'.split('')
		},
		{
			instr:instruments[Math.floor(Math.random()*instruments.length)],
			oct:6,
			scale:scales[0],
			volume:10,
			dur:'h hh hhh'.split('')
		},
		{
			instr:instruments[Math.floor(Math.random()*instruments.length)],
			oct:3,
			scale:scales[0],
			volume:10200,
			dur:'w'.split('')
		}

	];
	var p0s='';
	oct=5;
	tempo=60+Math.floor(Math.random()*80);;
	var ps='';
	for(var instridx=0;instridx<parts.length;instridx++){
		//var scale=scales[Math.floor(Math.random()*scales.length)]
		var sc=parts[instridx].scale
		var o=parts[instridx].oct;//+Math.floor(Math.random()*2);
		var vol=10;//parts[instridx].volume;//+Math.floor(Math.random()*2);
		ps='';
		//ps='T'+tempo+' ';
		//ps+='X[Volume]='+vol+' ';
		//ps+='V'+(instridx)+' ';
		ps+='I['+parts[instridx].instr+'] ';
		for(var i=0;i<32;i++){
			var vel=1+Math.floor(Math.random()*100);
			d=parts[instridx].dur[Math.floor(parts[instridx].dur.length*Math.random())]
			n=sc[Math.floor(sc.length*Math.random())]
			//ps+=('A80')+('d3');
			ps+=n+o+d;
			ps+=' ';
		}
		print(ps)//
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

org.apache.commons.io.IOUtils.closeQuietly(os);

