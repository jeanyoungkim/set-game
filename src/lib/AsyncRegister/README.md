# AsyncRegister

The AsyncRegister provides a mechanism to signal to the server when it should wait for asynchronous actions to complete before processing and sending the initial markup to the client.

## Use case

When you have asynchronous actions that you want to be processed on the server (at instantiation time, e.g. in the `constructor`) before responding to the client, you'll need to explicitly register them to avoid an `Error` being thrown. The motivation behind this is explained later in this document.

## Usage

###### Decorator
```js
/* SomePage.jsx */

// ...
import {SOME_ASYNC_ACTION} from 'action/types';
import {registerAsyncActions} from 'lib/AsyncRegister';

@registerAsyncActions(SOME_ASYNC_ACTION)
@connect( // ... usual store connection decorator
    state => state.somePageState,
    SomePageActions
)
export default class SomePage extends Component {

    constructor(props, context) {
        super(props, context);

        // Dispatch async action
        this.props.someAsyncAction(this.props.data);
    }

    // ... render() and other methods
}
```

###### Asynchronous Action Format
>TODO: Our Asynchronous Action Format should be documented separately. But right now it's especially relevant for `AsyncRegister`, so it'll live here for now.

```js
/* SomePageActions.js */

import {SOME_ASYNC_ACTION} from 'action/types';
import api from 'api';

export function someAsyncAction(data) {
    return {
        type: SOME_ASYNC_ACTION,
        promise: api.someAsyncRequest(data) // Promise
    };
}
```

## Motivation

Because `ReactDOMServer.renderToString()` is synchronous, we need a way to signal to the server that it should wait for any asynchronous actions to complete before responding to the client. Without this, asynchronous actions will be fired and forgotten.

#### But why the `@registerAsyncActions()` decorator?

We wanted the decision to slow the server response down to be a very deliberate decision. To achieve this, we opted for a simple decorator where you can explicitly register which asynchronous actions you want to allow to slow down server rendering. Without explicitly registering your asynchronous actions, a fatal `Error` will be thrown.

#### Ok, but what if I don't want to block the server rendering, but fire the action as soon as the page loads?

Simply put your action dispatching in `componentDidMount()` lifecycle method, since this method only executes in a client context. This actually follows Facebook's recommended pattern.

```js
/* SomePage.jsx
   (Modified to only dispatch async action on client)
*/

// (Notice no need to import action type and lib/AsyncRegister)

@connect( // ... usual store connection decorator
    state => state.somePageState,
    SomePageActions
)
export default class SomePage extends Component {

    // This will only execute in a client context
    componentDidMount() {
        // Dispatch async action
        this.props.someAsyncAction(this.props.data);
    }

    // ... render() and other methods
}
```

## How does it work?

All the code can be inspected in `lib/AsyncRegister/*`, but in a nutshell, there's special middleware (`AsyncRegisterMiddleware.js` along with `PromiseMiddleware.js`) that intercepts all actions that have a `promise` defined and checks to see if they're registered with `AsyncRegister.js` (which is provided at the request-level via `AsyncRegisterProvider.js`). Then, when rendering on the server, any promises that have been collected will be `.all().then()`'d and then the server re-renders the markup and finally responds to the client.

>NOTE: This re-rendering (rendering twice) is necessary because React does not currently provide a way to instantiate React Components without actually rendering them to something (e.g. the `constructor` does not get called). To mitigate any (albeit marginal) time cost to this, the re-rendering is _only_ done when there are actually asynchronous actions that fired. A completely synchronous page will render immediately.
