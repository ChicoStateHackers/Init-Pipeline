#ifndef STATE_H
#define STATE_H

#include <string>
#include "instruction.h"

// class for describing the program state at a specific cycle
class State {
    private:

        unsigned cycle_num;
        Instruction in_fetch;
        Instruction in_decode;
        Instruction in_execute;
        Instruction in_memory;
        Instruction in_writeback;

    public:

        State(Instruction f, Instruction d, Instruction e, Instruction m, Instruction wb);
        unsigned get_cycle_num();
        std::string get_in_fetch();
        std::string get_in_decode();
        std::string get_in_execute();
        std::string get_in_memory();
        std::string get_in_writeback();

};

#endif