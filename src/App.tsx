import { useState, useRef } from "react";
import { Root } from "./features/Root";
import { Gallery } from "./features/Gallery";
import { Map } from "./features/Map";
import { dateFormatISO } from "./helpers";

const firstDay = new Date();

function App() {
  const dateRef = useRef(dateFormatISO(firstDay));
  const [date, setDate] = useState(dateRef.current);
  return (
    <Root>
      <></>
      <Gallery setDate={setDate} today={date} />
      <Map date={date} />
    </Root>
  );
}

export default App;
