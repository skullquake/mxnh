var IOUtils				=Java.type("org.apache.commons.io.IOUtils");
var RequestHandler			=Java.type('com.mendix.externalinterface.connector.RequestHandler');
var ep					='rhtest';
var gres=gres||{};
var glib=glib||{};
com.mendix.core.Core.addRequestHandler(
	ep,
	new(
		Java.extend(
			RequestHandler,
			{
				processRequest:function(req,res,pth){
					var os=res.getOutputStream();
					var method=(req.getHttpServletRequest().getMethod());
					var contentType=null;
					try{
						contentType=req.getHeader("Content-type");
					}catch(e){
					}
					var is=req.getInputStream();
					try{
						if(method=='POST'&&contentType=='application/javascript'){
							var s=new java.util.Scanner(is).useDelimiter("\\A");
							var script=s.hasNext() ? s.next() : "";
							var ret=eval(script);
							if(ret!=null){
								IOUtils.write(ret.toString(),os);
								IOUtils.closeQuietly(os);
							}
							IOUtils.closeQuietly(os);
						}else{
							glib.ctl(req,res,os);
						}
					}catch(e){
						IOUtils.write(e,os);
						IOUtils.closeQuietly(os);
					}
				},
				getRequest:function(){
					var ctx=root.getContext();
					var rrq=ctx.getRuntimeRequest();
					var oerrq=rrq.orElse(null);
					if(oerrq!=null){
						return oerrq.getHttpServletRequest();
					}else{
						return null;
					}
				},
				getResponse:function (){
					var rrs=root.getContext().getRuntimeResponse();
					var oerrs=rrs.orElse(null);
					if(oerrs!=null){
						return oerrs.getHttpServletResponse();
					}else{
						return null;
					}
				},
				data:{},
				lib:{}
			}
		)
	)
);
var end=new Date();
IOUtils.write(
	'/'+ep+' started\n',
	os
);
IOUtils.closeQuietly(os);
