var IOUtils=Java.type('org.apache.commons.io.IOUtils');
var hkey="Content-type";
var h=contentType=req.getHeader(hkey);
if(h!=null&&h!=''){
	IOUtils.write(hkey+': '+h+'\n',os);
}else{
	IOUtils.write(hkey+': NULL\n',os);
}
IOUtils.closeQuietly(os);


