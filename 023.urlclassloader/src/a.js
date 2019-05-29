urlClassLoader.addURL(new java.net.URL('https://jsoup.org/packages/jsoup-1.12.1.jar'));
//show class
org.apache.commons.io.IOUtils.write(Java.type('org.jsoup.Jsoup'),os);
//test class
org.apache.commons.io.IOUtils.write(org.jsoup.Jsoup.connect('http://en.wikipedia.org/').get(),os);
org.apache.commons.io.IOUtils.closeQuietly(os);
