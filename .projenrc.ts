import { awscdk } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
const PROJECT_NAME = '@rogerchi/cdk-listener-next-available-priority';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Roger Chi',
  authorAddress: 'roger@rogerchi.com',
  cdkVersion: '2.73.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl:
    'https://github.com/rogerchi/cdk-listener-next-available-priority.git',

  bundledDeps: ['@aws-sdk/client-elastic-load-balancing-v2'],
  description:
    'A CDK Construct that gets the next available priority for an ELB listener',
  devDeps: ['@types/aws-lambda'],
  docgen: true,
  releaseToNpm: true,
  npmAccess: NpmAccess.PUBLIC,
  keywords: ['aws-cdk'],
});
project.synth();
