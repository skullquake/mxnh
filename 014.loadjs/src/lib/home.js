try{
	glib.home=function(req,res,os){
		var hsr=res.getHttpServletResponse();
			load('http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js');
			res.setContentType("text/html");
			IOUtils.write(
				_.template(
					'<DOCTYPE! html>\n'+
					'	<html>\n'+
					'		<head>\n'+
					'			<title>\n'+
					'				<%= title %>\n'+
					'			</title>\n'+
					'		</head>\n'+
					'	<body>\n'+
					'		<h3>\n'+
					'			Welcome <%= name %>\n'+
					'		</h3>\n'+
					'	</body>\n'+
					'</html>',
					{
						title:'Home Page',
						name:'John Doe'
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


