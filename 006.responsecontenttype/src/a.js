var IOUtils=Java.class('org.apache.commons.io.IOUtils');
res.setContentType('application/json');
IOUtils.write(JSON.stringifiy({'foo':'bar'}),os);
IOUtils.closeQuietly(os);


