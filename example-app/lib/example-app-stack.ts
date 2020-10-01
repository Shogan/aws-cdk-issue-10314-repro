import * as cdk from '@aws-cdk/core';
import * as fts from '../../lib/index';

export class ExampleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const foo = new fts.CdkLibIssue10314(this, 'SampleIssue', {});
  }
}
