var urls=[
	'http://central.maven.org/maven2/org/apache/commons/commons-lang3/3.9/commons-lang3-3.9.jar',
	'http://central.maven.org/maven2/com/fasterxml/jackson/core/jackson-annotations/2.9.8/jackson-annotations-2.9.8',
	'http://central.maven.org/maven2/com/fasterxml/jackson/core/jackson-core/2.9.8/jackson-core-2.9.8.jar',
	'http://central.maven.org/maven2/com/fasterxml/jackson/core/jackson-databind/2.9.8/jackson-databind-2.9.8.jar',
	'http://central.maven.org/maven2/',
];
var println=function(a){
	org.apache.commons.io.IOUtils.write(a,os);
	org.apache.commons.io.IOUtils.write('\n',os);
}

function lod(a){
	a.forEach(
		function(b,c){
			urlClassLoader.addURL(
				new java.net.URL(
					b
				)
			);
		}
	);
}
lod(urls);




println(
	org.apache.commons.lang3.builder.ReflectionToStringBuilder.toString(
		req,
		org.apache.commons.lang3.builder.ToStringStyle.JSON_STYLE
	)
)
//throws nullpointer sometimes, e.g. for req and res serialization
println(
	org.apache.commons.lang3.builder.ReflectionToStringBuilder.toString(
		new java.net.URL(['http://central.maven.org/maven2/org/apache/commons/commons-lang3/3.9/commons-lang3-3.9.jar']),
		new org.apache.commons.lang3.builder.RecursiveToStringStyle()
	)
);
println(Java.type('com.fasterxml.jackson.databind.ObjectMapper'));

org.apache.commons.io.IOUtils.closeQuietly(os);
