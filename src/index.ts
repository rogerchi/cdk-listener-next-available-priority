import { CustomResource, Token } from 'aws-cdk-lib';
import { IListener } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { GetNextPriorityFunction } from './handlers/get-next-priority-function';

/**
 * Construction properties of ListenerNextAvailablePriority.
 */
export interface ListenerNextAvailablePriorityProps {
  /**
   * The listener to retrieve the next available priority from
   */
  readonly listener: IListener;
}

/**
 * Get the next available priority for a listener.  Useful when constructing listener rules
 * that target a specific hostname.  You may not want to have to manage setting the priority
 * yourself since it's currently a required field.
 *
 * Caveat: This uses a custom resource to look up the next available priority using the AWS SDK.
 * It currently only supports getting one priority at a time -- if you are creating multiple rules
 * in the same context, you may need to create dependencies between the constructs to ensure rules
 * are added in sequence.
 *
 *
 */
export class ListenerNextAvailablePriority extends Construct {
  /** The next available priority */
  public readonly nextPriority: number;
  constructor(
    scope: Construct,
    id: string,
    props: ListenerNextAvailablePriorityProps,
  ) {
    super(scope, id);

    const getNextPriorityFn = new GetNextPriorityFunction(
      this,
      'get-next-priority-fn',
    );

    getNextPriorityFn.role?.addToPrincipalPolicy(
      new PolicyStatement({
        actions: ['elasticloadbalancing:DescribeRules'],
        resources: ['*'],
      }),
    );

    const provider = new Provider(this, 'available-priority-provider', {
      onEventHandler: getNextPriorityFn,
    });

    const customResource = new CustomResource(this, 'get-next-priority', {
      serviceToken: provider.serviceToken,
      resourceType: 'Custom::GetNextLBRulePriority',
      properties: {
        ListenerArn: props.listener.listenerArn,
      },
    });

    this.nextPriority = Token.asNumber(customResource.getAtt('NextPriority'));
  }
}
