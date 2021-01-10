from django.db import models

# Create your models here.

class Course(models.Model):
    title = models.CharField(max_length=120)
    startDate = models.DateField()
    availabeTag = models.JSONField()
    filledSlot = models.IntegerField()
    maxSlot = models.IntegerField()
    
# Need to know Designer, Language, Field, 