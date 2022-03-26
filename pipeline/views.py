from init_pipeline.settings import STATIC_DIR, PARSER_DIR 
from django.shortcuts import render
import subprocess, csv, os
from pipeline.models import Cycle_Data


# Create your views here.
def home(request):
     #subprocess.call(["g++", "ex.cpp"], cwd=STATIC_DIR)
     #tmp=subprocess.call("./a.out", cwd=STATIC_DIR) 
     #my_dict = {}
    Cycle_Data.objects.all().delete()
    file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
    instruction_data = list(csv.reader(open(file_path)))
    for row in instruction_data:
        Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
    #     for y in x:
    #         print(y)

     #d = dict(instruction_data)
    my_list = Cycle_Data.objects.all()
    return render(request, 'home.html', {'instruction_data': my_list})
