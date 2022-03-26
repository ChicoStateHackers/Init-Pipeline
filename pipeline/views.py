from init_pipeline.settings import STATIC_DIR, PARSER_DIR 
from django.shortcuts import render
import subprocess, csv, os
from pipeline.models import Cycle_Data
from django.core.files.storage import FileSystemStorage


# Create your views here.
def home(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        #subprocess.call(["g++", "ex.cpp"], cwd=PARSER_DIR)
        subprocess.call("make", cwd=PARSER_DIR)
        tmp=subprocess.call("./run", cwd=PARSER_DIR)
        #file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
        print("lets go!")
        Cycle_Data.objects.all().delete()
        file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
        instruction_data = list(csv.reader(open(file_path)))
        for row in instruction_data:
            Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
        my_list = Cycle_Data.objects.all()
        return render(request, 'home.html', {'instruction_data': my_list})


    Cycle_Data.objects.all().delete()
    file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
    instruction_data = list(csv.reader(open(file_path)))
    for row in instruction_data:
        Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
    my_list = Cycle_Data.objects.all()
    return render(request, 'home.html', {'instruction_data': my_list})

