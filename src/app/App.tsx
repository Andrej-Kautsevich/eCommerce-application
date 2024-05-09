import { useEffect, useState } from 'react';
import apiRoot from '../api/apiRoot';

const App = () => {
  const [dataDetails, setDataDetails] = useState({});

  const getData = async () => {
    try {
      const data = await apiRoot.get().execute();

      setDataDetails(data.body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData().catch((error: Error) => error);
  }, []);

  return (
    <div>
      <button type="button" onClick={() => console.log(JSON.stringify(dataDetails, undefined, 2))}>
        click!
      </button>
    </div>
  );
};

export default App;
