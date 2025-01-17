import TaskContextProvider from "./context/TaskContextProvider";

function App() {
  return (
    <TaskContextProvider>
      <div className="text-3xl text-center"> Task Board </div>
    </TaskContextProvider>  
  );
}

export default App;
