import {useEffect} from 'react';

function Inside() {
  useEffect(() => {
    console.log('INSIDE RENDER');
  }, []);

  return <>INSIDE </>;
}

export default Inside;
