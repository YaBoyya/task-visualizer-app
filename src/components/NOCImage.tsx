function NOCImage({num}: any) {
  // TODO style
  return (
    <img className="mx-auto" src={`NOC${num}.svg`}></img>
  );
}

export default NOCImage;