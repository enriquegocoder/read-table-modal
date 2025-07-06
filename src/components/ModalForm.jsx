import { useState } from 'react';
import './ModalForm.css';

export const ModalForm = ({ closeModal, onSubmit, defaultValue }) => {

    // defaultValue fetch the data form edited row
    const [formState, setFormState] = useState(defaultValue || {
        page: "",
        description: "",
        status: "live",
    });

    const [errors, setErrors] = useState('');

    const validateForm = () => {

        if(formState.page && formState.description && formState.status) {
            setErrors('');
            return true;
        } else {
            let errorFields = [];
            for ( const [key, value] of Object.entries(formState)) {
                if(!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(', '));
            return false;
        }

    }

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value 
        })
    }
 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(!validateForm()) return;
        onSubmit(formState);
        
        console.log(formState);
        closeModal();

    }

    // const save = () => {
    //     console.log('Press Save');
    //     closeModal();
    // }

    const cancel = () => {
        console.log('Press Cancel');
        closeModal();
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                {/* <form> */}
                <div className="titleCloseBtn">
                    <button onClick={cancel}>X</button>
                </div>
                <div className="title">
                    <h5>Agrege una nueva pagina</h5>
                </div>
                <div className="body">
                    <div className='form-group'>
                        <label htmlFor="page">Page</label>
                        <input name='page' value={formState.page} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description">Description</label>
                        <textarea name='description' value={formState.description} onChange={handleChange}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="status">Status</label>
                        <select name='status' value={formState.status} onChange={handleChange}>
                            <option value="live">Live</option>
                            <option value="draft">Draft</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                    {errors && <div className='error'>{`please include: ${errors}`}</div>}
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={cancel}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>Continue</button>
                </div>
                {/* </form> */}
            </div>
        </div>
    );
}
