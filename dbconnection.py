import pyodbc
import urllib.request
import json
import re
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

def load_data():
    cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:cpsc-server0313.database.windows.net,1433;Database=CPSCDatabase0313;Uid=cpscadmin;Pwd=CP$CD@taB!t4454;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()
    with urllib.request.urlopen("https://www.saferproducts.gov/RestWebServices/Recall?Title=Child&RecallDescription=metal&format=json") as url:
        data = json.load(url)

        for i in range(len(data)):
            print(data[i]['RecallID'])
            products = data[i]['Products']
            if(len(products) == 0):
                products.append({'Name': 'n/a', 'Type': 'n/a', 'NumberOfUnits': 'n/a'})
            manufacturers = data[i]['Manufacturers']
            if(len(manufacturers) == 0):
                manufacturers.append({'Name': 'n/a'})
            hazard = data[i]['Hazards']
            if(len(hazard) == 0):
                hazard.append({'Name': 'n/a'})

            cursor.execute("INSERT INTO [dbo].[Recalls] (RecallID, RecallDate, RecallNumberCPSC, RecallURL, Description, ProductName, \
                    ProductType, ManufacturerName, RecallReason, UnitsInCirculation, Title, IsPrioritized) VALUES (\
                    ? , ? , ? , ? , ?, ?, ?, ?, ?, ?, ?, ?)", int(data[i]['RecallID']) , datetime.strptime(data[i]['RecallDate'].replace(',', '.'), '%Y-%m-%dT%H:%M:%S') , re.sub(r'\D', '', data[i]['RecallNumber'].replace(',', '.')) , data[i]['URL'].replace(',', '.') , data[i]['Description'].replace(',', '.')[0:128], \
                products[0]['Name'].replace(',', '.')[0:128] or 'n/a', products[0]['Type'].replace(',', '.')[0:128] or 'n/a', manufacturers[0]['Name'].replace(',', '.')[0:128], hazard[0]['Name'].replace(',', '.')[0:128], re.sub(r'\D', '', products[0]['NumberOfUnits'].replace(',', '')[5:11]) or 0, \
                data[i]['Title'].replace(',', '.')[0:128], False)
            
            cnxn.commit()

    cursor.close()
    cnxn.close()


def authenticate(username, password):
    cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:cpsc-server0313.database.windows.net,1433;Database=CPSCDatabase0313;Uid=cpscadmin;Pwd=CP$CD@taB!t4454;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()

    print(username, password, "\n")

    cursor.execute("SELECT CPSCType FROM [dbo].[User] where Username = ? and Password = ?", username, password)
    rows = cursor.fetchall()

    if len(rows) == 0:
        return "Bad Password, please try again"
    
    print(str(rows[0]))
    
    type = re.sub(r'[^a-zA-Z]', '', str(rows[0]))

    print("asdadasdsa", type)

    if type == "Manager":
        return 'Manager'
    else:
        return 'Inspector'

def load_recalls():
    cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:cpsc-server0313.database.windows.net,1433;Database=CPSCDatabase0313;Uid=cpscadmin;Pwd=CP$CD@taB!t4454;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()

    cursor.execute("SELECT * FROM [dbo].[Recalls] WHERE IsPrioritized = 0")
    rows = cursor.fetchall()

    return rows

def prioritize_recalls(selected_recalls):
    cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:cpsc-server0313.database.windows.net,1433;Database=CPSCDatabase0313;Uid=cpscadmin;Pwd=CP$CD@taB!t4454;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
    cursor = cnxn.cursor()

    for recall_id in selected_recalls:
        recall_id = int(recall_id)
        sql_query = "UPDATE [dbo].[Recalls] SET IsPrioritized = 1 WHERE RecallID = ?"
        cursor.execute(sql_query, recall_id)
    
    cursor.commit()
    cursor.close()
