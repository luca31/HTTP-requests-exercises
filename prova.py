import requests
requests.post("http://localhost:8080/accreditamento", json={"nome":"Il tuo nome"})

ex = 1
r = requests.get("http://localhost:8080/esercizi/{}".format(ex), headers={"x-data":"True"})
data = r.json()["data"]

res = []
for x in data:
  if x<=30:
    res.append(x)

r = requests.post("http://localhost:8080/esercizi/{}".format(ex), json={"data":res})
print(r.json())
