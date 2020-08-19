# Import the library you would like to use
# NB -- first you have to install it: pip install requests
import requests

# Signup
requests.post("http://localhost:8080/signup", json={"name":"Your Name"})

# Define exercise number
ex = 1

# Get exercise data
r = requests.get("http://localhost:8080/ex/{}".format(ex), headers={"x-data":"True"})
data = r.json()["data"]

# Solve the problem
res = []
for x in data:
  if x <= 30:
    res.append(x)

# Send the solution
r = requests.post("http://localhost:8080/ex/{}".format(ex), json={"data":res})

# Print the result
print(r.json())