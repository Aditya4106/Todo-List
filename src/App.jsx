import { useState , useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("")
    savetoLS();
  };

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter"  && todo.length >= 3) {
      handleAdd();
    }
  };

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id == id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id
    });

    setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item=>{
      return item.id!==id
    });

    setTodos(newTodos);
    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS();
  };

 

  return (
    <>
      <Navbar/>
      <div className="container bg-violet-200 mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-96 md:w-1/2">
        <div className="addtodo my-5">
          <h1 className="font-mono font-bold text-2xl text-center mb-5">you can update your todos daily</h1>
          <h1 className="text-xl font-mono font-semibold">Add a Todos</h1>
          <input
            onChange={handleChange}
            onKeyDown={handleKeyPress} 
            value={todo}
            type="text"
            placeholder="Add your todo"
            className="p-2 font-mono font-bold rounded-lg xl:w-5/6 lg:w-4/6 md:w-2/3 w-2/3 my-2 text-xl text-zinc-800"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=2}
            className="ml-4  rounded-md text-white font-mono px-5 py-2 text-xl bg-blue-600  hover:bg-blue-900 disabled:bg-blue-600"
          >
            Save
          </button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showfinished} /> Show Finished
        <h2 className="text-xl font-mono font-semibold">Your Todos</h2>

        <div className="todos">
          {todos.length == 0 && <div className="m-5">No Todos to display.</div>}
          {todos.map((item) => {
            
              return (showfinished || !item.isCompleted) && <div key={item.id} className="todo relative flex items-center my-3 p-2 ">
              <div className="flex gap-3 items-center w-full">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""} style={{ flexGrow: 1, textAlign: "left" }}>
                  {item.todo}
                </div>
              </div>
          
              <div className="buttons absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2 
                  md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                <button
                  onClick={(e) => { handleEdit(e, item.id); }}
                  className="rounded-md text-white font-mono px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-lg bg-blue-600 hover:bg-blue-900"
                >
                  Edit
                </button>
            
                <button
                  onClick={(e) => { handleDelete(e, item.id); }}
                  className="rounded-md text-white font-mono px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-lg bg-blue-600 hover:bg-blue-900"
                >
                  Delete
                </button>
              </div>
            </div>
            
          })}
        </div>
      </div>
    </>
  );
}

export default App;
