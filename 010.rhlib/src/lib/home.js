try{
	glib.home=function(req,res,os){
		IOUtils.write('<!DOCTYPE html><head><title>Home</title></head><body><h3>Home</h3></body></html>',os)
		IOUtils.closeQuietly(os);
	}
	'glib.home attached\n';
}catch(e){
	e;
}


