#include "state.h"
#include "instruction.h"


State::State(std::string in_fetch_nm, std::string in_decode_nm, std::string in_execute_nm, std::string in_memory_nm, std::string in_writeback_nm)
{
    Instruction f(in_fetch_nm);
    in_fetch = f;

    Instruction d(in_decode_nm);
    in_decode = d;

    Instruction e(in_execute_nm);
    in_execute = e;

    Instruction m(in_fetch_nm);
    in_memory = m;

    Instruction wb(in_fetch_nm);
    in_writeback = wb;
};

State::~State()
{

};

uint64_t State::get_cycle_num()
{
    return cycle_num;
};

std::string State::get_in_fetch()
{
    return in_fetch.get_name();
};

std::string State::get_in_decode()
{
    return in_decode.get_name();
};

std::string State::get_in_execute()
{
    return in_execute.get_name();
};

std::string State::get_in_memory()
{
    return in_memory.get_name();
};

std::string State::get_in_writeback()
{
    return in_writeback.get_name();
};
