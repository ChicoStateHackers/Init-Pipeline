from init_pipeline.settings import STATIC_DIR, PARSER_DIR 
from django.shortcuts import render
import subprocess, csv, os
from pipeline.models import Cycle_Data
from django.core.files.storage import FileSystemStorage


# Create your views here.
def home(request):
     #subprocess.call(["g++", "ex.cpp"], cwd=STATIC_DIR)
     #tmp=subprocess.call("./a.out", cwd=STATIC_DIR) 
     #my_dict = {}
    # if request.method == 'POST':
    #     form = UploadFileForm(request.POST, request.FILES)
    #     if form.is_valid():
    #         handle_uploaded_file(request.FILES['file'])
    #         #return HttpResponseRedirect('/success/url/')
    #         # Cycle_Data.objects.all().delete()
    #         # file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
    #         # instruction_data = list(csv.reader(open(file_path)))
    #         # for row in instruction_data:
    #         #     Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
    #         # my_list = Cycle_Data.objects.all()
    #         print("Made it")
    #         #return render(request, 'home.html', {'instruction_data': my_list})
    #         Cycle_Data.objects.all().delete()
    #         return render(request, 'home.html', {'instruction_data': my_list})
    #     else:
    #         print("fuck")

    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        #file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
        print("lets go!")
        # return render(request, 'core/simple_upload.html', {
        #     'uploaded_file_url': uploaded_file_url
        # })


    Cycle_Data.objects.all().delete()
    file_path = os.path.join(PARSER_DIR, 'tests/tst0/statefile.csv')
    instruction_data = list(csv.reader(open(file_path)))
    for row in instruction_data:
        Cycle_Data(cycle=row[0], fetch=row[1], decode=row[2], execute=row[3], memory=row[4], write_back=row[5]).save()
    my_list = Cycle_Data.objects.all()
    return render(request, 'home.html', {'instruction_data': my_list})
