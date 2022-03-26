#include "program.h"
#include "debug_macros.h"

#include <iostream>
#include <fstream>
#include <vector>
#include <deque>

Program::Program(std::string file_name)
{
    input_asm_file = file_name;
    std::ifstream asm_in_stream(file_name, std::ifstream::in);

    std::string line;
    std::string instruction_name;

    while (asm_in_stream >> line)
    {
        instructions_vec.push_back(line);
    }

    generate_states();
    generate_state_file(); 

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

void Program::print_instructions()
{
    for (size_t i = 0; i < instructions_vec.size(); ++i)
    {
        std::cout << instructions_vec[i] << std::endl;
    }
}

// returns pointer to first state
void Program::generate_states(){

    //start pipeline filled with NOPS
    std::deque<std::string> pipeline = {"NOP", "NOP", "NOP", "NOP", "NOP"};

    uint64_t cycle_num = 0;
    cycle_num++;
    head_state = new State(cycle_num, pipeline[0], pipeline[1], pipeline[2], pipeline[3], pipeline[4]);
    head_state->prev = head_state;
    
    State *prev_state = head_state;

    for (size_t i = 0; i < instructions_vec.size(); ++i)
    {
        std::cout << instructions_vec.size() << std::endl;

        std::string instr = instructions_vec[i];
        pipeline.push_front(instr);
        pipeline.pop_back();
        
        cycle_num++;
        State *new_state = new State(cycle_num, pipeline[0], pipeline[1], pipeline[2], pipeline[3], pipeline[4]);
        
        new_state->prev = prev_state;
        new_state->prev->next = new_state;
        new_state->next = NULL;

        prev_state = new_state; 

        // Insert NOPs for Branches!!! 
        if( instr == "B" || "B.cond")
        {
            pipeline.push_front("NOP");
            pipeline.pop_back();
            
            cycle_num++;
            new_state = new State(cycle_num, pipeline[0], pipeline[1], pipeline[2], pipeline[3], pipeline[4]);
            
            new_state->prev = prev_state;
            new_state->prev->next = new_state;
            new_state->next = NULL;

            prev_state = new_state;

            pipeline.push_front("NOP");
            pipeline.pop_back();
            
            cycle_num++;
            new_state = new State(cycle_num, pipeline[0], pipeline[1], pipeline[2], pipeline[3], pipeline[4]);
            
            new_state->prev = prev_state;
            new_state->prev->next = new_state;
            new_state->next = NULL;

            prev_state = new_state;
        }

    }

    // Flush out the pipline
    for (size_t i = 0; i < 5; ++i)
    {
        pipeline.push_front("NOP");
        pipeline.pop_back();

        cycle_num++;
        State *new_state = new State(cycle_num, pipeline[0], pipeline[1], pipeline[2], pipeline[3], pipeline[4]);
        new_state->prev = prev_state;
        new_state->prev->next = new_state;
        new_state->next = NULL;

        prev_state = new_state; 

    }

    return;
}

void Program::generate_state_file()
{
    std::ofstream csv_out_stream;
    csv_out_stream.open("statefile.csv", std::ofstream::out);

    State *cur_state = head_state;

    while (cur_state != NULL)
    {
        csv_out_stream << cur_state->state_to_csv() << std::endl;
        cur_state = cur_state->next; 
    }

    csv_out_stream.close();
    
    return;
}