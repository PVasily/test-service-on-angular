from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK
from rest_framework.test import APIClient


# token = Token.objects.get(user__username='admin')
# client = APIClient()
# client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

def test_auth():
    client = APIClient()
    response = client.get(reversed('order'))
    # client.login(username='admin', password='karamba03')
    assert(response.status, HTTP_200_OK)
