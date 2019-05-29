
urlClassLoader.addURL(new java.net.URL('http://192.168.2.228:8081/jsoup/jsoup-1.12.1.jar'));
urlClassLoader.addURL(new java.net.URL('http://192.168.2.228:8081/jsyn/jsyn-20171016.jar'));
org.apache.commons.io.IOUtils.write(Java.type('org.jsoup.Jsoup'),os)
org.apache.commons.io.IOUtils.write("\n",os);
org.apache.commons.io.IOUtils.write(Java.type('org.apache.commons.io.IOUtils'),os);
org.apache.commons.io.IOUtils.write("\n",os);
org.apache.commons.io.IOUtils.write(Java.type('com.jsyn.JSyn'),os);
org.apache.commons.io.IOUtils.write("\n",os);
org.apache.commons.io.IOUtils.closeQuietly(os);
