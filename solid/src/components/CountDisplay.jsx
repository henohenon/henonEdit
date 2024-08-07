function CountDisplay(props) {
    return (
      <div>
        <h1>Count: {props.count()}</h1>
      </div>
    );
}

export default CountDisplay;