import pyodbc
cnxn = pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:cpsc-server0313.database.windows.net,1433;Database=CPSCDatabase0313;Uid=cpscadmin;Pwd=CP$CD@taB!t4454;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')


cursor = cnxn.cursor()