try{
	glib.home=function(req,res,os){
		var hsr=res.getHttpServletResponse();
		hsr.sendRedirect('/rhtest?cmd=resopen&k=res/home.html');
	}
	'glib.home attached\n';
}catch(e){
	e;
}


