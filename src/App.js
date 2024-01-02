import './App.css';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
function App() {
  const [allTodos,setAllTodos]=useState([])
  const [newTitle, setNewTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updtTitle, setUpdtTitle] = useState("")
  const [updtDesc,setUpdtDesc]=useState("")
  const handleTodo = () => {
    if (newTitle.length == 0 || desc.length == 0) {
      Swal.fire("Please fill the Title or Decription to Add the Data")
    }
    else {
      let newTodo = {
        title: newTitle,
        description:desc
      }
      let updatedTodoarr = [...allTodos]
      updatedTodoarr.push(newTodo)
      setAllTodos(updatedTodoarr)
      sessionStorage.setItem("todos",JSON.stringify(updatedTodoarr))
    }
    
  }
  const handleDel = (index) => {
    let reduced = [...allTodos]
    reduced.splice(index,1)
    sessionStorage.setItem("todos", JSON.stringify(reduced))
    setAllTodos(reduced)
  }
  const handleUpdate = () => {
    if (updtTitle.length == 0 || updtDesc.length == 0) {
      Swal.fire("Please fill Title or Description to Update the data")
    }
    else {
      console.log(updtDesc);
      let items = [...allTodos]
    items.map((i, ind) =>{
      if (ind == sessionStorage.getItem("ind")) {
        i.title = updtTitle
        i.description=updtDesc
      }
    })
    setAllTodos(items)
    sessionStorage.setItem("todos",JSON.stringify(items))
    sessionStorage.removeItem("edit")
      sessionStorage.removeItem("ind")
      setUpdtDesc("")
      setUpdtTitle("")
    
    }
    
  }
  useEffect(() => {
    let savedDat = JSON.parse(sessionStorage.getItem("todos"))
    if (savedDat) {
      setAllTodos(savedDat)
    }
  },[])
  return (
    <div className="App">
      <h1>My Todo Application</h1>
      <div className='to_do_app'>
        <div className='to_do_input'>
          <div className='todo_item'>
            <label>Title</label>
            <input type='text' placeholder='What is the Task Title' onChange={(e)=>setNewTitle(e.target.value)} required={true} />
          </div>
          <div className='todo_item'>
          <label>Description</label>
            <input type='text' placeholder='What is the Task Description' onChange={(e)=>setDesc(e.target.value)} />
          </div>
          <div className='todo_item'>
          <button className='primaryBtn' onClick={handleTodo}>Add</button>
          
          </div>
         
          <div>
          
          </div>
        </div>
        {
          sessionStorage.getItem("edit") &&
<div className='to_do_input'>
          <div className='todo_item'>
            <label>updated Title</label>
            <input type='text' placeholder='Enter updated Task Title' onChange={(e)=>setUpdtTitle(e.target.value)} required={true} />
          </div>
          <div className='todo_item'>
          <label>updated Description</label>
            <input type='text'placeholder='Enter updated Description' onChange={(e)=>setUpdtDesc(e.target.value)} required />
          </div>
          <div className='todo_item'>
          <button className='primaryBtn' onClick={handleUpdate}>update</button>
          
          </div>
         
          <div>
          
          </div>
        </div>
       }
        
        <div className='todo_list'>
          {
            allTodos.map((item,index) => {
              return (
                <div className='todo_listitem' key={index}>
                  <div className='icondiv'>
                <AiFillDelete className='icon' onClick={()=>handleDel(index)} />
                    <MdEdit className='icon' onClick={() => {
                      sessionStorage.setItem("edit", true)
                      sessionStorage.setItem("ind", index)
                      window.location.reload()
                    }
                    }/>
                  </div>
                  <h3>{item.title}</h3>
                 
                  
                  <p>{item.description}</p>
                  
                
              </div>
              )
            })
           }
          
          </div>
      </div>
    </div>
  );
}

export default App;
