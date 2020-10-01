#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ExampleAppStack } from '../lib/example-app-stack';

const app = new cdk.App();
new ExampleAppStack(app, 'ExampleAppStack');
