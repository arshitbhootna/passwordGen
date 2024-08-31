import { useState , useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [number,setNumber] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setpassword]=useState("");
  //for copy the specified password , we use another hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy"
    if(number){
      str+="0123456789"
    }
    if(char){
      str+="!@#$%^&*()"
    }
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+= str.charAt(char);
    }
    setpassword(pass);




  },[length,number,char,setpassword])
  useEffect(()=> passwordGenerator(),[length,number,char,setpassword]);
  const copyPasswordToClipboard= useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3);
  },[password]);

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'> 
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password' 
      readOnly
      ref={passwordRef}/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
    </div>
    <div className='flex tex-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{
          setlength(e.target.value);
        }}/>
          <label >Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={number}
        id="numberinput"
        onChange={()=>{
          setNumber((prev)=> !prev)
        }}
         />
         <label htmlFor='numberinput' > Number</label>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={char}
        id="charinput"
        onChange={()=>{
          setChar((char)=> !char)
        }}
         />
         <label htmlFor='charinput'> Character</label>

      </div>
    </div>
    </div>


     </div>
    </>
  )
}

export default App
