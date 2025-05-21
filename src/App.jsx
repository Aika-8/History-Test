import { useState } from "react";
import { getQuestions } from "./utils/question";
import { Layout } from "./components/Layout";
import { TestOptions } from "./components/TestOptions";

function App() {
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const questionSets = getQuestions();
  return (
    <>
      {selectedSetIndex === null ? (
        <Layout onSelectSet={setSelectedSetIndex} />
      ) : (
        <TestOptions
          questions={questionSets[selectedSetIndex]}
          onRestart={() => setSelectedSetIndex(null)}
        />
      )}
    </>
  );
}

export default App;
