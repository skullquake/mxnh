var IOUtils=Java.type('org.apache.commons.io.IOUtils');
var _String=Java.type('java.lang.String');
IOUtils.write(new _String('Hello world'),os);
IOUtils.closeQuietly(os);
