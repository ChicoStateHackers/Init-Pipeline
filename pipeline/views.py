from init_pipeline.settings import STATIC_DIR, PARSER_DIR 
from django.shortcuts import render
import subprocess, csv, os
from pipeline.models import Cycle_Data
from django.core.files.storage import FileSystemStorage


# Create your views here.
def home(request):

    if request.method == 'POST' and request.FILES['myfile']:
        print("Received File")

        #Use FileSystemStorage() to save the input file to the MEDIA_DIR and save it as user_input.asm
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()

        #If File Exists Overwrite
        if os.path.exists(PARSER_DIR + '/user_input.asm'):
            os.remove(PARSER_DIR + '/user_input.asm')
        filename = fs.save("user_input.asm", myfile)

        #Check if C executable doesn't exists
        if not os.path.exists(PARSER_DIR + '/run'):
             print("Building C Executable File")
             subprocess.call(["make"], cwd=PARSER_DIR)
                

        #Run users input file using the users input file as a parameter
        subprocess.call(["./run", "user_input.asm"], cwd=PARSER_DIR)
        print("Running C Executable")
        
        #Make sure there are no objects before creating them
        if (Cycle_Data.objects.exists()):
            print("Deleting all existing Objects")
            Cycle_Data.objects.all().delete()

        #Create objects out for each row in the csv file
        file_path = os.path.join(PARSER_DIR, 'statefile.csv')
        instruction_data = list(csv.reader(open(file_path)))
        print("Building Instruction Objects")
        for row in instruction_data:
            Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
        instruction_data = Cycle_Data.objects.all()

        #Rerender page with new data
        return render(request, 'home.html', {'instruction_data': instruction_data})


    #Make sure there are no objects before creating them
    if (Cycle_Data.objects.exists()):
        print("Deleting all existing Objects")
        Cycle_Data.objects.all().delete()

    #Create objects out for each row in the csv file
    file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
    instruction_data = list(csv.reader(open(file_path)))
    print("Building Instruction Objects")
    for row in instruction_data:
        Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
    my_list = Cycle_Data.objects.all()

    #Rerender page with new data
    return render(request, 'home.html', {'instruction_data': my_list})

