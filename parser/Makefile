CXX      = g++
CXXFLAGS = -Wall -pedantic -g -std=c++11
BUILD    = ./build
OBJ_DIR  = $(BUILD)/objects
APP_DIR  = $(BUILD)/app
TARGET   = run 

all: build

build: main.o program.o instruction.o state.o 
	$(CXX) -o run main.o program.o instruction.o state.o

main.o: main.cpp program.h
	$(CXX) -c $(CXXFLAGS)  main.cpp 

program.o: program.cpp program.h state.h state.o
	$(CXX) -c $(CXXFLAGS)  program.cpp  

state.o: state.cpp state.h instruction.o
	$(CXX) -c $(CXXFLAGS)  state.cpp 

instruction.o: instruction.cpp instruction.h
	$(CXX) -c $(CXXFLAGS) instruction.cpp







clean: 
	rm *o $(TARGET) statefile.csv
