try{
	glib.icns={
		check:[
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,1,1],
			[0,0,0,0,0,1,1,0],
			[0,0,0,0,1,1,0,0],
			[1,1,0,1,1,0,0,0],
			[0,1,1,1,0,0,0,0],
			[0,0,1,0,0,0,0,0]
		],
	};
	glib.makicn=function(id,os){
		if(id!=null){
			var width=64;
			var height=64;
			var pixarr=glib.icns[id];
			if(pixarr!=null){
				var bi=new java.awt.image.BufferedImage(
					width,
					height,
					java.awt.image.BufferedImage.TYPE_INT_ARGB
				);
				var g2d=bi.createGraphics();
				g2d.setColor(java.awt.Color.green);
				for(var i=0;i<pixarr.length;i++){
					for(var j=0;j<pixarr[i].length;j++){
						if(pixarr[i][j]==1){
							g2d.fillRect(
								j*width/pixarr[i].length,
								i*height/(pixarr.length),
								width/pixarr[i].length,
								height/(pixarr.length)
							);
						}
					}
				}
				var encoder=com.sun.image.codec.jpeg.JPEGCodec.createJPEGEncoder(new java.io.ByteArrayOutputStream());
				encoder.encode(bi);
				javax.imageio.ImageIO.write(bi,'png', os); 
				return null;

			}else{
				return 'Icon not found: id '+id;
			}

		}else{
			return 'makImage(string,outputstream): No image id specified';
		}
	};
	glib.makRGB=function(r,g,b){
		r=r<<16;
		g=g<<8;
		b=b<<0;
		return r+g+b;
	};
	glib.geticn=function(req,res,os){
		var id=req.getParameter("id");
		if(id!=null&&id!=''){
			var miret=null;//makImg(id,os);
			try{
				miret=glib.makicn(id,os);
			}catch(e){
				res.setContentType('text/plain');
				IOUtils.write(miret,os);
				IOUtils.closeQuietly(os);
			}
			if(miret==null){
				res.setContentType('image/png');
				IOUtils.closeQuietly(os);
			}else{
				res.setContentType('text/plain');
				IOUtils.write('Failed to generate Image ['+id+']: '+miret,os);
				IOUtils.closeQuietly(os);
			}
		}else{
			res.setContentType('text/plain');
			IOUtils.write('No id specified',os);
			IOUtils.closeQuietly(os);
		}
	};
	'glib.icns attached\n';
}catch(e){
	e;
}
