try{
	glib.resclr=function(req,res,os){
		var a=[];
		Object.keys(globaldata).forEach(
			function(k){
				delete globaldata[k];
			}
		);
		var hsr=res.getHttpServletResponse();
		hsr.sendRedirect('/rhtest?cmd=resls');
	}
	glib.resdel=function(req,res,os){
		var k=req.getParameter("key");
		var hsr=res.getHttpServletResponse();
		if(k!=null&&k!=''){
			delete globaldata[k];
			hsr.sendRedirect('/rhtest?cmd=resls');
		}else{
			glib.errPage(req,res,os,'No key specified');
		}
	}
	glib.resls=function(req,res,os){
		res.setContentType("text/html");
		IOUtils.write('<!DOCTYPE html><html><head></head><body>',os);
		IOUtils.write('<table>',os);
		IOUtils.write('<tr>',os);
		IOUtils.write('<td>',os);
		IOUtils.write('<a href="/rhtest?cmd=resclr">Clear All</a>',os);
		IOUtils.write('</td>',os);
		IOUtils.write('</tr>',os);
		Object.keys(globaldata).forEach(
			function(kdata){
				IOUtils.write('<tr>',os);
				try{
					IOUtils.write('<td>',os);
					IOUtils.write(kdata,os);
					IOUtils.write('</td>',os);

					IOUtils.write('<td style="text-align:right;">',os);
					try{
						IOUtils.write(
							globaldata[kdata].length<1024?globaldata[kdata].length+'b':globaldata[kdata].length<1024*1024?globaldata[kdata].length/1024+'k':globaldata[kdata].length/(1024*1024)+'M',
							os
						);
					}catch(e){
					}
					IOUtils.write('</td>',os);
					IOUtils.write('<td>',os);
					IOUtils.write('<a href="/rhtest?cmd=resopen&key='+kdata+'">Open</a>',os);
					IOUtils.write('<a href="/rhtest?cmd=resdel&key='+kdata+'">Delete</a>',os);
					IOUtils.write('</td>',os);
				}catch(e){
				}
				IOUtils.write('</tr>',os);
			}
		);
		IOUtils.write('</table>',os);
		IOUtils.write('</body></html>',os);
		IOUtils.closeQuietly(os);
	}
	glib.resopen=function(req,res,os){
		var k=req.getParameter("key");
		if(k!=null&&k!=''){
			res.setContentType('text/html');
			try{
				IOUtils.write(
					globaldata[k],
					os
				);
			}catch(e){
				IOUtils.write(e,os);
			}
		}else{
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
						globaldata[k]=IOUtils.toByteArray(is);
						IOUtils.write(globaldata[k].length+' bytes stored at data["'+k+'"]\n',os);
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
