import React from "react";

import useCounterStore from "@/stores/counters";

const Home: React.FC = () => {
  const counter = useCounterStore((state) => state.counter);
  const count = useCounterStore((state) => state.count);
  return (
    <div>
      <div>home page</div>
      <button onClick={() => count(2)}>counter: {counter}</button>
    </div>
  );
};

export default Home;
