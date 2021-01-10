from django.contrib import admin
from .models import Course

# Register your models here.
class CourseAdmin(admin.ModelAdmin):  
    list_display = ('title', 'startDate', 'availabeTag', 'filledSlot', 'maxSlot') 
  
admin.site.register(Course, CourseAdmin)