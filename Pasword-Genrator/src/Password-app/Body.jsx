import { useCallback, useEffect, useRef, useState } from "react";

function Body() {
  const [length, setLength] = useState(9);
  const [Numbers, setNumbers] = useState(false);
  const [character, setCharacter] = useState(false);
  const [Password, setPassword] = useState("");

//   useReff hook
const passwordReff = useRef(null)

// copyto clipbord
const ClipboardCopy = useCallback(()=>{
    passwordReff.current?.select()
    passwordReff.current?.setSelectionRange(0,15)
window.navigator.clipboard.writeText(Password)
},[Password])

  const CreatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (Numbers) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, Numbers, character, setPassword]);

  useEffect(() => {
    CreatePassword();

  }, [length,Numbers,character,CreatePassword]);
  return (
    <>
      <div className="h-screen w-full bg-[url('https://t4.ftcdn.net/jpg/05/79/54/53/360_F_579545387_6JuKZXKyBuvrGTVxcCIXPZnE5cr41vC9.jpg')] bg-no-repeat bg-cover flex justify-center items-center ">
        <div className="bg-cyan-400 h-96 w-1/2  text-3xl rounded-xl italic font-semibold text-center pt-5">
        Password-Generator
          <div className="flex shadow  overflow-hidden mt-5 w-4/6   m-auto">
            <input
              type="text"
              className="outline-none w-full py-1 px-3 rounded-l-lg"
              placeholder="Password"
              readOnly
              value={Password}
              ref={passwordReff}
            />
            <button onClick={ClipboardCopy}
             className="outline-none bg-blue-700  text-white px-3 py-0.5 shrink-0  rounded-r-lg ">
              Copy
            </button>
          </div>
          <div className="flex text-lg justify-center items-center gap-3 mt-4 ">
            <div className="flex items-center overflow-hidden gap-x-1">
              <input
                type="range"
                min={5}
                max={20}
                className="cursor-pointer"
                onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" id="numberInput"
              defaultChecked={Numbers}
              onChange={()=>{
                setNumbers((prev)=>!prev)
              }}
              />
              <label >Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input type="checkbox" id="characterInput"
              onChange={()=>{
                setCharacter((prev)=>!prev)
              }}
              defaultChecked={character}
               />
              <label >Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
