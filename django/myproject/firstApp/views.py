from multiprocessing import context
from django.shortcuts import render
from .models import item

# Create your views here.

def index (request):

    return render(request, "index.html")

def counter (request):

    if request.POST['nick'] and request.POST['nick'].isalnum() and request.POST['nick'].isprintable():

        nick = request.POST['nick']

    else:

        nick = "Unknown"
    
    if request.POST['age'] and request.POST['age'].isnumeric() and request.POST['age'].isprintable():

        age = request.POST['age']
        
    else:

        age = "Unknown"

    items = item.objects.all()

    context = {

        'nick': nick,
        'age': age,
        'items': items
    }

    return render(request, "counter.html", context)

""" 
    item1 = item()
    item1.id = 1
    item1.name = "Lorem"
    item1.description = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem."
    item1.available = True

    item2 = item()
    item2.id = 2
    item2.name = "Ipsum"
    item2.description = "Nemo enim ipsam voluptatem quia voluptas."
    item2.available = True

    item3 = item()
    item3.id = 3
    item3.name = "Dolor"
    item3.description = "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
    item3.available = False

    item4 = item()
    item4.id = 4
    item4.name = "Sit amet"
    item4.description = "Ut enim ad minima veniam."
    item4.available = True

    items = [item1, item2, item3, item4] """