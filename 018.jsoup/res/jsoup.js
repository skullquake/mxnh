var ScriptEngine                        =Java.type('javax.script.ScriptEngine');
var ScriptEngineManager                 =Java.type('javax.script.ScriptEngineManager');
var ScriptException                     =Java.type('javax.script.ScriptException');
var Binding                             =Java.type('javax.script.Bindings');


function print(a){
	IOUtils.write(a,os);
}

function getMethodsByObject(c){
    var r={};
    try{
        r.classmethods=[];
        var methods=c.getMethods();
        for(var i=0;i<methods.length;i++){
            var mobj={};
            mobj.name=methods[i].getName();
            var parametersobj=[];
            var parameters=methods[i].getParameterTypes();
            for(var j=0;j<parameters.length;j++){
                parametersobj.push(parameters[j].getName().toString());
            }
            mobj.parameters=parametersobj;
            r.classmethods.push(mobj);
        }
    }catch(e){
        r.error=e.toString();
    }
    return r;
}


try{
	//var TextNode=cl.loadClass("org.jsoup.nodes.TextNode");
	//var tn=TextNode.getConstructor(java.lang.String.class).newInstance('<i>text</i>');
	var IOUtils=Java.type("org.apache.commons.io.IOUtils");
	var cl=new java.net.URLClassLoader([new java.net.URL('https://jsoup.org/packages/jsoup-1.12.1.jar')]);
	var cls=cl.loadClass("org.jsoup.Jsoup");
	var doc=cls.getMethod(
			'parse',
			java.lang.String.class
		).invoke(
			null,
			new java.lang.String(gres['res/jsouptest.html'])
		)
	var scriptElements=doc.getElementsByTag("script");
	scriptElements.forEach(
		function(a){
		var nashorn=new ScriptEngineManager().getEngineByName("nashorn");
			var nashorn=new ScriptEngineManager().getEngineByName("nashorn");
			try{
				engine.eval(
					a.dataNodes()[0].toString(),
					{
						'req':req,
						'res':res,
						'os':os,
						'cl':cl,
						'doc':doc,
						'this':a
					}
				);
				//clear contents
				a.html('');
			}catch(e){
				a.html(e);
			}
			a.unwrap();
		}
	);
	IOUtils.write(doc,os);
	IOUtils.closeQuietly(os);
}catch(e){
	IOUtils.write(e,os);
	IOUtils.closeQuietly(os);
}
