import {
  DescribeRulesCommand,
  DescribeRulesCommandInput,
  ElasticLoadBalancingV2Client,
} from '@aws-sdk/client-elastic-load-balancing-v2';
import type { CdkCustomResourceHandler } from 'aws-lambda';

export const handler: CdkCustomResourceHandler = async (event) => {
  console.log('Request event: ', event);

  const requestType = event.RequestType;
  const listenerArn = event.ResourceProperties.ListenerArn;

  switch (requestType) {
    case 'Create':
    case 'Update':
      const albClient = new ElasticLoadBalancingV2Client({});
      let nextMarker;
      const existingPriorities = new Set<number>();
      do {
        const params: DescribeRulesCommandInput = {
          ListenerArn: listenerArn,
          Marker: nextMarker,
        };
        const res = await albClient.send(new DescribeRulesCommand(params));
        if (res.Rules) {
          for (const rule of res.Rules) {
            const priority = parseInt(rule.Priority || '0');
            if (!isNaN(priority)) {
              existingPriorities.add(priority);
            }
          }
        }
        nextMarker = res.NextMarker;
      } while (nextMarker);

      let nextPriority = 1;
      while (existingPriorities.has(nextPriority)) {
        nextPriority++;
      }

      return {
        PhysicalResourceId: event.LogicalResourceId,
        Data: {
          NextPriority: nextPriority,
        },
      };
    case 'Delete':
      return {};
  }
};
