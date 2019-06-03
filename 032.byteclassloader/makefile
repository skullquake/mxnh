HOST=https://nhutil-sandbox.mxapps.io
ENDPOINT=/rhtest
URL=$(HOST)$(ENDPOINT)
CURL=curl
SRC=./src/a.js
CLASSFILE=./res/A.class
.phony:post putres
post:
	@$(CURL) \
		--insecure \
		$(URL) \
		-H "Content-type: application/javascript" \
		--data-binary @$(SRC) \
		--output -
putres:
	cd ./java&&$(MAKE)
	cp ./java/src/*.class ./res
	$(CURL) \
		--insecure \
		"$(URL)?cmd=resput&k=A.class" \
		--data-binary @$(CLASSFILE) \
		--output - 
