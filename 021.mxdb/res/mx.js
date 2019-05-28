try{
	var IOUtils=Java.type("org.apache.commons.io.IOUtils");
	//create object
	var obj=com.mendix.core.Core.instantiate(
		root.getContext(),
		'System.FileDocument'
	);
	//alter field values
	obj.setValue(root.getContext(),'Name','Test');
	//populate contents
	com.mendix.core.Core.storeFileDocumentContent(
		root.getContext(),
		obj,
		obj.getValue(root.getContext(),'Name'),
		new java.io.ByteArrayInputStream(
			new java.lang.String("Lorem ipsum").getBytes(java.nio.charset.StandardCharsets.UTF_8)
		)
	);
	//commit object
	com.mendix.core.Core.commit(root.getContext(),obj);
	//retrieve objects
	var xpath="//System.FileDocument[Name='Test']";
	var pagesize=1024;
	var offset=0;
	var sort={"createdDate":"DESC"};
	var arr=com.mendix.core.Core.retrieveXPathQuery(
		root.getContext(),
		xpath,
		pagesize,
		offset,
		sort
	);
	var ret={};
	ret.xpath=xpath;
	ret.pagesize=pagesize;
	ret.offset=offset;
	ret.sort=sort;
	if(arr.length>0){
		ret.result=glib.mxserialize(arr,{getFileContents:true});// ./src/lib/mx.js utility json converter, also demos reading content
	}else{
		ret.result=arr.length;;//"NO RESULTS";
	}
	//delete objects
	com.mendix.core.Core.delete(root.getContext(),arr);
	//return
	res.setContentType('application/json');
	IOUtils.write(JSON.stringify(ret),os);
}catch(e){
	res.setContentType('application/json');
	IOUtils.write({'err':e},os);
	IOUtils.write(e,os);
}
IOUtils.closeQuietly(os);
