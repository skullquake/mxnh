try{
	glib.filename2mimetype=function(filename){
		var mimetype=null;
		if(filename.contains('.')){
			var fileext=filename.substring(filename.lastIndexOf(".")+1).toLowerCase();
			var omime={
			    "json"	: "application/json",
			    "png"	: "image/png",
			    "jpeg"	: "image/jpeg",
			    "jpg"	: "image/jpeg",
			    "pdf"	: "application/pdf",
			    "txt"	: "text/plain",
			    "csv"	: "text/csv",
			    "css"	: "text/css",
			    "yml"	: "text/plain",
			    "yaml"	: "text/plain",
			    "py"	: "text/plain",
			    "md"	: "text/plain",
			    "html"	: "text/html",
			    "htm"	: "text/html",
			    "js"	: "application/javascript"
			};
			Object.keys(omime).forEach(
			    function(k){
				if(k==fileext.toLowerCase()){
				    mimetype=omime[k];
				    return;
				}
			    }
			);   
			return mimetype;
		}else{
			mimetype="application/octet-stream";
		}
		return mimetype;
	};
	'glib.mime attached\n';
}catch(e){
	e;
}
