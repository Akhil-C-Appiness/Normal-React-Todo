import React, {useState} from 'react';

function App() {
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const [todo, setTodo] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState("");
  const [per,setPer]=useState(false);
  const[tempId,setTempId]=useState("");

  const handleAdd = () => {
    if (input.length < 1 || !desc) {
      setError("Please enter the Title and Description")
    } else {
      setError("");
      const newData = [...todoList, {id: todoList.length+1, title: input, desc}];
      setTodoList(newData);
      resetFields();
    }
  }
  const resetFields = () => {
    setInput("");
    setDesc("");
  }

  const handleEdit = (id) => {
    setPer(true)
    setTempId(id)
    const todo = todoList.find(el => el.id === id);
    setInput(todo.title);
    setDesc(todo.desc);
}

  const handleDelete = (id) => {
    const arr = todoList.filter(el => el.id !== id)
    setTodoList(arr)
  }
  const handleUpdate=()=>{
    const data = {
      id: tempId,
      title: input,
      desc: desc
    }

    const arr = todoList.filter(el => el.id !== tempId);
    const items = [...arr, data]
    setTodoList(items);
    setPer(false);
    resetFields();
  }
  const renderTodoList = () => (todoList && (
    <table>
          <thead>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </thead>
          <tbody>
            {todoList.map(item => 
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>
                    <div>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )}
          </tbody>
        </table>
  ))
  return (
    <div className="App">
      <div>
        <h5>Create Todo</h5>
        <div>
          <input type="text" placeholder='Title' value={input} onChange={(e) => setInput(e.target.value)}/><br />
          <input type="text" placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)}/><br />
          <div>
            {!input || !desc ? error : ""}
          </div>
        {per?<button onClick={handleUpdate}>Update</button>:<button onClick={handleAdd}>Add</button>}
        </div>
      </div>
      <div>
        <h5>Todo List</h5>
        <div>
          {
            todoList.length > 0 ? renderTodoList() : "No Todo data in the List"
          }
        </div>
      </div>
    </div>
  );
}

export default App;
