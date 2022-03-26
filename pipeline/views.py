from django.shortcuts import render
import subprocess 

# Create your views here.
def home(request):
     return render(request, 'home.html')
