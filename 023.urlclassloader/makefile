HOST=https://inovosandbox-sandbox.mxapps.io
HOST=https://nhutil-sandbox.mxapps.io
HOST=http://192.168.8.105:8080
HOST=http://192.168.2.228:8080
ENDPOINT=/foo
ENDPOINT=/main
URL=$(HOST)$(ENDPOINT)
CURL=curl
SRC=./src/a.js
.phony:POST
POST:
	@$(CURL) \
		--insecure \
		$(URL) \
		-H "Content-type: application/javascript" \
		--data-binary @$(SRC) \
		--output -
