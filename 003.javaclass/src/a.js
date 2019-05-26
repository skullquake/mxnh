var IOUtils=Java.class('org.apache.commons.io.IOUtils');
var _String=Java.class('java.lang.String');
IOUtils.write(new _String('Hello world'),os);
IOUtils.closeQuietly(os);
