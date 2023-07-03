# NODE FOOD PROJECT API

## About the project  
This project involves developing a RESTful JSON API for a food company's group-buying management system. The API will provide comprehensive functionality for managing users, products, and orders. Key operations include the ability to add, update, and delete these entities. Additionally, it will offer a feature to retrieve a comprehensive list of all the orders placed. This API will serve as an essential tool for effectively organizing and maintaining the group-buying activities within the company.  

### Built With  
* ExpressJs  
* MongoDb  
* NodeJs  
* Typescript  

## Installation  
1. Clone the repo  
```sh  
git clone https://github.com/steffFrank/NODE_FOOD_PROJECT.git
```  
2. Install NPM packages  
```sh  
npm install  
```  
3. MongoDb  
You will need 2 mongodb urls  
create an .env file and store them as:  
- MONGODB_URL: your_mongodb_url  
- TEST_MONGODB_URL: your_mongodb_url_for_tests  

4. security  
The API was created using https protocol, therefore you will need a self-signed certificate and a key. You can create them with this line of code.    
```sh  
openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365 
```  

5.  Start the server  
```sh  
npm start  
```  
6. Run the tests  - executed on the .ts files in src folder
```sh  
npm test  
```  
7. Run the build - Results in the dist folder  
```sh  
npm run build    
```



## Usage  
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23278000-9888f5ac-07b4-4f20-a8c6-2cba19228f62?action=collection%2Ffork&collection-url=entityId%3D23278000-9888f5ac-07b4-4f20-a8c6-2cba19228f62%26entityType%3Dcollection%26workspaceId%3D2f154511-c4dc-44ab-96c6-3eefabde266a#?env%5Bfood_env%5D=W3sia2V5IjoiZmlyc3RuYW1lIiwidmFsdWUiOiJmaXJzdG5hbWUxIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJmaXJzdG5hbWUxIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6Imxhc3RuYW1lIiwidmFsdWUiOiJsYXN0bmFtZTEiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6Imxhc3RuYW1lMSIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJlbWFpbCIsInZhbHVlIjoidXNlckBnbWFpbC5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6InVzZXIxQGdtYWlsLmNvbSIsInNlc3Npb25JbmRleCI6Mn0seyJrZXkiOiJlbWFpbDEiLCJ2YWx1ZSI6InVzZXIxQGdtYWlsLmNvbSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoidXNlcjFAZ21haWwuY29tIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6ImVtYWlsMiIsInZhbHVlIjoidXNlcjJAZ21haWwuY29tIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJ1c2VyMkBnbWFpbC5jb20iLCJzZXNzaW9uSW5kZXgiOjR9LHsia2V5IjoidXBkYXRlZEZpcnN0bmFtZTEiLCJ2YWx1ZSI6InVwZGF0ZWRGaXJzdG5hbWUxIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJ1cGRhdGVkRmlyc3RuYW1lMSIsInNlc3Npb25JbmRleCI6NX0seyJrZXkiOiJwcm9kdWN0TmFtZSIsInZhbHVlIjoiY2hlYWtwZWEiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6ImNoZWFrcGVhIiwic2Vzc2lvbkluZGV4Ijo2fSx7ImtleSI6ImltYWdlVXJsIiwidmFsdWUiOiJjaGVha3BlYS5wbmciLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6ImNoZWFrcGVhLnBuZyIsInNlc3Npb25JbmRleCI6N30seyJrZXkiOiJxdWFudGl0eSIsInZhbHVlIjoiMyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiMyIsInNlc3Npb25JbmRleCI6OH0seyJrZXkiOiJ1cGRhdGVkUHJvZHVjdCIsInZhbHVlIjoiYmFuYW5hIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiJiYW5hbmEiLCJzZXNzaW9uSW5kZXgiOjl9LHsia2V5IjoidXBkYXRlZFF1YW50aXR5IiwidmFsdWUiOiIyIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImRlZmF1bHQiLCJzZXNzaW9uVmFsdWUiOiIyIiwic2Vzc2lvbkluZGV4IjoxMH0seyJrZXkiOiJvcmRlcklkIiwidmFsdWUiOiI2NDhlYWM2MjhiMTY2NWZlYjkyMWY2MDEiLCJlbmFibGVkIjp0cnVlLCJzZXNzaW9uVmFsdWUiOiI2NDhlYWM2MjhiMTY2NWZlYjkyMWY2MDEiLCJzZXNzaW9uSW5kZXgiOjExfSx7ImtleSI6InByb2R1Y3ROYW1lMSIsInZhbHVlIjoic3BpbmFjaCIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoic3BpbmFjaCIsInNlc3Npb25JbmRleCI6MTJ9XQ==)  

-  To place an order, you need to be sure that the products and users exist  
-  To update the order, change the orderId variable with the new one you want to update  

- Run the following to be sure all the tests are passing    

## License  
MIT license  

## Contact  
Steff Frank - steffpouassi@gmail.com  