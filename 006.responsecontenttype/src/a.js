var IOUtils=Java.type('org.apache.commons.io.IOUtils');
res.setContentType('application/json');
IOUtils.write(JSON.stringify({'foo':'bar'}),os);
IOUtils.closeQuietly(os);


