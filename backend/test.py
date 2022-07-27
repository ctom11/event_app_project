import requests

BASE="http://127.0.0.1:5000/"



response = requests.put(BASE + "event/3", {"name":"event name", "description":"event description"})
print(response.json())
input()
response = requests.get(BASE + "event/1")
print(response.json())