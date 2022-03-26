#include "state.h"
#include "instruction.h"

#include <iostream>

State::State()
{
    
}

State::State(uint64_t cycle, std::string in_fetch_nm, std::string in_decode_nm, std::string in_execute_nm, std::string in_memory_nm, std::string in_writeback_nm)
{
    cycle_num = cycle;

    Instruction f(in_fetch_nm);
    in_fetch = f;

    Instruction d(in_decode_nm);
    in_decode = d;

    Instruction e(in_execute_nm);
    in_execute = e;

    Instruction m(in_memory_nm);
    in_memory = m;

    Instruction wb(in_writeback_nm);
    in_writeback = wb;

    next = NULL;
    prev = NULL;

}

State::~State()
{

}

uint64_t State::get_cycle_num()
{
    return cycle_num;
}

std::string State::get_in_fetch()
{
    return in_fetch.get_name();
}

std::string State::get_in_decode()
{
    return in_decode.get_name();
}

std::string State::get_in_execute()
{
    return in_execute.get_name();
}

std::string State::get_in_memory()
{
    return in_memory.get_name();
}

std::string State::get_in_writeback()
{
    return in_writeback.get_name();
}

void State::set_next(State* n)
{
    next = n;
    return;
}

void State::set_prev(State* p)
{
    prev = p;
    return;
}

State* State::get_next()
{
    return next;
}

State* State::get_prev()
{
    return prev;
}

std::string State::state_to_csv()
{
    std::string csv_line = std::to_string(cycle_num);

    csv_line += "," + in_fetch.get_name() 
        + "," + in_decode.get_name()
        + "," + in_execute.get_name()
        + "," + in_memory.get_name()
        + "," + in_writeback.get_name();
    
    return csv_line; 
    
}