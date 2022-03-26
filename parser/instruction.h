#ifndef INSTRUCTION_H
#define INSTRUCTION_H

#include <string> 

class Instruction {

    private: 
        std::string name; // Instruction Name
    
    public:
        Instruction();
        Instruction(std::string nm); 
        ~Instruction();
        std::string get_name(); 
   
};

#endif 