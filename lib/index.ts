import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as iam from '@aws-cdk/aws-iam';
import * as sqs from '@aws-cdk/aws-sqs';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as path from 'path';

export interface CdkLibIssue10314Props {
  // Define construct properties here
}

export interface LambdaEnvironmentMap {
  [key: string]: any
}

export class CdkLibIssue10314 extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: CdkLibIssue10314Props = {}) {
    super(scope, id);

    const txQueue = new sqs.Queue(this, 'TransactionStateQueue', {
      visibilityTimeout: Duration.seconds(1200)
    });

    const lockTable = new ddb.Table(this, 'TransactionLockTable', {
      partitionKey: { name: 'LockId', type: ddb.AttributeType.STRING },
      tableName: `FooStepLock`,
      readCapacity: 1,
      writeCapacity: 1
    });

    let wrapperEnv: LambdaEnvironmentMap = {};
    wrapperEnv['DYNAMO_LOCK_TABLE_NAME'] = lockTable.tableName;
    wrapperEnv['QUEUE_URL'] = txQueue.queueUrl;

    const lambdaFunc = new lambda.Function(this, `MyFunc`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/myfunc')),
      handler: "index.handler",
      memorySize: 128,
      timeout: Duration.seconds(5)
    });

    lambdaFunc.addToRolePolicy(new iam.PolicyStatement({
      resources: ["*"],
      actions: ["dynamodb:*"]
    }));

    const fooFunc = new lambda.Function(this, `MyFooFunc`, {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda/myfoofunc')),
      handler: "index.handler",
      memorySize: 128,
      timeout: Duration.seconds(5)
    });

    fooFunc.addToRolePolicy(new iam.PolicyStatement({
      resources: ["*"],
      actions: ["s3:*"]
    }));

    
  }
}
