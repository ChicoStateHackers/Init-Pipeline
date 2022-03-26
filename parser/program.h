#ifndef PROGRAM_H
#define PROGRAM_H

#include <string>
#include <cstdint>

#include "state.h"

class Program {

    private:
        uint64_t cur_line; 
        State cur_state; 

    public:
        // Constructor takes in the name of the file to be parsed
        Program(std::string file_name);
        ~Program();
        State go_to_line();
        State step_cycle();
        State back_cycle();

};

#endif 