import { useState, useEffect } from 'react';

interface InputModalProps {
  show: boolean;
  status: string;
  handleClose: () => void;
  handleSave: (data: MyFormData) => void;
  inputData?: MyFormData | null;
}

interface MyFormData {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

const InputModal: React.FC<InputModalProps> = ({ status, show, handleClose, handleSave, inputData }) => {
    const [formData, setFormData] = useState<MyFormData>({ id: 0, name: '', phone: '', email: '', address: '' });

    const title = (status == 'create' ? "Input Data" : "Update Data");

    useEffect(() => {
      if (inputData) {
        setFormData(inputData);
      }
    }, [inputData]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSaveClick = () => {
      handleSave(formData);
      handleClose();
    };
  
    const initializeForm = () => {
      if (status === 'create') {
        setFormData({ id: 0, name: '', phone: '', email: '', address: '' });
      } else if (status === 'update' && inputData) {
        setFormData(inputData);
      }
    };
  
    useEffect(() => {
      initializeForm();
    }, [show, status, inputData]);

    return (
        <div className={`modal ${show ? 'block' : 'hidden'} fixed inset-0 z-10 overflow-y-auto`}>
        <div className="flex items-center justify-center min-h-screen">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

            <div className="modal-container bg-white w-96 mx-auto p-4 rounded shadow-lg z-50 relative">
            <div className="modal-content">
                <div className="modal-header">
                <span onClick={handleClose} className="modal-close cursor-pointer z-50 right-5 top-0 absolute">
                    &times;
                </span>
                <h1 className="text-2xl font-bold">{title}</h1>
                </div>

                <div className="modal-body">
                <form>
                    <input
                        type="hidden"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                    <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                    </div>
                </form>
                </div>

                <div className="flex gap-2 justify-end">
                <button onClick={handleClose} className="bg-red-500 px-3 text-white py-1.5 rounded">
                    Close
                </button>
                <button onClick={handleSaveClick} className="bg-blue-500 px-3 text-white py-1.5 rounded">
                    Save
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default InputModal;
