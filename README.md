# ListenerNextAvailablePriority

This is a CDK construct which implements a custom resource that gets the next available priority in a listener. This is useful if you don't want to manually manage priorities (which are a required field for rules), mainly used in the context of host-name matching rules. Currently just supports getting one priority at a time, so you may need to set up a dependency chain if you are adding multiple rules.

## Usage

```ts
const listenerNextAvailablePriority = new ListenerNextAvailablePriority(
  this,
  'next-priority',
  { listener },
);

listener.addTargets('host', {
  conditions: [ListenerCondition.hostHeaders([domainName])],
  targets: [
    /* targets here */
  ],
  priority: listenerNextAvailablePriority.nextPriority,
});
```
