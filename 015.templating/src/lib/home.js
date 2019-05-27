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
								href:"https://www.google.com",
								name:'Google'
							},
							{
								href:"https://www.dukdukgo.com",
								name:'DukDukGo'
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
