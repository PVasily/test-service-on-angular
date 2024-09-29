import re
from rest_framework.response import Response


def check_inn(field):
    
    if (True if int(field) else False) and (12 == len(field) or len(field) == 10):
         return field
    raise ValueError()

    

regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def isValidEmail(email):
        if re.fullmatch(regex, email):
            print('Valid email')
            return email
        raise ValueError()
        
      