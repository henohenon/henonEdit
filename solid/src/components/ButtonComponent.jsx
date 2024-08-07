function ButtonComponent(props) {
  return (
    <div>
      <button onClick={() => props.setCount((prev) => prev + 1)}>Increment</button>
      <textarea></textarea>
    </div>
  );
}

export default ButtonComponent;