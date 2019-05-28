var IOUtils=Java.type("org.apache.commons.io.IOUtils");
try{
	glib.mx={};
	glib.mx.log=function(a){
		com.mendix.core.Core.getLogger('').info(o);
	};
	glib.mx.err=function(a){
		com.mendix.core.Core.getLogger('').error(o);
	};
	glib.mxobj2json=function(o,opts){
		var ret={};
		if(o!=null){
			try{
				var mob=o.getMetaObject();
				var arr_mp=mob.getMetaPrimitives();
				arr_mp.forEach(
					function(obj_mp){
						try{
							com.mendix.core.Core.getLogger('').info(obj_mp.name.class.getName());
							//rudimentary handling for date times that dont serialize straight
							if(o.getValue(root.getContext(),obj_mp.name).class.getName()=='java.util.Date'){
								ret[obj_mp.name]=o.getValue(root.getContext(),obj_mp.name).toString();
							}else{
								ret[obj_mp.name]=o.getValue(root.getContext(),obj_mp.name);
							}
							//todo: test for superclass System.FileDocument, validate opts{}
							try{
								if(opts.getFileContents==true){
									ret['contents']=IOUtils.toString(
										com.mendix.core.Core.getFileDocumentContent(
											root.getContext(),
											o
										),
										'UTF-8'
									);
								}
							}catch(e){
							}
						}catch(e){
							ret[obj_mp.name]=null;
						}
					}
				);                        
			}catch(e){
				ret.error=e.toString();
			}           
		}else{
		}
		return ret;
	};
	glib.mxserialize=function(o,opts){
		var ret=[];
		switch(typeof(o)){
		    case 'object':
			if(o.length!=null){
			    for(var i=0;i<o.length;i++){
				ret.push(glib.mxobj2json(o[i],opts)); 
			    }
			}else{
			    return glib.mxobj2json(o,opts);
			}
			break;
		    default:
			return {'error':'serialization error'};
			break;
		}
	    return ret;
	};
	'glib.mx attached\n';
}catch(e){
	e;
}
