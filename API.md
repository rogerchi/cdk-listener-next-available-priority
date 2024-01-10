# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ListenerNextAvailablePriority <a name="ListenerNextAvailablePriority" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority"></a>

Get the next available priority for a listener.

Useful when constructing listener rules
that target a specific hostname.  You may not want to have to manage setting the priority
yourself since it's currently a required field.

Caveat: This uses a custom resource to look up the next available priority using the AWS SDK.
It currently only supports getting one priority at a time -- if you are creating multiple rules
in the same context, you may need to create dependencies between the constructs to ensure rules
are added in sequence.

#### Initializers <a name="Initializers" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer"></a>

```typescript
import { ListenerNextAvailablePriority } from '@rogerchi/cdk-listener-next-available-priority'

new ListenerNextAvailablePriority(scope: Construct, id: string, props: ListenerNextAvailablePriorityProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.props">props</a></code> | <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps">ListenerNextAvailablePriorityProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.Initializer.parameter.props"></a>

- *Type:* <a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps">ListenerNextAvailablePriorityProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.isConstruct"></a>

```typescript
import { ListenerNextAvailablePriority } from '@rogerchi/cdk-listener-next-available-priority'

ListenerNextAvailablePriority.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.property.nextPriority">nextPriority</a></code> | <code>number</code> | The next available priority. |

---

##### `node`<sup>Required</sup> <a name="node" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `nextPriority`<sup>Required</sup> <a name="nextPriority" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriority.property.nextPriority"></a>

```typescript
public readonly nextPriority: number;
```

- *Type:* number

The next available priority.

---


## Structs <a name="Structs" id="Structs"></a>

### ListenerNextAvailablePriorityProps <a name="ListenerNextAvailablePriorityProps" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps"></a>

Construction properties of ListenerNextAvailablePriority.

#### Initializer <a name="Initializer" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps.Initializer"></a>

```typescript
import { ListenerNextAvailablePriorityProps } from '@rogerchi/cdk-listener-next-available-priority'

const listenerNextAvailablePriorityProps: ListenerNextAvailablePriorityProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps.property.listener">listener</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.IListener</code> | The listener to retrieve the next available priority from. |

---

##### `listener`<sup>Required</sup> <a name="listener" id="@rogerchi/cdk-listener-next-available-priority.ListenerNextAvailablePriorityProps.property.listener"></a>

```typescript
public readonly listener: IListener;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IListener

The listener to retrieve the next available priority from.

---



