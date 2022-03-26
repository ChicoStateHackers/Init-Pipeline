#ifndef DEBUG_MACRO_H
#define DEBUG_MACRO_H

#define DEBUG

#ifdef DEBUG
#define DEBUG_STDERR(x) (std::cerr << (x))
#define DEBUG_STDOUT(x) (std::cout << (x))
#else 
#define DEBUG_STDERR(x)
#define DEBUG_STDOUT(x)
#endif

#endif
