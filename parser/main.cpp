
// Actually might want to but these macros in a header somewhere?
// Might be usefule elsewhere
#define DEBUG

#ifdef DEBUG
#define DEBUG_STDERR(x) (std::cerr << (x))
#define DEBUG_STDOUT(x) (std::cout << (x))
#else 
#define DEBUG_STDERR(x)
#define DEBUG_STDOUT(x)
#endif

#include <iostream>

#include "program.h"

int main()
{

    DEBUG_STDERR("Test Start!\n");

    Program p("tst.asm");
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