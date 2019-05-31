var println=function(a){
	org.apache.commons.io.IOUtils.write(a,os);
	org.apache.commons.io.IOUtils.write('\n',os);
}
urlClassLoader.addURL(
	new java.net.URL(
		'http://central.maven.org/maven2/org/apache/commons/commons-lang3/3.9/commons-lang3-3.9.jar'
	)
);
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
org.apache.commons.io.IOUtils.closeQuietly(os);
