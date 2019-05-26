//in progress
var IOUtils				=Java.type("org.apache.commons.io.IOUtils");
var RequestHandler			=Java.type('com.mendix.externalinterface.connector.RequestHandler');
var ep='rhtest';
com.mendix.core.Core.addRequestHandler(
	ep,
	new(Java.extend(
		RequestHandler,
		{
			processRequest:function(req,res,pth){
				var os=res.getOutputStream();
				IOUtils.write('rhtest',os);
				IOUtils.closeQuietly(os);
			},
		}
	))
);
IOUtils.write('request handler started at '+ep,os);
IOUtils.closeQuietly(os);
