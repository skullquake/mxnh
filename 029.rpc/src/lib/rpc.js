try{
	glib.jsonrpc=function(req,res,os){
		var configuration={
			"sdversion": "1.0",
			"name": "DemoService",
			"address": "/rhtest",
			"id":"urn:md5:4e39d82b5acc6b5cc1e7a41b091f6590",
			"procs" :[
				{"name":"echo","params":["string"]},
				{"name":"lsdat","params":[]},
				{"name":"lsmf","params":[]},
				{"name":"lsmod","params":[]},
				{"name":"mfexec","params":["string"]},
				{"name":"xpath","params":["string"]},
				{"name":"eval","params":["string"]},
				{"name":"wget","params":["string"]},
				{"name":"nh","params":["string"]}
			]
		};
		var method=(req.getHttpServletRequest().getMethod());
		switch(method){
			case 'POST':
				try{
					var is=req.getInputStream();
					//var scanner = new java.util.Scanner(is,"UTF-8").useDelimiter("\\A");
					//var s=scanner.hasNext() ? scanner.next() : "";
					var s=IOUtils.toString(is,'UTF-8');
					try{
						var body=JSON.parse(s);
						if(body.id!=null){
							switch(body.method){
								case 'system.describe':
									res.setContentType("application/json");
									IOUtils.write(JSON.stringify(configuration),os);
									IOUtils.closeQuietly(os);
									break;
								case 'echo':
									if(body.params!=null&&Array.isArray(body.params)){
										var ret={"jsonrpc": "2.0", "result": body.params.join(' '), "id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										res.setContentType("application/json");
										res.setContentType(JSON.stringify({'err':'No arguments'}));
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'xpath':
									var start=new Date();
									if(body.params!=null&&Array.isArray(body.params)){
										var ret={"jsonrpc": "2.0", "id": body.id};
										try{
											arr_obj=com.mendix.core.Core.retrieveXPathQuery(
												root.getContext(),
												body.params[0],
												32,
												0,
												{}
											);
											//ret["result"]=arr_obj.toString();
											//ret["result"]=mxserialize(arr_obj);
											var end=new Date();
											ret["result"]="Done ["+(end-start)/1000+" ms]\n"
											ret["result"]+=JSON.stringify(
												glib.mxserialize(arr_obj),
												0,
												'\t'
											);
											
										}catch(e){
											var end=new Date();
											ret["result"]="Done ["+(end-start)/1000+" ms]\n"
											ret["result"]+=e.toString();
										}
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										var ret={"jsonrpc": "2.0", 'result':'No args',"id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'mfexec':
									var ret={"jsonrpc": "2.0", "id": body.id};
									if(body.params!=null&&Array.isArray(body.params)){
										var start=new Date();
										//attempt serialization
										try{
											var mfret=com.mendix.core.Core.execute(root.getContext(),body.params[0],{})
											if(mfret!=null){
												if(mfret.class!=null){
													if(mfret.class.toString().indexOf('MendixObjectImpl')>0){
														var end=new Date();
														ret["result"]='Done ['+(end-start)/1000+' ms]:\n';
														ret["result"]+=JSON.stringify(glib.mxserialize(mfret),0,'\t');
													}else{
														var end=new Date();
														ret["result"]='Done ['+(end-start)/1000+' ms]:\n';
														ret["result"]+=mfret;//.class.toString();
													}
												}else{
													var end=new Date();
													ret["result"]='Done ['+(end-start)/1000+' ms]:\n';
													ret["result"]+=mfret;
												}
											}else{
												var end=new Date();
												ret["result"]='Done ['+(end-start)/1000+' ms]:\n';
												ret["result"]+='(VOID)';
											}

										}catch(e){
											var end=new Date();
											ret["result"]='Done ['+(end-start)/1000+' ms]:\n';
											ret["result"]+=e.toString();
										}
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										var ret={"jsonrpc": "2.0", 'result':'No args',"id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'eval':
									if(body.params!=null&&Array.isArray(body.params)){
										var ret={"jsonrpc": "2.0", "id": body.id};
										try{
											ret["result"]=com.mendix.core.Core.evaluateExpression(
												root.getContext(),
												{
												},
												body.params[0]
											);
										}catch(e){
											 ret["result"]=e.toString();
										}
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										var ret={"jsonrpc": "2.0", 'result':'No args',"id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'nh':
									if(body.params!=null&&Array.isArray(body.params)){
										var ret={"jsonrpc": "2.0", "id": body.id};
										try{
											ret["result"]=eval(
												body.params[0]
											);
										}catch(e){
											 ret["result"]=e.toString();
										}
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										var ret={"jsonrpc": "2.0", 'result':'No args',"id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'wget':
									if(body.params!=null&&Array.isArray(body.params)){
										var ret={"jsonrpc": "2.0", "id": body.id};
										try{
											url=body.params[0]
											function httpGet(urlP,objHdr){
												var arrHdr=[];
												Object.keys(objHdr).forEach(
												    function(k){
													arrHdr.push(
														new com.mendix.integration.HttpHeader(
															k,
															objHdr[k]
														)
													);
												    }
												);   
												var resp=com.mendix.core.Core.integration().executeHttpRequest(
													new java.net.URI(urlP),
													com.mendix.integration.HttpMethod.GET,
													arrHdr,
													null
												);
												return IOUtils.toString(resp.getContent(), java.nio.charset.StandardCharsets.UTF_8);
											}
											var ret_get=httpGet(
												url,
												{
												    "Content-type":"application/json"
												}
											);
											ret["result"]=ret_get;
										}catch(e){
											 ret["result"]=e.toString();
										}
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.closeQuietly(os);
									}else{
										var ret={"jsonrpc": "2.0", 'result':'No args',"id": body.id};
										res.setContentType("application/json");
										IOUtils.write(JSON.stringify(ret),os);
										IOUtils.write(JSON.stringify(configuration),os);
										IOUtils.closeQuietly(os);
									}
									break;
								case 'lsdat':
									var str_ret="";
									Object.keys(gres).forEach(
										function(k){
											str_ret+=k+'\n';
										}
									);
									var ret={"jsonrpc": "2.0", "result": str_ret, "id": body.id};
									res.setContentType("application/json");
									IOUtils.write(JSON.stringify(ret),os);
									IOUtils.closeQuietly(os);
									break;
								case 'lsmod':
									var str_ret="";
									try{
										var ret=[];
										var arr_mob=com.mendix.core.Core.getMetaObjects();
										arr_mob.forEach(
											function(obj_mob){
												ret.push(obj_mob.name);
											}
										);
										str_ret=ret.sort().join('\n');
									}catch(e){
										str_ret=e.toString();
									}
									var ret={"jsonrpc": "2.0", "result": str_ret, "id": body.id};
									res.setContentType("application/json");
									IOUtils.write(JSON.stringify(ret),os);
									IOUtils.closeQuietly(os);
									break;
								case 'lsmf':
									var str_ret="";
									try{
										var ret=[];
										var arr_mf=com.mendix.core.Core.getMicroflowNames();
										arr_mf.forEach(
											function(obj_mf){
												ret.push(obj_mf);
											}
										);
										ret=ret.sort();
										str_ret=ret.join('\n');
									}catch(e){
										str_ret=e.toString();
									}
									res.setContentType("application/json");
									var ret={"jsonrpc": "2.0", "result": str_ret, "id": body.id};
									IOUtils.write(JSON.stringify(ret),os);
									IOUtils.closeQuietly(os);
									break;
								default:
									res.setContentType("application/json");
									var ret={"jsonrpc": "2.0", "result": 'Invalid method', "id": body.id};
									IOUtils.write(JSON.stringify(ret),os);
									IOUtils.closeQuietly(os);
							};
						}else{
							res.setContentType("application/json");
							var ret={"jsonrpc": "2.0", "result": 'No id specified', "id": null};
							IOUtils.write(JSON.stringify(ret),os);
							IOUtils.closeQuietly(os);
						}
						//IOUtils.write(JSON.stringify(body,0,'\t'),os);
					}catch(e){
						res.setContentType("application/json");
						var ret={"jsonrpc": "2.0", "result": 'Failed to parse JSON: '+e, "id":''};
						IOUtils.write(JSON.stringify(ret),os);
						IOUtils.closeQuietly(os);
					}
					IOUtils.closeQuietly(os);
				}catch(e){
					IOUtils.write(e,os);
					IOUtils.closeQuietly(os);
				}
				break;
			default:
				res.setContentType("application/json");
				var ret={"jsonrpc": "2.0", "result": 'Unsupported Method: '+e, "id": body.id};
				IOUtils.write(JSON.stringify(ret),os);
				IOUtils.closeQuietly(os);
				break;
		};
	};
this.parent=gres;
	'glib.rpc attached\n';
}catch(e){
	e;
}
