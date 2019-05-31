try{
	glib.home=function(req,res,os){
		var hsr=res.getHttpServletResponse();
			load('http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js');
			res.setContentType("text/html");
			IOUtils.write(
				_.template(
					new java.lang.String(gres['res/home.html']),
					{
						title:'Home Page',
						name:'John Doe',
						links:[
							{
								href:"/rhtest?cmd=resls",
								name:'Resources'
							},
							{
								href:'/rhtest?cmd=resopen&key=res/jvm.html&parse=true',
								name:'JVM'
							},
							{
								href:'/rhtest?cmd=resexec&key=res/packages.html',
								name:'Classes'
							},
							{
								href:'/rhtest?cmd=resexec&key=res/term.html',
								name:'Term'
							}

						]
					}
				),
				os
			);
			IOUtils.closeQuietly(os);
	}
	'glib.home attached\n';
}catch(e){
	e;
}
