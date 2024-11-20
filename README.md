# To-Do Task Manager Setup and Deployment Guide

## Description
This guide walks you through the steps to set up, configure, and deploy a To-Do Task Manager web application. The frontend is built with React, and the backend is powered by AWS services, including Lambda, DynamoDB, IAM roles, and API Gateway.

## Steps to Follow

### Step 1: Integrate Code in Git to Visual Studio
1. Clone the Git repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/todo-task-manager.git
2. Open the project in Visual Studio Code.

### Step 2: Install Dependencies and Test Frontend UI
1. Install the dependencies:
   ```bash
   npm install
2. Install Axios for API integration:
   ```bash
   npm install axios
3. Start the React application:
   ```bash
   npm start
4. Verify that the web application UI is running  successfully on (http://localhost:PORT).
---
### Step 3: Create DynamoDB Table:
1. Log in to your AWS Management Console.
2. Navigate to DynamoDB and create a new table:
-**Table Name**: `Tasks`
-**Primary Key**: `taskId` (string).
---
### Step 4: Create AWS Lambda Function:
1. Create a Lambda function in AWS with the name:
   -**Function Name**: `To_Do_App`
2. Paste the code from `backend/lambda.py` into the Lambda function.
3. Test the Lambda function with sample payloads to verify its functionality.
---
### Step 5: Create IAM Role for Lambda and DynamoDB:
1. Create an IAM role with the following policies:
   -Permissions to access the DynamoDB table:
      -Specify the ARN of the `Tasks` table in the policy.
   -Permissions to invoke the API Gateway.
2. Attach the IAM role to the Lambda function.

---
### Step 6: Create API Gateway:
1. Navigate to API Gateway in the AWS Management Console.
2. Create a new API and add a resource:
   -**Resource Name**: `task`
3. Add methods to the `task` resource:
   -**Methods**: `POST`, `DELETE`, `GET`, `PUT`
   -Integrate each method with the Lambda function `To_Do_App`.
---
### Step 7: Add API URL:
1. In the `src/utils.js file`, add the API URL from API Gateway:
   ```bash
   export const API_URL = "https://your-api-gateway-url/task";
2. Save the changes.
   
---
### Step 8: Modify the UI of the Web Application:
1. Update the UI components in the following files:
   -`TaskList.js`
   -`App.css`
2. Customize the web page for better design and functionality.

---

### Step 9: Commit Changes to Git Repository:
1. Add and commit your changes to Git:
   ```bash
   git add .
   git commit -m "Updated UI and added backend configuration"
   git push origin main

---
### Step 10: Set Up AWS Amplify:
1. Navigate to AWS Amplify in the AWS Management Console.
2. Create a new Amplify app and connect it to your Git repository.
3. Configure the build settings as needed.
4. Deploy the application using AWS Amplify.
5. Once deployment is complete, access the live application using the Amplify-provided URL.