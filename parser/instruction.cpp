#include "instruction.h"

Instruction::Instruction(std::string nm)
{
    name = nm; 

}; 

Instruction::~Instruction()
{

};

std::string Instruction::get_name()
{
    return name; 
}; 
   

