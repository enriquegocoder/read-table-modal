import './Modal.css';

export const Modal = ({ closeModal }) => {
    return (
        <div className='modal-container' onClick={closeModal}>
            <div className='modal'>
                <form>
                    <div className='titleCloseBtn'>
                        <button onClick={closeModal}>x</button>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="page">Page</label>
                        <input name='page' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description">Description</label>
                        <textarea name='description' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="status">Status</label>
                        <select name='status'>
                            <option value="live">Live</option>
                            <option value="draft">Draft</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                    <div className="footer">
                        <button className='btn'>Cancel</button>
                        <button type='submit' className='btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
