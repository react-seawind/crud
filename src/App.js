import axios from 'axios';
import React,{useState,useEffect} from 'react'

export default function App() {
  const [api, setapi] = useState([]);                       // all data

  const [id, setid] = useState('');                         // id data
  const [name, setname] = useState('');                     // name data
  const [email, setemail] = useState('');                   // email data
  const [address, setaddress] = useState('');               // address data
  const [image, setimage] = useState('');                   // image data

  const [editmode, seteditmode] = useState(false);          // edit fun mate
  const [deletemode, setdeletemode] = useState(null);       // delete fun mate


  // api mathi data lavava
  const show = async () => {
    await axios.get(`https://65264ede917d673fd76bfda5.mockapi.io/crudopration`)
      .then((response) => {
        setapi(response.data);
      });
  };


  // data insert
  const additem = async () => {
    let a=window.confirm("Are you sure you want to add")
    let data = {
      name: name,
      email: email,
      address: address,
      image: image
    };
      if(a){
        await axios.post(`https://65264ede917d673fd76bfda5.mockapi.io/crudopration`, data)
      .then((response) => {
        setid("");
        setname("");
        setemail("");
        setaddress("");
        setimage("");
        show();
      });
        alert("Yes")
      }else{
        alert("No")
      }
   };


  // data delete
  const deleteitem = async (id) => {

    let data = window.confirm("Are you Sure you want to delete")
    if (data) {
      setdeletemode(id);
    await axios.delete(`https://65264ede917d673fd76bfda5.mockapi.io/crudopration/${id}`)
      .then((response) => {
        show();
        setdeletemode(null);

      });
      alert("Yes")
    } else {
      alert("No")
    }
    
};


  // data edit
  const edititem = async () => {

    let display=window.confirm("Are you sure you Want Edit")

    let data = {
      name: name,
      email: email,
      address: address,
      image: image
    };

if(display){
  await axios.put(`https://65264ede917d673fd76bfda5.mockapi.io/crudopration/${id}`, data)
      .then((response) => {
        setid("");
        setname("");
        setemail("");
        setaddress("");
        setimage("");
        show();
      });
       alert("Yes")
          }else{
       alert("No")
     }

  };


  // editmode true
  const enableeditmode = () => {
    seteditmode(true)
  };


  // show fun call
  useEffect(() => {
    show();
  }, []);


  return (
    <div>
          <div className='container'>
      <div className='databox'>
        <form className='form'>
          <input
            type='text'
            className='input'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setname(e.target.value)}
          >
          </input>
          <br />

          <input
            type='text'
            className='input'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          >
          </input>
          <br />

          <input
            type='text'
            className='input'
            placeholder='Enter adddress'
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          >
          </input>
          <br />

          <input
            type='text'
            className='input'
            placeholder='Enter image'
            value={image}
            onChange={(e) => setimage(e.target.value)}
          >
          </input>
          <br />
        </form>
        <br />

        {
          <button
            onClick={() => {
              if (editmode) {
                edititem();
              } else {
                additem();
              }
              seteditmode(false)
            }}
            
          >
            {editmode ? "Edit" : "Add"}

          </button>
        }

      </div>
      <br />

      <div className="tablediv">
        <table className="table" border={2}>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>NAME</th>
              <th scope='col'>EMAIL</th>
              <th scope='col'>ADDRESS</th>
              <th scope='col'>IMAGE</th>
              <th scope='col'>ACTION</th>
            </tr>
          </thead>

          {/* data lavava api */}

          {
            api.map((val, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.address}</td>
                    <td><img src={val.image}></img></td>

                    <button
                      onClick={() => {
                        enableeditmode();
                        setid(val.id);
                        setname(val.name);
                        setemail(val.email);
                        setaddress(val.address);
                        setimage(val.image);

                      }}
                    >
                      Edit
                    </button>
                    &nbsp;&nbsp;


                    <button


                      onClick={() => {

                       
                        deleteitem(val.id)

                        }}>

                      {deleteitem === val.id}

                      Delete
                      
                     </button>

                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
    </div>
  )
}
