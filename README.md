# react-use-cancel-token

> A handy react hook to cancel axios requests

[![NPM](https://img.shields.io/npm/v/react-use-cancel-token.svg)](https://www.npmjs.com/package/react-use-cancel-token)
[![Downloads](https://img.shields.io/npm/dt/react-use-cancel-token.svg)](https://www.npmjs.com/package/react-use-cancel-token)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-green.svg)](https://standardjs.com)

### [Demo](https://axel-dev.github.io/react-use-cancel-token/)

## Install

```bash
npm install --save react-use-cancel-token
```

## Usage

```tsx
import * as React from 'react';
import axios from 'axios';

import useCancelToken from 'react-use-cancel-token';

const Example = () => {
  const { newCancelToken, cancelPreviousRequest, isCancel } = useCancelToken();

  const handleClick = async () => {
    cancelPreviousRequest();

    try {
      const response = await axios.get('request_url', { cancelToken: newCancelToken() });

      if (response.status === 200) {
        // handle success
      }
    } catch (err) {
      if (isCancel(err)) return;
      console.error(err);
    }
  };

  return <button onClick={handleClick}>send request</button>;
};
```

## Outputs

| Property              | Type              | Description                                                           |
| --------------------- | ----------------- | --------------------------------------------------------------------- |
| source                | MutableObjectRef  | Reference to Axios cancel token source                                |
| newCancelToken        | () => CancelToken | Generate the cancel token sent in the Axios request                   |
| cancelPreviousRequest | () => void        | Cancel any previous Axios request                                     |
| isCancel              | () => boolean     | Check if the error returned in Axios response is a cancel token error |

## License

MIT © [AXeL-dev](https://github.com/AXeL-dev)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
