var IOUtils=Java.type("org.apache.commons.io.IOUtils");
function print(a){
	var os=res.getOutputStream();
	IOUtils.write(a,os);
}
function println(a){
	print(a);
	print('\n');
}
var ds=com.mendix.core.Core.dataStorage();
ds.executeWithConnection(
	function(a){
		try{
			var stmnt;
			try{
				stmnt=a.prepareStatement(
					new java.lang.String(
						"create table foo(a int);"
					)
				);
				stmnt.execute();
			}catch(e){
				println(e);
			}
			try{
				for(var i=0;i<8;i++){
					stmnt=a.prepareStatement(
						new java.lang.String(
							"insert into foo values("+i+");"
						)
					);
					stmnt.execute();
				}
			}catch(e){
				println(e);
			}
			stmnt=a.prepareStatement(
				new java.lang.String(
					"select * from foo;"
				)
			);
			var rset=stmnt.executeQuery();
			var rsetmeta=rset.getMetaData();
			for(var i=0;i<rsetmeta.getColumnCount();i++){
				print(rsetmeta.getColumnName(i+1));
				if(i<rsetmeta.getColumnCount()-1)
					print(',')
			}
			println('');
			while(rset.next()){
				rsetmeta=rset.getMetaData();
				for(var i=0;i<rsetmeta.getColumnCount();i++){
					try{
						var a=rset.getString(new java.lang.String(rsetmeta.getColumnName(i+1)));
						print(a==null?'':a.toString());
					}catch(e){
					}
					if(i<rsetmeta.getColumnCount()-1)
						print(',')
				}
				println('');
			}
			rset.close();
		}catch(e){
			println(e);
		}
	}
);
