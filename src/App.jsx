import { useState, useEffect } from 'react';
//import { Modal } from './components/Modal'
import { Table } from './components/Table';
import './App.css'
import { ModalForm } from './components/modalForm';


function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const [rows, setRows] = useState([
    { page: "Page 1", description: "This is a main page", status: "live" },
    { page: "Page 2", description: "This is a second page", status: "draft" },
    { page: "Page 3", description: "This is a third page", status: "error" },
  ]);

  const [rowToEdit, setRowToEdit] = useState(null);
  
  useEffect(() => {
    console.log('Una sola vez?');
  }, [])

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  }


  const handleDeleteRow = (targetIndex) => {

    setRows(rows.filter((_, idx) => idx !== targetIndex));

  }

  
 const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };


  return (
    <>
      <div className='App'>
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
