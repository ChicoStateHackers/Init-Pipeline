#ifndef PROGRAM_H
#define PROGRAM_H

#include <string>
#include <cstdint>
#include <vector>

#include "state.h"

class Program {

    private:
        std::string input_asm; 
        std::vector<std::string> instructions_vec;
        uint64_t cur_line; 
        State cur_state; 

    public:
        // Constructor takes in the name of the file to be parsed
        //Program();
        Program(std::string file_name);
        ~Program();
        State go_to_line(uint64_t ln);
        State step_cycle();
        State back_cycle();

        void print_instructions();

        void generate_state_file();

};

#endif 