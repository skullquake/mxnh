var IOUtils=Java.type('org.apache.commons.io.IOUtils');
var b=java.nio.ByteBuffer.allocate(128);
for(var i=0;i<b.capacity();i++)
	b.put(i);
IOUtils.write(b.array(),os);
res.addHeader("Content-type","application/octent-stream");
IOUtils.closeQuietly(os);

