var IOUtils=Java.type('org.apache.commons.io.IOUtils');
var pkey="foo";
var p=req.getParameter(pkey);
if(p!=null&&p!=''){
	IOUtils.write(pkey+': '+p+'\n',os);
}else{
	IOUtils.write(pkey+': NULL\n',os);
}
IOUtils.closeQuietly(os);


