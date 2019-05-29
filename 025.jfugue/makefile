HOST=https://nhutil-sandbox.mxapps.io
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
