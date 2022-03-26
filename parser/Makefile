CXX      = g++
CXXFLAGS = -Wall -pedantic -g -std=c++11
BUILD    = ./build
OBJ_DIR  = $(BUILD)/objects
APP_DIR  = $(BUILD)/app
TARGET   = run 

all: build

build: main.o instruction.o
	$(CXX) -o $(BUILD)/$(TARGET) main.o

main.o: main.cpp
	$(CXX) -c $(CXXFLAGS)  main.cpp 

instruction.o: instruction.cpp instruction.h
	$(CXX) -c $(CXXFLAGS) instruction.cpp


clean: 
	rm *o $(TARGET)
