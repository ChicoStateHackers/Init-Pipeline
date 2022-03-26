#include "program.h"
#include "state.h"
#include "instruction.h"
#include "debug_macros.h"

int main(int argc, char** argv)
{
    if(argc == 2)
    {
        DEBUG_STDERR("Test Start!");

        Program p(argv[1]);
        DEBUG_STDERR("Parsed the test file!");

        DEBUG_STDERR("Printing the instructions...");
        p.print_instructions();

        //p.step_cycle();
        //DEBUG_STDERR("Stepped a cycle!\n");

        //p.back_cycle();
        //DEBUG_STDERR("Went back a cycle!\n");

        //p.go_to_line(10);
        //DEBUG_STDERR("Went to line 10!\n");

        p.generate_state_file();
        DEBUG_STDERR("Generated State file");

        DEBUG_STDERR("Test Finish!\n");

    }
    else 
    {
        DEBUG_STDOUT("USAGE: ./run asm_file\n");

    }

    return 0; 
}