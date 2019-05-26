var IOUtils=Java.class('org.apache.commons.io.IOUtils');
var pkey="foo";
var p=req.getParameter();
if(p!=null&&p!=''){
	IOUtils.write(pkey+': '+p+'\n',os);
}else{
	IOUtils.write(pkey+': NULL\n',os);
}
IOUtils.closeQuietly(os);


