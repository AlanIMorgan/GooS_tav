
import os

fileName = "/home/morgan/Documentos/google/django/newFile.py"

myFile = open(fileName, "w")

myFile.write("line1 = 'This is a new file'")

myFile = open(fileName, "a")

myFile.write("\n\nline2 = 'This is another new line'")

for lines in open(fileName, "r").readlines():

    print(lines)

myFile.close()

from newFile import line1
from newFile import line2

class myClass:

    def __init__(self, fact1, fact2):
        
        self.fact1 = fact1
        self.fact2 = fact2

    def functionName(self):

        print(self.fact1 + "\n" + self.fact2)

anObject = myClass(line1, line2)

anObject.functionName()

if os.path.exists(fileName):

    os.remove(fileName)

else:

    print("The file does not exist")