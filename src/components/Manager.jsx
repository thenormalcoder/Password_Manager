import React, { useEffect } from 'react'

  import { ToastContainer, toast } from 'react-toastify';
  import { v4 as uuidv4 } from 'uuid';
  import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react'
const Manager = () => {
  const ref = useRef()
  const passwordref=useRef();
 const [details, setdetails] = useState({sitename:"",username:"",password:""});
 const [passwordarray, setpasswordarray] = useState([])
 const getpasswords=async ()=>{
  let req=await fetch("http://localhost:3000")
  let passwordA=await req.json()
    console.log(passwordA)
    setpasswordarray(passwordA)
  
 }
 useEffect(() => {
  getpasswords();
  
 }, [])
 

  const passwordcheck = () => {
    passwordref.current.type="password"
    console.log(ref.current.src)
    
    if (ref.current.src == "https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain") {
      passwordref.current.type="text"
      ref.current.src = "https://cdn2.iconfinder.com/data/icons/security-335/512/Show_password_icon_eye_symbol_vector_vision-512.png"
    }
    else {
      ref.current.src = "https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain"
    }
  }
  
  const savepassword=async() => {
    // console.log(details)
    if(details.username.length>3 &&details.password.length>3 && details.sitename.length>3 ){
    

    // await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type":"application/json"},body: JSON.stringify({id: details.id})}) 
    setpasswordarray([...passwordarray,{...details,id:uuidv4()}])
    
    await fetch("http://localhost:3000",{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({...details,id: uuidv4()})})
    setpasswordarray([...passwordarray,{...details,id:uuidv4()}])
    setdetails({sitename:"",username:"",password:""})
    // localStorage.setItem("passwordA",JSON.stringify([...passwordarray,{...details,id:uuidv4()}]))
    toast('Saved!!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    
    
    // console.log([...passwordarray,{...details,id:uuidv4()}])
  
    // {details.password="",details.username="",details.sitename=""}
    // console.log(details)
    }
    else{
      toast('Size invalid!!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    }
    // {details.password="",details.username="",details.sitename=""}
    // console.log(details)
  }
  const handlechange=(e)=>{
  setdetails({...details,[e.target.name]:e.target.value});
  }
  const deletepassword=async(id) => {
    console.log("the delted password id is" +id)
    
    if(confirm('are you sure you want to delete')){
      toast('Deleted permanently', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
        setpasswordarray(passwordarray.filter(item=>item.id!==id));
        let res=await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})}) 
    
    // localStorage.setItem("passwordA",JSON.stringify(passwordarray.filter(item=>item.id!==id)))
   
    }
    
      
    
  }
  const pdeletepassword=async(id) => {
    console.log("the delted password id is" +id)
    
   
        if(confirm("Kindly update your passwords else it will be deleted"))
       { setpasswordarray(passwordarray.filter(item=>item.id!==id))
        let res=await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})}) 
       }
       else{
        savepassword();
       }
    // localStorage.setItem("passwordA",JSON.stringify(passwordarray.filter(item=>item.id!==id)))
   
    
    
      
    
  }
  const editpassword=(id) => {
    console.log("editing the password with id",id)
    pdeletepassword(id);
    setdetails({...passwordarray.filter(i=>i.id===id)[0],id: id});
    setpasswordarray(passwordarray.filter(item=>item.id!==id));
     // console.log(a.password)
    // {details.password=a.password,details.username=a.username,details.sitename=a.sitename}
    // console.log(details)
    // {details.password=a.password,details}
    // setdetails(passwordarray.filter(i=>i.id===id)[0])
  }
  
  
  const copytext=(text) => {
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
   navigator.clipboard.writeText(text)
  }
  
  return (
    <>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
      < div className='min-h-[80vh] max-h-[130vh]'>
        <div className="absolute inset-0 -z-10 min-h-[130vh] w-full items-center px-5 py-24 [background:radial-gradient(150%_105%_at_50%_20%,#000_40%,#63e_130%)]"></div>
        <div className="content flex flex-col bg-blue-400 p-5 my-5 max-w-lg mx-auto min-w-[70vw] ">
          <div className="head mx-auto text-4xl">
            <span className='text-blue-600 font-bold'>&lt;</span>
            <span className='text-white font-bold'>Word </span>
            <span className='text-blue-600 font-bold'> Wrapped/&gt;</span>
            <h2 className='text-2xl text-center text-blue-600 font-bold'>Wrapped and Saved</h2>
          </div>
          {/* <input value=} type="text" className='rounded-full px-5 py-2 my-5 border-3 '/> */}
          <input onChange={handlechange} value={details.sitename} type="text" name='sitename' id="sitename" placeholder="Enter the Website link" className='rounded-full px-5 py-2 my-5 border-3 text-red-600 ' />
          <div className="otherc flex justify-between">
            <input onChange={handlechange} value={details.username} type="text" name="username" id="username" placeholder="Enter the Name" className='rounded-full px-8 py-1 text-black' />
            <div className='relative'>
              <input onChange={handlechange}  value={details.password} ref={passwordref}  placeholder="Enter the password"  type="password" name="password" id="password" className='rounded-full px-8 py-2 border-3 border-green-950 text-black' />
              <span className='absolute  text-black right-4 cursor-pointer top-2' onClick={passwordcheck}><img ref={ref} src="https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain" width={30} alt="" /></span>
            </div>

          </div>
          <button onClick={savepassword}  className="text-xl flex gap-3 justify-center items-center bg-blue-700 text-white rounded-full px-6 py-2 my-5 w-fit font-bold mx-auto hover:bg-blue-600 border-4 ">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              delay="2000ms"
              trigger="loop-on-hover"

            >
            </lord-icon>
            <p>Add password</p>
          </button>
        </div>
        <div className="table m-auto min-w-[70vw] my-5 min-h-[80vh]">
          <h1 className='text-white font-bold text-2xl py-2'>Your Passwords</h1>
          {passwordarray.length==0 && <div className='text-white '>You do not have any passwords</div>}
          {passwordarray.length!=0 && <table className="table-auto text-center text-white font-bold w-full rounded-md overflow-hidden">
            <thead className=' bg-blue-400 w-full'>
              <tr>
                <th className='py-2'>URL</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Edit</th>
                <th className='py-2'>Delete</th>
              </tr>
            </thead>
            <tbody className='bg-blue-200'>
              {passwordarray.map((item,index)=>{
                return <tr key={index}>
                <td className='py-2 text-center w-20 '>
                  <div className="icons flex justify-center items-center gap-2 text-center">
                    <div><a href={item.sitename} target='_blank'> {item.sitename}</a></div>
                  
                  <div className="ico cursor-pointer"  onClick={()=>{copytext(item.sitename)}}>    
                  <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover" >
</lord-icon>
                  </div>
                
                  </div>
                </td>
                <td className='text-center w-20'>
                <div className="icons flex justify-center items-center gap-2 ">
                 <div>{item.username}</div>
                <div className="ico cursor-pointer "  onClick={()=>{copytext(item.username)}}>
                <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover"
    
    >
</lord-icon>
                </div>
                  </div>
                </td>
              
                <td className='text-center w-20'>
                <div className="icons flex justify-center items-center gap-2">
                 <span>{"*".repeat(item.password.length)}</span>
                <div className="ico cursor-pointer" onClick={()=>{copytext(item.password)}}>
                <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover"
    
    >
</lord-icon>
                </div>
                  </div>
                </td>
                <td  className='text-center w-20'>
                  <span className='cursor-pointer' onClick={()=>{editpassword(item.id)}}>
                  <lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    >
</lord-icon>
                  </span>
                </td>
                <td  className='text-center w-20'>
                 <span className='cursor-pointer' onClick={()=>{deletepassword(item.id)}}>
                  
                 <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
   >
</lord-icon>

                 </span>
                </td>
              </tr>
              })}
              
            </tbody>
          </table>
}
        </div>
      </div>
    </>
  )
}

export default Manager
