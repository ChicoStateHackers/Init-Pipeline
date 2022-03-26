#ifndef DEBUG_MACRO_H
#define DEBUG_MACRO_H

#define DEBUG

#ifdef DEBUG
#include <iostream>
#define DEBUG_STDERR(x) (std::cerr << (x) << std::endl)
#define DEBUG_STDOUT(x) (std::cout << (x) << std::endl)
#else 
#define DEBUG_STDERR(x)
#define DEBUG_STDOUT(x)
#endif

#endif
