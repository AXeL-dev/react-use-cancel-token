import React from 'react';
import axios from 'axios';
import _ from 'lodash';

import useCancelToken from 'react-use-cancel-token';

const App = () => {
  const [searching, setSearching] = React.useState(false);
  const [result, setResult] = React.useState('No results.');
  const { newCancelToken, cancelPreviousRequest, isCancel } = useCancelToken();

  const performSearch = async (keywords) => {
    cancelPreviousRequest();
    setSearching(true);

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${keywords}&sort=stars&order=desc`,
        {
          cancelToken: newCancelToken(),
        }
      );

      if (response.status === 200) {
        setResult(response.data.items);
      }
    } catch (err) {
      if (isCancel(err)) return;
      setResult('An error occured!');
      console.error(err);
    }

    setSearching(false);
  };

  const delayedSearch = React.useCallback(_.debounce(performSearch, 400), [performSearch]);

  const handleChange = (event) => {
    const { value } = event.target;
    delayedSearch(value);
  };

  const handleCancel = () => {
    cancelPreviousRequest();
    setSearching(false);
  };

  const handleKeyDown = (event) => {
    const { value } = event.target;
    if (event.key === 'Enter') {
      performSearch(value);
    }
  };

  return (
    <>
      <input type="text" placeholder="Search..." onChange={handleChange} onKeyDown={handleKeyDown} />
      <button onClick={handleCancel} disabled={!searching}>
        Cancel
      </button>
      {searching && ' Searching...'}
      <br />
      <br />
      <div>
        {_.isArray(result) ? (
          <>
            <h3>Github repositories:</h3>
            <ul>
              {result.map((item, index) => (
                <li key={index}>
                  <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ) : (
          result
        )}
      </div>
    </>
  );
};
export default App;
