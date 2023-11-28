'use client'
import { useEffect, useState } from "react";
import InputModal from "../component/modal";
import Swal from "sweetalert2";

type TableData = {
  id : number,
  name : string,
  phone : string,
  email : string,
  address : string,
}

interface MyFormData {
  id : number,
  name: string;
  phone: string;
  email: string;
  address: string;
}

export default function Home() {

  const [data, setData] = useState<TableData[] | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<MyFormData | null>(null);

  const handleOpenModal = (nowData :any) => {
    setEditData(nowData)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveData = (formData: MyFormData) => {
    if(status === 'create') {
      fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        getData();
      })
    } else if (status === 'update') {
      fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        getData();
      })      
    }
  };

  const getData = async () => {
    setLoading(true)
    fetch('/api/read', {
      method: 'POST',
    })
    .then((res) => res.json())
    .then((data) => {
      setData(data.data)
      setLoading(false)
    })
  }

  const handleDelete = async (id:number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          fetch('/api/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: id,
            }),
          })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false)
            getData();
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success"
            });
          })
        } catch (error) {
          Swal.fire({
            title: "ERROR!",
            text: "",
            icon: "error"
          });
        }
      }
    });
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <main className='min-h-screen w-full pt-10 max-w-5xl mx-auto'>
      <div className='flex gap-5 justify-end'>
        <button className='px-3 py-1.5 text-md bg-green-500/[0.9] text-white font-bold rounded hover:bg-green-500' onClick={() => {handleOpenModal(null);setStatus('create')}}>Create</button>
      </div>

      <InputModal
        status={status}
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveData}
        inputData={editData}
      />

      {loading ? (

        <div className="flex justify-center">
            <svg className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      ): ( (data && data.length > 1) ? (      
      
        <div className='mt-10'>
          <table className='w-full text-xs'>
            <thead>
              <tr>
                <th className='border border-black bg-button text-button'>NO</th>
                <th className='border border-black bg-button text-button'>NAME</th>
                <th className='border border-black bg-button text-button'>PHONE</th>
                <th className='border border-black bg-button text-button'>EMAIL</th>
                <th className='border border-black bg-button text-button'>ADDRESS</th>
                <th className='border border-black bg-button text-button'>ACTION</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {data?.map((content, index) => (
                <tr key={index}>
                  <td className='py-2 border border-black text-center'>{index + 1}</td>
                  <td className='py-2 border border-black text-center'>{content.name}</td>
                  <td className='py-2 border border-black text-center'>{content.phone}</td>
                  <td className='py-2 border border-black text-center'>{content.email}</td>
                  <td className='py-2 border border-black text-center'>{content.address}</td>
                  <td className='py-2 border border-black text-center'>
                    <button className='px-2.5 py-1.5 rounded hover:bg-red-500/[0.8] bg-red-500 text-white font-bold mx-2' onClick={() => handleDelete(content.id)}>DELETE</button>
                    <button className='px-2.5 py-1.5 rounded hover:bg-blue-500/[0.8] bg-blue-500 text-white font-bold mx-2' onClick={() =>{ handleOpenModal(content);setStatus('update')}}>UPDATE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      ) : (
        <h1 className="flex justify-center">
          Kosong Hehe
        </h1>
      )
       
       )}


    </main>
  )
}
