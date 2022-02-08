# Express Serverless example application with file upload support 

## Running for development

The project uses `serverless-offline` for mocking the AWS API Gateway and Lambda services.

First, install the [`serverless`](http://serverless.com) client by running
```bash
npm install -g serverless
npm install
```

To start the offline server, run `npm start` or `serverless offline start`.

## Deploying to AWS

To deploy to AWS, run `serverless deploy` and follow the instructions.

## PlantUML diagram
```
@startuml
!theme plain
skinparam responseMessageBelowArrow true
title Office to PDF
participant UI order 10
participant Lambda order 20
participant S3 order 30
participant Google order 40

UI -> Lambda: Get upload/view URL with reCAPTCHA token
Lambda -> Google: Validate reCAPTCHA token
Lambda <-- Google: Token OK
Lambda -> S3: Get signed upload/view URL
Lambda <-- S3: URLs
UI <-- Lambda: Upload/view URL + object ID

UI -> S3: Upload to S3 via upload URL
UI <-- S3: Upload complete

UI -> Lambda: Trigger file conversion w/ object ID
Lambda -> S3: Get source file
Lambda <-- S3: source file
Lambda -> Lambda: convert to PDF
Lambda -> S3: Upload result PDF
UI <-- S3: View URL
@enduml
```