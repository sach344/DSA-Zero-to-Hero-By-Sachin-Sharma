import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/client';

const modules = ['GK', 'DSA', 'Hindi', 'Paper 1', 'Paper 2', 'System Design'];

export default function DashboardPage() {
  const [items,setItems]=useState([]);
  const [form,setForm]=useState({ module:'GK', type:'note', title:'', category:'', folder:'', body:'', questionLink:'', videoLink:'', tags:'' });
  const [files,setFiles]=useState(null);

  async function load(){ const {data}=await api.get('/content'); setItems(data); }
  useEffect(()=>{load();},[]);

  async function save(e){
    e.preventDefault();
    const fd=new FormData(); Object.entries(form).forEach(([k,v])=>fd.append(k,v));
    if (files) Array.from(files).forEach(f=>fd.append('files',f));
    await api.post('/content',fd,{headers:{'Content-Type':'multipart/form-data'}}); setForm({...form,title:'',body:''}); load();
  }

  return <div className='min-h-screen bg-slate-100 p-4'>
    <div className='flex justify-between'><h1 className='text-2xl font-bold'>Study Dashboard</h1><button onClick={()=>{localStorage.removeItem('token');location.href='/login';}} className='bg-red-500 text-white px-3 rounded'>Logout</button></div>
    <div className='grid md:grid-cols-4 gap-4 mt-4'>
      <aside className='bg-white p-4 rounded shadow'><h2 className='font-semibold mb-2'>Modules</h2>{modules.map(m=><div key={m} className='py-1'>{m}</div>)}</aside>
      <section className='md:col-span-3 bg-white p-4 rounded shadow'>
        <form onSubmit={save} className='grid gap-2'>
          <select className='border p-2' value={form.module} onChange={e=>setForm({...form,module:e.target.value})}>{modules.map(m=><option key={m}>{m}</option>)}</select>
          <select className='border p-2' value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>note</option><option>question</option><option>file</option></select>
          <input className='border p-2' placeholder='Category/Section' value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
          <input className='border p-2' placeholder='Folder (for DSA)' value={form.folder} onChange={e=>setForm({...form,folder:e.target.value})}/>
          <input className='border p-2' placeholder='Title' value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
          <input className='border p-2' placeholder='Question Link' value={form.questionLink} onChange={e=>setForm({...form,questionLink:e.target.value})}/>
          <input className='border p-2' placeholder='Video Link' value={form.videoLink} onChange={e=>setForm({...form,videoLink:e.target.value})}/>
          <ReactQuill theme='snow' value={form.body} onChange={(value)=>setForm({...form,body:value})} />
          <input className='border p-2' placeholder='Tags comma separated' value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})}/>
          <input className='border p-2' type='file' multiple onChange={e=>setFiles(e.target.files)} accept='.pdf,image/*'/>
          <button className='bg-blue-600 text-white p-2 rounded'>Save Content</button>
        </form>
        <div className='mt-6'>
          {items.map(i=><div key={i._id} className='border-b py-2'><div className='font-semibold'>{i.module} • {i.type} • {i.title}</div><div dangerouslySetInnerHTML={{__html:i.body||''}} /></div>)}
        </div>
      </section>
    </div>
  </div>;
}
