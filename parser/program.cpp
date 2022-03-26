#include "program.h"

#include <iostream>
#include <fstream>

Program::Program(std::string file_name)
{
    input_asm = file_name;
    std::ifstream asm_in_stream(file_name, std::ifstream::in);

    std::string line;
    std::string instruction_name;

    while (!asm_in_stream.eof())
    {
        asm_in_stream >> line;
        for (size_t i = 0; i < line.size(); ++i)
        {
            if (line[i] == ' ')
            {
                instruction_name = line.substr(0, i);
                instructions_vec.push_back(instruction_name);
            }
        }
    }

    return;
}

Program::~Program()
{
    return; 
}

State Program::go_to_line(uint64_t ln)
{
    State temp;
    return temp; 
}

State Program::step_cycle()
{
    State temp;
    return temp;
}

State Program::back_cycle()
{
    State temp;
    return temp; 
}

void Program::generate_state_file()
{
    return;
}