from django.db import models

# Create your models here.

class Course(models.Model):
    title = models.CharField(max_length=120)
    startDate = models.CharField(max_length=10)
    availabeTag = models.JSONField()
    filledSlot = models.IntegerField()
    maxSlot = models.IntegerField()
    description = models.CharField(max_length=250)
    
# Need to know Designer, Language, Field, 