#ifndef STATE_H
#define STATE_H

#include <string>
#include <cstdint>

#include "instruction.h"

// class for describing the program state at a specific cycle
class State {
    private:

        uint64_t cycle_num;
        Instruction in_fetch;
        Instruction in_decode;
        Instruction in_execute;
        Instruction in_memory;
        Instruction in_writeback;

    public:
        State(std::string in_fetch_nm, std::string in_decode_nm, std::string in_execute_nm, std::string in_memory_nm, std::string in_writeback_nm);
        ~State();

        uint64_t get_cycle_num();
        std::string get_in_fetch();
        std::string get_in_decode();
        std::string get_in_execute();
        std::string get_in_memory();
        std::string get_in_writeback();

};

#endif