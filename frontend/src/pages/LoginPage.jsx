import { useState } from 'react';
import api from '../api/client';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', emailOrPhone:'', userId:'', otpCode:'' });

  async function submit(e) {
    e.preventDefault();
    if (mode === 'register') alert((await api.post('/auth/register', form)).data.otpForDemo);
    if (mode === 'verify') alert((await api.post('/auth/verify-otp', form)).data.message);
    if (mode === 'login') {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token); window.location.href='/';
    }
  }
  return <div className='p-6 max-w-xl mx-auto'>
    <h1 className='text-2xl font-bold mb-4'>Study Platform Auth</h1>
    <div className='flex gap-2 mb-4'>{['login','register','verify'].map(m=><button key={m} onClick={()=>setMode(m)} className='px-3 py-1 bg-slate-800 text-white rounded'>{m}</button>)}</div>
    <form onSubmit={submit} className='grid gap-2'>
      <input className='border p-2' placeholder='name' onChange={e=>setForm({...form,name:e.target.value})} />
      <input className='border p-2' placeholder='email' onChange={e=>setForm({...form,email:e.target.value})} />
      <input className='border p-2' placeholder='phone' onChange={e=>setForm({...form,phone:e.target.value})} />
      <input className='border p-2' placeholder='email or phone' onChange={e=>setForm({...form,emailOrPhone:e.target.value})} />
      <input className='border p-2' type='password' placeholder='password' onChange={e=>setForm({...form,password:e.target.value})} />
      <input className='border p-2' placeholder='userId (for verify)' onChange={e=>setForm({...form,userId:e.target.value})} />
      <input className='border p-2' placeholder='otpCode' onChange={e=>setForm({...form,otpCode:e.target.value})} />
      <button className='bg-blue-600 text-white p-2 rounded'>Submit</button>
    </form>
  </div>;
}
