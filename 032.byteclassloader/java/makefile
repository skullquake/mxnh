JAVAC=ecj
SRC=./src/A.java
DX=dx
TGTCLASS=./src/A.class
TGTDEX=./src/A.dex
all:$(TGTCLASS)
$(TGTCLASS):$(SRC)
	$(JAVAC) $(SRC)
$(TGTDEX):$(TGTCLASS)
	cd ./src&&$(DX) --dex --output=B.dex A.class
.phony:clean
clean:
	rm ./src/*.class ./src/*.dex
