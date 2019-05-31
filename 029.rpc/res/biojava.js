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
	'http://central.maven.org/maven2/javax/vecmath/vecmath/1.5.2/vecmath-1.5.2.jar',
	'http://central.maven.org/maven2/org/slf4j/slf4j-api/1.8.0-beta2/slf4j-api-1.8.0-beta2.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-core/4.2.0/biojava-core-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-alignment/4.2.0/biojava-alignment-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-genome/4.2.0/biojava-genome-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-structure/4.2.0/biojava-structure-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-structure-gui/4.2.0/biojava-structure-gui-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-phylo/4.2.0/biojava-phylo-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-modfinder/4.2.0/biojava-modfinder-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-ws/4.2.0/biojava-ws-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-aa-prop/4.2.0/biojava-aa-prop-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-ontology/4.2.0/biojava-ontology-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-survival/4.2.0/biojava-survival-4.2.0.jar',
	'https://repo1.maven.org/maven2/org/biojava/biojava-protein-disorder/4.2.0/biojava-protein-disorder-4.2.0.jar',
]
for(var urlidx=0;urlidx<urls.length;urlidx++){
	urlClassLoader.addURL(
		new java.net.URL(
			urls[urlidx]
		)
	);
}
//Asymmetric Unit and Biological Assembly
function ex00(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		//----------------------------------------
		//code
		//----------------------------------------
		var structure = StructureIO.getStructure("4HHB");
		// and let's print out how many atoms are in this structure
		print(StructureTools.getNrAtoms(structure));

	}catch(e){
		print(e);
	}
}
//Asymmetric Unit and Biological Assembly
function ex01(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		//----------------------------------------
		//code
		//----------------------------------------
		var structure=StructureIO.getBiologicalAssembly("1GAV");
		print(StructureTools.getNrAtoms(structure));

	}catch(e){
		print(e);
	}

}
//Loop over All the Data
function ex02(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		//----------------------------------------
		//code
		//----------------------------------------
		var structure = StructureIO.getStructure("4hhb");
		var chains = structure.getChains();
		print(" # chains: " + chains.size());
		chains.forEach(
			function(c,cidx){
				print("   Chain: " + c.getChainID() + " # groups with atoms: " + c.getAtomGroups().size());
				c.getAtomGroups().forEach(
					function(g,gidx){
						print('\t'+g);
						g.getAtoms().forEach(
							function(a,aidx){
								print('\t\t'+a);
							}
						)
					}
				);
			}
		);
	}catch(e){
		print(e);
	}

}
// Working with Groups
function ex03(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		//----------------------------------------
		//code
		//----------------------------------------
		var structure = StructureIO.getStructure("4hhb");
		var chain=structure.getChainByPDB("A");
		//var groups=chain.getAtomGroups("amino");
		//var groups=chain.getAtomGroups();
		var groups=chain.getAtomGroups('nucleotide');
		groups.forEach(
			function(group,groupidx){
				var aa = group;//(AminoAcid) group;
				print(aa + " " + aa.getSecStruc());
			}
		);
	}catch(e){
		print(e);
	}

}
//This prints all the entities in a structure
function ex04(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		var structure=StructureIO.getStructure("4hhb");
		print(structure);
		print(" # of compounds (entities) " + structure.getEntityInfos().size());
		structure.getEntityInfos().forEach(
			function(entity,entityidx){
				print("   " + entity);
			}
		);
		//----------------------------------------
		//code
		//----------------------------------------
	}catch(e){
		print(e);
	}

}
// How Does BioJava Decide what Groups Are Amino Acids?
// dictionaries are used
function ex05(){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		var structure=StructureIO.getStructure("1A62");
		//----------------------------------------
		//code
		//----------------------------------------
		structure.getChains().forEach(
			function(chain,chainidx){
				chain.getAtomGroups().forEach(
					function(group,groupidx){
						if(
							group.getPDBName().equals("MSE")
							||group.getPDBName().equals("HOH")
						){
							print(
								group.getPDBName()+
								" is a group of type "+
								group.getType()
							);
						}
					}
				);
			}
		);
	}catch(e){
		print(e);
	}

}
function parsefasta(i){
	try{
		//----------------------------------------
		//imports
		//----------------------------------------
		var StructureIO=Java.type('org.biojava.nbio.structure.StructureIO');
		var StructureTools=Java.type('org.biojava.nbio.structure.StructureTools');
		var structure=StructureIO.getStructure("1A62");
		//----------------------------------------
		//code
		//----------------------------------------
		org
			.biojava
			.nbio
			.core
			.sequence
			.io
			.FastaReaderHelper
			.readFastaProteinSequence(
				i
			);

	}catch(e){
		print(e);
	}

}
//args from url call
if(args!=null&&args!=''){
	eval(args);
	//print(IOUtils.toByteArray(is));
}else{
	ex00();
	ex01();
	ex02();
	ex03();
	ex04();
	ex05();
}
org.apache.commons.io.IOUtils.closeQuietly(os);

