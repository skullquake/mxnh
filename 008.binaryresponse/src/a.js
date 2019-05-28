var IOUtils=Java.type('org.apache.commons.io.IOUtils');
//--------------------------------------------------------------------------------
//util
//--------------------------------------------------------------------------------
function Int8Array2ByteBuffer(ui8a) {
	var bb=java.nio.ByteBuffer.allocate(ui8a.length);
	for(var i=0;i<ui8a.length;i++) {
		bb.put(ui8a[i]);
	}
	return bb;
}
//--------------------------------------------------------------------------------
//demos
//--------------------------------------------------------------------------------
function ex0(){
	//regular java byte[]
	var ByteArray=Java.type('byte[]');
	var ba=new ByteArray(128);
	for(var i=0;i<ba.length;i++)
		ba[i]=i;
	IOUtils.write(ba,os);
	res.addHeader("Content-type","application/octent-stream");
	IOUtils.closeQuietly(os);

}

function ex1(){
	//java nio byteBuffer
	var bb=java.nio.ByteBuffer.allocate(128);
	for(var i=0;i<bb.capacity();i++)
		bb.put(i);
	IOUtils.write(bb.array(),os);

	res.addHeader("Content-type","application/octent-stream");
	IOUtils.closeQuietly(os);

}
function ex2(){
	//Int8Array JS type
	var i8a=new Int8Array(128);
	for(var i=0;i<i8a.length;i++)
		i8a[i]=i;
	IOUtils.write(Int8Array2ByteBuffer(i8a).array(),os);
	res.addHeader("Content-type","application/octent-stream");
	IOUtils.closeQuietly(os);

}
//--------------------------------------------------------------------------------
//demo
//--------------------------------------------------------------------------------
ex2();
