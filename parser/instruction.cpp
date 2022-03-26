#include "instruction.h"

Instruction::Instruction()
{
    return;
}

Instruction::Instruction(std::string nm)
{
    name = nm; 
    return;
}

Instruction::~Instruction()
{
    return;
}

std::string Instruction::get_name()
{
    return name; 
}
   

