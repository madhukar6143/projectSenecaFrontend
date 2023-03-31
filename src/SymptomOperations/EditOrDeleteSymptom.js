import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./symptom.css";
import { useToasts } from 'react-toast-notifications';
import { URL } from "../App";
import handleErrors from '../errorComponent'
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 


function EditOrDeleteSymptom() 
{
  const { addToast } = useToasts();
  const [Symptoms, setData] = useState([]);
  let [editedSymptomName, setEditSymptom] = useState({
    status: false,
    id: 0
})
let { register, handleSubmit, setValue,formState:{errors}} = useForm()

useEffect(() => {
  getSymptoms();  
}, []);

  const getSymptoms = async () => {
    const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let result = await axios.get(`${URL}/api/symptom/list`)
    setData(result.data);
  };

  const deleteSymptom = async (symptomId) => {
    try{
      const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let response= await axios.delete(`${URL}/api/symptom/delete/${symptomId}`,)
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
     getSymptoms()
    }catch (error) 
    {
      handleErrors(error, addToast);
      }
    
  }    

 const editSymptom = (Symptom) => {

  setEditSymptom({ ...editedSymptomName, status: true, id: Symptom.symptomId })
  setValue("symptomName", Symptom.symptom_name)
  setValue("symptom_id",Symptom.symptomId)
}

const cancelAction =() =>
{
  setEditSymptom({ ...editedSymptomName, status: false })
}

const saveUserById = async (modifiedUser) => {
  try{
    modifiedUser.symptomName=modifiedUser.symptomName.trim()
    console.log(modifiedUser.symptomName)
    if(modifiedUser.symptomName==="")
    return addToast("symptom name can't be null", { appearance: 'error',autoDismissTimeout: 1000  });
    modifiedUser.symptomName =modifiedUser.symptomName.charAt(0).toUpperCase() + modifiedUser.symptomName.slice(1);
  let response=  await axios.put(`${URL}/api/symptom/updatesymptom`, modifiedUser)
    setEditSymptom({ ...editedSymptomName, status: false })
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
    getSymptoms()
  }
  catch(error)
  {
    handleErrors(error, addToast);
    cancelAction()
  }
}

<<<<<<< HEAD


const handleDelete = (id) => {
  confirmAlert({
    title: 'Confirm deletion',
    message: 'Are you sure you want to delete this item?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          deleteSymptom(id)
          // Handle delete logic here
        },
      },
      {
        label: 'No',
        onClick: () => {},
      },
    ],
  });
}; 

  // empty dependency array to run effect only once on mount
=======
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68


  return (

    <div>
<<<<<<< HEAD
                {Symptoms.length !== 0 &&
                  <form onSubmit={handleSubmit(saveUserById)}>
                      <table className="table bg-light">
                          <thead>
                              <tr>
                              <th>Serial Number</th>
                                  <th>Symptom Name</th>
                                  <th> Actions</th>
                              </tr>
                          </thead>
  
                          <tbody>
                              {
                                  Symptoms.map((Symptom,index) => <tr key={Symptom.symptomId}>
                                    
                                    <td>{index+1}</td>
=======



      {Symptoms.length !== 0 &&
                <form onSubmit={handleSubmit(saveUserById)}>
                    <table className="table bg-light">
                        <thead>
                            <tr>
                            <th>Serial Number</th>
                                <th>Symptom Name</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Symptoms.map((Symptom,index) => <tr key={Symptom.symptom_id}>
                                  
                                  <td>{index+1}</td>
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
                                    <td>
                                        {editedSymptomName.status === true && editedSymptomName.id === Symptom.symptomId ?
                                        <>
                                            <input type="text"  {...register("symptomName",{ 
                                                // check username is empty
                                               required: "Symptom required.",
                                               //minimum lentgh of username
                                               }
                                            )}  />
                                            </>
                                             :
                                            <> {Symptom.symptom_name}</>
                                        }


                                    </td>
                                    <td>
                                        {editedSymptomName.status === true && editedSymptomName.id === Symptom.symptomId ?

                                             <>
                                            <input type="submit" className="btn btn-success" value="Save" /> 
                                            <button type="button" className="btn btn-warning m-1" onClick={() => cancelAction()}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-warning m-1" onClick={() => editSymptom(Symptom)}>Edit</button>
                                                <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete (Symptom.symptomId)}>x</button>
                                            </>
                                        }


                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </form>
}




    </div>
  );
}


export default EditOrDeleteSymptom
