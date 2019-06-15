HOST=https://inovosandbox-sandbox.mxapps.io
ENDPOINT=/test
HOST=https://v7235-sandbox.mxapps.io
ENDPOINT=/main
URL=$(HOST)$(ENDPOINT)
CURL=curl
SRC=./src/a.js
all:
	@$(CURL) \
		$(URL) \
		-H "Content-type: application/javascript" \
		--data @$(SRC)
