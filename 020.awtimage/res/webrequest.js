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

function httpPost(urlP,objHdr,bod){
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
		com.mendix.integration.HttpMethod.POST,
		arrHdr,
		org.apache.commons.io.IOUtils.toInputStream(bod, "UTF-8")
	);
	return IOUtils.toString(resp.getContent(), java.nio.charset.StandardCharsets.UTF_8);
}
var ret_get=httpGet(
        "http://httpbin.org/get",
        {
            "Content-type":"application/json"
        }
    );
var ret_post=httpPost(
        "http://httpbin.org/post",
        {
            "Content-type":"application/json"
        },
        JSON.stringify({
            "aqwer":1
        })
    );
//populate template via underscore
res.setContentType('text/html');
IOUtils.write(
	_.template(
		new java.lang.String(gres['res/webrequest.html']),
		{
			"ret_get":ret_get,
			"ret_post":ret_post
		}
	),
	os
);
IOUtils.closeQuietly(os);

