import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
//import { Modal } from './components/Modal'
import { Table } from './components/Table';
import './App.css'
import { ModalForm } from './components/modalForm';



function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([]);
  //   { page: "Page 1", description: "This is a main page", status: "live" },
  //   { page: "Page 2", description: "This is a second page", status: "draft" },
  //   { page: "Page 3", description: "This is a third page", status: "error" },
  // ]);

  const [rowToEdit, setRowToEdit] = useState(null);

  const API_URL = 'http://localhost:5000/api/pages';

  useEffect(() => {
    fetchPages();
  }, []);


  const fetchPages = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log(response.data);
      setRows(response.data);
      console.log("rows: ", rows);
    } catch (error) {
      console.log(error);
    }
  };


  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  }


  const handleDeleteRow = async (targetIndex) => {
    // Confirm deletion with the user
    //const r = rows.find(({ pageid }) => pageid === targetIndex);
    // console.log('rows[targetIndex].pageid', rows[targetIndex].pageid);
    // console.log('handleDeleteRow', targetIndex);
    // console.log('rows', rows);
    if (window.confirm(`Are you sure you want to delete: ${rows[targetIndex].page}?`)) {
      try {
        await axios.delete(`${API_URL}/${rows[targetIndex].pageid}`);
        toast.success('Delete page successfully');
        fetchPages();
      } catch (error) {
        toast.error(error);
      }
      //setRows(rows.filter((_, idx) => idx !== targetIndex))
    }
    
  }

  
  const handleSubmit = async (newRow) => {
    if (rowToEdit === null) {
      // If rowToEdit is null, it means we are adding a new row
       await axios.post(API_URL, newRow);
       toast.success('Page added successfully');
       setRows([...rows, newRow]);
    } else {
      // If rowToEdit is not null, we are editing an existing row
      await axios.put(`${API_URL}/${newRow.pageid}`, newRow);
      toast.success('Page updated successfully');
      setRows(
        rows.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          
          return newRow;
          
        })
      );
    }
    };


  return (
    <>
      <div className='App'>
        <ToastContainer />
        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
        <button className='btn' onClick={() => setModalOpen(true)}>Add</button>  {/* () => setModalOpen(true) abre form Modal */}
        {modalOpen && (
          <ModalForm
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={rowToEdit !== null && rows[rowToEdit]}
          />)}
      </div>
    </>
  )
}

export default App
