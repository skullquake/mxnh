try{
	glib.exec=function(req,res,os){
		var method=(req.getHttpServletRequest().getMethod());
		switch(method){
			case 'GET':
				res.setContentType('text/plain');
				IOUtils.write('Unimplemented',os);
				IOUtils.closeQuietly(os);
				break;
			case 'POST':
				switch(req.getHeader("Content-type")){
					case 'application/javascript':
						try{
							var is=req.getInputStream();
							glib.execjs(req,res,os,IOUtils.toByteArray(is),req.getParameter("args"));
						}catch(e){
							res.setContentType('text/plain');
							IOUtils.write('Invalid Method',os);
							IOUtils.closeQuietly(os);
						}
						break;
					case 'text/html':
						try{
							var is=req.getInputStream();
							glib.exechtml(req,res,os,IOUtils.toByteArray(is),req.getParameter("args"));
						}catch(e){
							res.setContentType('text/plain');
							IOUtils.write('Invalid Method',os);
							IOUtils.closeQuietly(os);
						}
						break;

						break;
				}
				break;
			default:
				res.setContentType('text/plain');
				IOUtils.write('Invalid Method',os);
				IOUtils.closeQuietly(os);
				break;
		}

	}
	glib.execjs=function(req,res,os,r,args){
		try{
							
			var bindings={
				'req':req,
				'res':res,
				'os':os,
				'is':req.getInputStream(),
				'args':args?args:null,
				'IOUtils':IOUtils,
				'glib':glib,
				'gres':gres,
				'urlClassLoader':urlClassLoader
			};
			var e=engine.getFactory().getScriptEngine(urlClassLoader);//ByName("nashorn");
			e.eval(
				new java.lang.String(r),//;//gres[k])
				bindings
			);
		}catch(e){
			res.setContentType('text/plain');
			IOUtils.write(e,os);
		}
	};
	glib.exechtml=function(req,res,os,r){
		var ScriptEngine                        =Java.type('javax.script.ScriptEngine');
		var ScriptEngineManager                 =Java.type('javax.script.ScriptEngineManager');
		var ScriptException                     =Java.type('javax.script.ScriptException');
		var Binding                             =Java.type('javax.script.Bindings');
		try{
			var is=req.getInputStream();
			var cl=new java.net.URLClassLoader([new java.net.URL('https://jsoup.org/packages/jsoup-1.12.1.jar')]);
			var cls=cl.loadClass("org.jsoup.Jsoup");
			var doc=cls.getMethod(
					'parse',
					java.lang.String.class
				).invoke(
					null,
					new java.lang.String(r)
				)
			var scriptElements=doc.getElementsByTag("script");
			scriptElements.forEach(
				function(a){
					var type=a.attr("type");
					if(type.contentEquals("text/nashorn")){
						var nashorn=engine.getFactory().getScriptEngine(urlClassLoader);//ByName("nashorn");
						try{
							engine.eval(
								a.dataNodes()[0].toString(),
								{
									'req':req,
									'res':res,
									'os':os,
									'is':is,
									'cl':cl,
									'doc':doc,
									'IOUtils':IOUtils,
									'glib':glib,
									'gres':gres,
									'this':a,
									'urlClassLoader':urlClassLoader
								}
							);
							//clear contents
							a.html('');
						}catch(e){
							a.html(e);
						}
						a.unwrap();
					}
				}
			);
			IOUtils.write(doc,os);
		}catch(e){
			IOUtils.write(e,os);
		}
	};
	'glib.exec attached\n';
}catch(e){
	res.setContentType('text/plain');
	IOUtils.write(e,os);
}
