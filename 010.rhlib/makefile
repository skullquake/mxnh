HOST=https://nhutil-sandbox.mxapps.io
BOOTENDPOINT=/main
ENDPOINT=/main
EXECENDPOINT=/rhtest
BOOTURL=$(HOST)$(BOOTENDPOINT)
EXECURL=$(HOST)$(EXECENDPOINT)
CURL=curl
ASYNC=
# --------------------------------------------------------------------------------
# recursive pure make util
# --------------------------------------------------------------------------------
rwildcard=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))
# --------------------------------------------------------------------------------
	# MAIN 
SRCMAIN=./src/main.js
TGTMAIN=./src/main.js.timestamp
	# LIBS
SRCLIB=$(filter-out %.timestamp,$(shell find -L ./src/lib -name '*.js'))
TGTLIB=$(patsubst ./src/lib/%,./src/lib/%.timestamp, $(SRCLIB))
all:\
	$(TGTLIB)\
	$(TGTMAIN)
./src/lib/%.timestamp:./src/lib/% $(TGTMAIN)
	@( \
		$(CURL) \
			--insecure \
			"$(EXECURL)" \
			-H "Content-type: application/javascript" \
			--data-binary @$< \
			--output - &&\
		touch $@ \
	)

$(TGTMAIN):$(SRCMAIN)
	@$(CURL) \
		--insecure \
		$(BOOTURL) \
		-H "Content-type: application/javascript" \
		--data-binary @$(SRCMAIN)
	@printf "\n"
	@touch $(TGTMAIN)
.phony:clean
clean:
	rm $(TGTMAIN) $(TGTLIB)
stop:
	@$(CURL) \
		--insecure \
		$(BOOTURL) \
		-H "Content-type: application/javascript" \
		--data-binary @$(SRCSTOP)
	@printf "\n"
