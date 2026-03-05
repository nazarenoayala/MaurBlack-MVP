import { useState } from 'react';
import './addFlashModal.css';

const AddFlashModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        flash_title: '',
        price: '',
        is_available: 1,
        alt_text: '',
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!file) {
            setError('Please upload an image');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('flash_title', formData.flash_title);
            data.append('price', formData.price);
            data.append('is_available', formData.is_available);
            data.append('alt_text', formData.alt_text);
            data.append('category_id', 1);
            data.append('flash_img', file);

            await onSuccess(data);
            // reset form
            setFormData({ flash_title: '', price: '', is_available: 1, alt_text: '' });
            setFile(null);
            onClose();
        } catch (err) {
            setError('Error creating flash. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Add Flash Design</h2>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="modal-field">
                        <label>Title</label>
                        <input
                            type="text"
                            name="flash_title"
                            value={formData.flash_title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="modal-field">
                        <label>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="modal-field">
                        <label>Description</label>
                        <input
                            type="text"
                            name="alt_text"
                            value={formData.alt_text}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-field">
                        <label>Availability</label>
                        <select
                            name="is_available"
                            value={formData.is_available}
                            onChange={handleChange}
                        >
                            <option value={1}>Available</option>
                            <option value={0}>Unavailable</option>
                        </select>
                    </div>

                    <div className="modal-field">
                        <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                        {file && <p className="file-name">Selected: {file.name}</p>}
                    </div>

                    {error && <p className="modal-error">{error}</p>}

                    <div className="modal-actions">
                        <button type="button" className="modal-btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="modal-btn-submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Add Flash'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFlashModal;