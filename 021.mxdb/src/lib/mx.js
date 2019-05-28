try{
	glib.mxobj2json=function(o){
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
	glib.mxserialize=function(o){
		var ret=[];
		switch(typeof(o)){
		    case 'object':
			if(o.length!=null){
			    for(var i=0;i<o.length;i++){
				ret.push(glib.mxobj2json(o[i])); 
			    }
			}else{
			    return glib.mxobj2json(o);
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
