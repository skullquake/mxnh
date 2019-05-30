try{
	glib.resclr=function(req,res,os){
		var a=[];
		Object.keys(gres).forEach(
			function(k){
				delete gres[k];
			}
		);
		var hsr=res.getHttpServletResponse();
		hsr.sendRedirect('/rhtest?cmd=resls');
	}
	glib.resdel=function(req,res,os){
		var k=req.getParameter("key");
		var hsr=res.getHttpServletResponse();
		if(k!=null&&k!=''){
			delete gres[k];
			hsr.sendRedirect('/rhtest?cmd=resls');
		}else{
			glib.errPage(req,res,os,'No key specified');
		}
	}
	glib.resls=function(req,res,os){
		var dat={};
		dat.title='Resources';
		dat.hrefClear="/rhtest?cmd=resclr";
		dat.resources=[];
		Object.keys(gres).forEach(
			function(kdata){
				try{
					var resource={};
					resource.name=kdata;
					resource.size=gres[kdata].length<1024?gres[kdata].length+'b':gres[kdata].length<1024*1024?gres[kdata].length/1024+'k':gres[kdata].length/(1024*1024)+'M';
					resource.hrefopen='/rhtest?cmd=resopen&key='+kdata;
					resource.hrefdelete='/rhtest?cmd=resdel&key='+kdata;
					if(glib.filename2mimetype(kdata)=='application/javascript'){
						resource.hrefexec='/rhtest?cmd=resexec&key='+kdata;
					}else if(glib.filename2mimetype(kdata)=='text/html'){
						resource.hrefexec='/rhtest?cmd=resexec&key='+kdata;
					}else{
						resource.executable=false;
					}
					dat.resources.push(resource);
				}catch(e){
				}
			}
		);
		load('http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js');
		res.setContentType("text/html");
		IOUtils.write(
			_.template(
				new java.lang.String(gres['res/res.html']),
				dat
			),
			os
		);
		IOUtils.closeQuietly(os);
	}
	glib.resopen=function(req,res,os){
		var k=req.getParameter("key");
		if(k!=null&&k!=''){
			var parse=req.getParameter("parse")||false;
			if(parse){
				try{
					load('http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js');
					res.setContentType("text/html");
					IOUtils.write(
						_.template(
							new java.lang.String(gres[k]),
							{}
						),
						os
					);
				}catch(e){
					res.setContentType('text/plain');
					IOUtils.write(e,os);
				}
			}else{
				try{
					res.setContentType(glib.filename2mimetype(k));
					IOUtils.write(
						gres[k],
						os
					);
				}catch(e){
					res.setContentType('text/plain');
					IOUtils.write(e,os);
				}
			}
		}else{
			res.setContentType('text/plain');
			IOUtils.write('No Key',os);
		}
		IOUtils.closeQuietly(os);
	}
	glib.resexec=function(req,res,os){
		var k=req.getParameter("key");
		if(k!=null&&k!=''){
			switch(glib.filename2mimetype(k)){
				case 'application/javascript':
					glib.execjs(req,res,os,gres[k],req.getParameter("args"))
					/*
					try{
						eval(
							new java.lang.String(gres[k])
						);
					}catch(e){
						res.setContentType('text/plain');
						IOUtils.write(e,os);
					}
					*/
					break;
				case 'text/html':
					glib.exechtml(req,res,os,gres[k])
					/*
					var ScriptEngine                        =Java.type('javax.script.ScriptEngine');
					var ScriptEngineManager                 =Java.type('javax.script.ScriptEngineManager');
					var ScriptException                     =Java.type('javax.script.ScriptException');
					var Binding                             =Java.type('javax.script.Bindings');
					try{
						var cl=new java.net.URLClassLoader([new java.net.URL('https://jsoup.org/packages/jsoup-1.12.1.jar')]);
						var cls=cl.loadClass("org.jsoup.Jsoup");
						var doc=cls.getMethod(
								'parse',
								java.lang.String.class
							).invoke(
								null,
								new java.lang.String(gres[k])
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
												'cl':cl,
												'doc':doc,
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
					*/
					break;
				default:
					res.setContentType('text/plain');
					IOUtils.write('invalid mime',os);
					break;
			}

		}else{
			res.setContentType('text/plain');
			IOUtils.write('No Key',os);
		}
		IOUtils.closeQuietly(os);
	}

	glib.resput=function(req,res,os){
		var method=(req.getHttpServletRequest().getMethod());
		var k=req.getParameter("k");
		if(k!=null){
			switch(method){
				case 'POST':
					try{
						var is=req.getInputStream();
						gres[k]=IOUtils.toByteArray(is);
						IOUtils.write(gres[k].length+' bytes stored at data["'+k+'"]\n',os);
						IOUtils.closeQuietly(os);
					}catch(e){
						IOUtils.write(e,os);
						IOUtils.closeQuietly(os);
					}
					break;
						IOUtils.write('Invalid Method',os);
						IOUtils.closeQuietly(os);
				default:
			};
		}else{
			IOUtils.write('Invalid Args:\n',os);
			IOUtils.write(k==null?'\tk not specified\n':'',os);
		}

	}
	'glib.res functions attached\n';
}catch(e){
	e;
}

