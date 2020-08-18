import requests

requests.post("http://localhost:8080/signup", json={"name":"Your Name"})

ex = 1

r = requests.get("http://localhost:8080/ex/{}".format(ex), headers={"x-data":"True"})

data = r.json()["data"]

res = []
for x in data:
  if x<=30:
    res.append(x)

r = requests.post("http://localhost:8080/ex/{}".format(ex), json={"data":res})

print(r.json())