import urllib.request
import json
import csv

output = open('test.csv', 'w')
output.write("RecallsID, RecallNumber, Date, URL, Description, ProductName, ProductType, ManufacturerName, RecallReason, UnitsInCirculation, Title, IsPrioritized\n")

with urllib.request.urlopen("https://www.saferproducts.gov/RestWebServices/Recall?Title=Child&RecallDescription=metal&format=json") as url:
    data = json.load(url)

    for i in range(len(data)):
        print(data[i]['RecallID'])
        products = data[i]['Products']
        if(len(products) == 0):
            products.append({'Name': 'n/a', 'Type': 'n/a', 'NumberOfUnits': 'n/a'})
            print(products)
        manufacturers = data[i]['Manufacturers']
        if(len(manufacturers) == 0):
            manufacturers.append({'Name': 'n/a'})
        hazard = data[i]['Hazards']
        if(len(hazard) == 0):
            hazard.append({'Name': 'n/a'})

        row = "{} , {} , {} , {} , {}, {}, {}, {}, {}, {}, {}, {}\n".format(\
            data[i]['RecallID'] , data[i]['RecallNumber'] , data[i]['RecallDate'].replace(',', '.') , data[i]['URL'].replace(',', '.') , data[i]['Description'].replace(',', '.'), \
            products[0]['Name'].replace(',', '.') or 'n/a', products[0]['Type'].replace(',', '.') or 'n/a', manufacturers[0]['Name'].replace(',', '.'), hazard[0]['Name'].replace(',', '.'), products[0]['NumberOfUnits'].replace(',', '') or 'n/a', \
            data[i]['Title'].replace(',', '.'), False)
        
        output.write(row)
        
output.close()