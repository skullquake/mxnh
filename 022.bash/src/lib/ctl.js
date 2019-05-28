try{
	glib.ctl=function(req,res,os){
		var os=res.getOutputStream();
		var method=(req.getHttpServletRequest().getMethod());
		switch(method){
			case 'GET':
			case 'POST':
				var cmd=req.getParameter("cmd");
				if(cmd==null){
					glib.home(req,res,os);
				}else{
					glib[cmd](req,res,os);
				}
				break;
			default:
				IOUtils.write('Unsupported Method',os);
				IOUtils.closeQuietly(os);
				break;
		};
	};
	'glib.ctl attached\n';
}catch(e){
	e;
}
