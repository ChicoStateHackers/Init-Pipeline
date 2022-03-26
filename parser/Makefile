CXX      = g++
CXXFLAGS = -Wall -pedantic -g -std=c++11
BUILD    = ./build
OBJ_DIR  = $(BUILD)/objects
APP_DIR  = $(BUILD)/app
TARGET   = run 

all: build

build: instruction.o
	$(CXX) -o $(BUILD)/$(TARGET) main.o

instruction.o: instruction.cpp instruction.h
	$(CXX) -c $(CXXFLAGS) instruction.cpp


clean: 
	rm *o $(TARGET)
