import { useState } from "react";
import { getQuestions } from "./utils/question";
import { Test } from "./components/Test";
import { TestOptions } from "./components/TestOptions";

function App() {
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const questionSets = getQuestions();
  return (
    <>
      {selectedSetIndex === null ? (
        <TestOptions onSelectSet={setSelectedSetIndex} />
      ) : (
        <Test
          questions={questionSets[selectedSetIndex]}
          onRestart={() => setSelectedSetIndex(null)}
        />
      )}
    </>
  );
}

export default App;
