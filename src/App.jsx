import React from 'react'
import { useState, useCallback,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setlength] = useState(8)
  const [numAllow, setnumAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");
  //useRef
  const passwordRef=useRef(null)
  const [copied,setCopied]=useState(false);
  
  //useCallback hook --optimise
  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+={}[]~`"
    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)
  }, [length, numAllow, charAllow,setpassword])

 const copyPasstoClip=useCallback(()=>{
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  setCopied(true);
  setTimeout(()=>setCopied(false),2000)

},[password])
 //useEffect hook --kuch bhi diff to run again
 useEffect(()=>{passGenerator()},[length,numAllow,charAllow,passGenerator])


  return (
    <>

      <div className='w-full max-w-md mx-auto rounded-lg px-10 py-4 my-8 text-[#000] bg-[#ffafcc]'>
        <h1 className='text-[#000] text-center uppercase my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={password} className='outline-none w-full py-3 px-5 bg-amber-50' placeholder='password' readOnly ref={passwordRef}>
          </input>
          <button onClick={copyPasstoClip} className='outline-none  py-3 px-3 bg-[#bde0fe] text-white shrink-0'>COPY</button>
        </div>
       {copied && (
  <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
    ✅ Copied to clipboard!
  </div>
)}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} className='cursor-pointer'   value={length} onChange={(e) => { setlength(e.target.value) }} />
            <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} id="numberInput" onChange={() => setnumAllow((prev) => !prev) } />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id="charInput" onChange={() => { setcharAllow((prev) => !prev); }} />
            {/* //onChange fn reverses */}
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
