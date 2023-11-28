'use client'
import { useEffect, useState } from "react";

type TableData = {
  id : number,
  name : string,
  phone : string,
  email : string,
  address : string,
}

export default function Home() {

  const [data, setData] = useState<TableData[] | null>(null);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'rafif gunawan',
        phone: '0831289320',
        email: 'tawapwoeka@faojfwpo.com',
        address: 'awdawd'
      }
    ]);
  }, [])

  return (
    <main className='min-h-screen w-full pt-10 max-w-5xl mx-auto'>
      <div className='flex gap-5 justify-end'>
        <button className='px-5 py-2.5 text-md bg-green-500/[0.9] text-white font-bold rounded hover:bg-green-500'>Create</button>
      </div>
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
                  <button className='px-2.5 py-1.5 rounded hover:bg-red-500/[0.8] bg-red-500 text-white font-bold mx-2' onClick={() => alert(`delete ${content.id}`)}>DELETE</button>
                  <button className='px-2.5 py-1.5 rounded hover:bg-blue-500/[0.8] bg-blue-500 text-white font-bold mx-2' onClick={() => alert(`edit ${content.id}`)}>EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
