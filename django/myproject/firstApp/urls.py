from django import views
from django.urls import path
from firstApp import views

urlpatterns = [

    path("", views.index, name="index"), #path("Here is the URL, in this case; the URL is the root path, so the string is empty.", Here is the "views.py" file, and then, the function called "index" (after a dot) in that file., Here is the desired name of the path)

    path("counter", views.counter, name="counter")
]