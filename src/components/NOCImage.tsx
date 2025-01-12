function NOCImage({num}: {num: number}) {
  return (
    <img className="mx-auto" src={`NOC${num}.svg`}></img>
  );
}

export default NOCImage;