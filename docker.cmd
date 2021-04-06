docker run -d  --name nodeexceldataimporter --restart always -v 'C:\Users\bibhu\Docker\dataimporter\data':/app/data -v 'C:\Users\bibhu\Docker\dataimporter\archive':/app/data/archive  -v 'C:\Users\bibhu\Docker\dataimporter\log':/app/log nodeexceldataimporter:latest


docker run -d  --name nodeexceldataimporter --restart always nodeexceldataimporter:latest

docker run -d  --name nodeexceldataimporter --restart always -v C:\Users\bibhu\Docker\dataimporter\data:/app/data -v C:\Users\bibhu\Docker\dataimporter\log:/app/log -e MYDI_SQL_SERVER=devopsmasterlinuxvm.centralus.cloudapp.azure.com -e MYDI_SQL_PORT=9005 -e MYDI_SQL_DB=testdB -e MYDI_SQL_USER=sa -e MYDI_SQL_PASSWORD=cGFzc3cwcmQh nodeexceldataimporter:latest