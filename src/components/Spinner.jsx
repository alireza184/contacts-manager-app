const spinnerGif = require('../assets/Spinner.gif');

export const Spinner = () => {
  return (
    <>
      <img
        src={spinnerGif}
        alt="Spinner"
        className="d-block m-auto"
        style={{ width: '200px' }}
      />
    </>
  );
};


