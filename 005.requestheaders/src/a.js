var IOUtils=Java.class('org.apache.commons.io.IOUtils');
var hkey="Content-type";
var h=contentType=req.getHeader();
if(h!=null&&h!=''){
	IOUtils.write(hkey+': '+h+'\n',os);
}else{
	IOUtils.write(hkey+': NULL\n',os);
}
IOUtils.closeQuietly(os);


