var IOUtils=Java.type("org.apache.commons.io.IOUtils");
var cl=new java.net.URLClassLoader([new java.net.URL('https://jsoup.org/packages/jsoup-1.12.1.jar')]); 
var cls = cl.loadClass("org.jsoup.Jsoup");
IOUtils.write(cls.getMethod('connect',java.lang.String.class).invoke(null,'http://en.wikipedia.org/').get(),os);
IOUtils.closeQuietly(os);
