#include "program.h"
#include "state.h"
#include "instruction.h"
#include "debug_macros.h"


int main(int argc, char** argv)
{
    
    DEBUG_STDERR("Test Start!\n");

    Program p("tests/test0/tst0.asm");
    DEBUG_STDERR("Parsed the test file!\n");

    p.step_cycle();
    DEBUG_STDERR("Stepped a cycle!\n");

    p.back_cycle();
    DEBUG_STDERR("Went back a cycle!\n");

    p.go_to_line(10);
    DEBUG_STDERR("Went to line 10!\n");

    DEBUG_STDERR("Test Finish!\n");

    return 0; 
}