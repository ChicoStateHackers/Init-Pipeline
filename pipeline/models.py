from base64 import decode
from distutils.util import execute
from itertools import cycle
from django.db import models

# Create your models here.

# Model for Cycle Data
class Cycle_Data(models.Model):
    cycle = models.IntegerField(default=0)
    fetch = models.CharField(max_length=6)
    decode = models.CharField(max_length=6)
    execute = models.CharField(max_length=6)
    memory = models.CharField(max_length=6)
    write_back = models.CharField(max_length=6)
