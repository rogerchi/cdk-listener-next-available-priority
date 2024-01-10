import { Stack, Token } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { ApplicationListener } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ListenerNextAvailablePriority } from '../src/index';

describe('ListenerNextAvailablePriority', () => {
  it('should create the construct correctly', () => {
    const stack = new Stack();
    const listener = ApplicationListener.fromApplicationListenerAttributes(
      stack,
      'listener',
      {
        listenerArn: 'some-arn',
        securityGroup: SecurityGroup.fromSecurityGroupId(
          stack,
          'security-group',
          'some-security-group-id',
        ),
      },
    );

    new ListenerNextAvailablePriority(stack, 'MyConstruct', {
      listener,
    });

    // Assertions here
    const template = Template.fromStack(stack);
    console.log(JSON.stringify(template, null, 2));
    template.resourceCountIs('Custom::GetNextLBRulePriority', 1);
    template.hasResourceProperties('Custom::GetNextLBRulePriority', {
      ServiceToken: { 'Fn::GetAtt': Match.anyValue() },
      ListenerArn: listener.listenerArn,
    });
  });

  it('should attach the correct IAM policy to the role', () => {
    const stack = new Stack();
    const listener = ApplicationListener.fromApplicationListenerAttributes(
      stack,
      'listener',
      {
        listenerArn: 'some-arn',
        securityGroup: SecurityGroup.fromSecurityGroupId(
          stack,
          'security-group',
          'some-security-group-id',
        ),
      },
    );

    new ListenerNextAvailablePriority(stack, 'MyConstruct', {
      listener,
    });

    const template = Template.fromStack(stack);

    // Find the IAM role and policy statements
    template.hasResource('AWS::IAM::Policy', {
      Properties: {
        PolicyDocument: {
          Statement: [
            {
              Action: 'elasticloadbalancing:DescribeRules',
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        },
      },
    });
  });

  it('should set a token for the next priority', () => {
    const stack = new Stack();
    const listener = ApplicationListener.fromApplicationListenerAttributes(
      stack,
      'listener',
      {
        listenerArn: 'some-arn',
        securityGroup: SecurityGroup.fromSecurityGroupId(
          stack,
          'security-group',
          'some-security-group-id',
        ),
      },
    );

    const construct = new ListenerNextAvailablePriority(stack, 'MyConstruct', {
      listener,
    });

    // Check if nextPriority is a tokenized value
    expect(Token.isUnresolved(construct.nextPriority)).toBe(true);
  });
});
