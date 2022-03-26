#ifndef INSTRUCTION_H
#define INSTRUCTION_H

#include <string> 

class Instruction {

    private: 

        // Instruction Name
        std::string name; 
    
    public:

        // Constructor
        Instruction(std::string nm); 

        // Destructor
        ~Instruction();

        // Getter for Name
        std::string get_name(); 
   
};

#endif 