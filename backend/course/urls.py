from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_request, name='login_request'),
    path('register/', views.register_request, name='register_request'),
    path('filter/', views.course_filter, name='course_filter'),
    path('join/', views.course_join, name='course_join'),
]