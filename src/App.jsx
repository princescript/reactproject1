import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setlength] = useState(6);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState('')
  const passwordRef = useRef(null);


  const genratePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "!@#$%^&*()_+";
    if (numberAllowed) str += "0123456789";


    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClickboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select();
  }


  useEffect(() => {
    genratePassword();
  }, [length, numberAllowed, charAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-700 text-orange-600'>
      <h1 className='text-white text-center my-3'>Password Genrator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input className='w-full py-1 px-3 outline-none'
          placeholder='password'
          readOnly
          ref={passwordRef}
          type="text"
          value={password}>
        </input>
        <button onClick={copyPasswordToClickboard}
          className='bg-blue-600 text-white'
        >copy</button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1'>
          <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setlength(e.target.value)}
            name=''
            id='' />
          <label htmlFor='length'>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={numberAllowed}
            onChange={() => setnumberAllowed(((prev) => !prev))}
            id=""
            name=""
          />
          <label htmlFor='numbers'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox'
            defaultChecked={charAllowed}
            onChange={() => setcharAllowed(((prev) => !prev))}
            id=""
            name=""
          />
          <label htmlFor='character'>Character</label>
        </div>
      </div>
    </div>
  )
}

export default App