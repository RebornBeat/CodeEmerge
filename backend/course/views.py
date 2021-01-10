from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Course
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return JsonResponse({'details': "accepted"})


@csrf_exempt
def login_request(request):
    # Loop through items in body and chain
    if request.method =="POST":
        data = json.loads(request.body.decode('utf-8'))["data"]
        try:
            u = User.objects.get(username=data["Uname"])
        except:
            return JsonResponse({'details': "Username Does Not Exist"})
        user = authenticate(request, username=data["Uname"], password=data["Pass"])
        if user is not None:
            login(request, user)
            return JsonResponse({'details': "accepted"})
        else:
            return JsonResponse({'details': "Incorrect Password"})
    return JsonResponse(data)

@csrf_exempt
def register_request(request):
    # Loop through items in body and chain
    if request.method =="POST":
        data = json.loads(request.body.decode('utf-8'))["data"]
        if data["Pass"] == data["rePass"]:
            try:
                u = User.objects.get(username=data["Uname"])
                return JsonResponse({'details': "in_use"})
            except:
                User.objects.create_user(username=data["Uname"], password=data["Pass"])
                user = authenticate(request, username=data["Uname"], password=data["Pass"])
                if user is not None:
                    login(request, user)
                    return JsonResponse({'details': "accepted"})
        else:
            return JsonResponse({'details': "Passwords Must Match"})
    return JsonResponse(data)

@csrf_exempt
def course_filter(request):
    # Loop through items in body and chain
    if request.method =="POST":
        data = json.loads(request.body.decode('utf-8'))["data"]
        # Clean Dictionary of NA items
        null_keys = []
        for i in data:
            if data[i] == "n/a":
                null_keys.append(i)
        for i in null_keys:
            del data[i]
        filter_list = []
        # Append each value from data into the filter_list
        for i in data:
            filter_list.append(data[i])
        course_dict = {}
        if len(filter_list) != 0:
            all_course = Course.objects.filter(availabeTag__has_keys=filter_list)
            for i in all_course:
                course_dict[i.pk] = { "title": i.title,  "filledSlot": i.filledSlot, "maxSlot": i.maxSlot, "startDate": i.startDate, "tags": i.availabeTag}
                print(i.availabeTag)
    return JsonResponse(course_dict)

def course_join(request):
    current_user = request.user
    data = json.loads(request.body.decode('utf-8'))["data"]
    print(current_user)
    course = Course.objects.get(pk=data["id"])
    print(course.availabeTag)
    print(course.availabeTag[data["role"]])
    if course.availabeTag[data["role"]] != 0:
        course_json = course.availabeTag
    else:
        return JsonResponse({'details': "No Slots Available For Selected Role"})
#         for i in all_course:
#             data = i.availabeTag
#             for ii in filter_list:
#                 try:
#                     int(data[ii])
#                 except:
#                     continue
#                 if int(data[ii]) != 0:
#                     
#             print(i.availabeTag, i.pk)
    return JsonResponse({'details': "accepted"})