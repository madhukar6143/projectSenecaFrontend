import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import { URL } from "../App";
import handleErrors from '../errorComponent'

import './SymptomSelector.css'; // import the CSS file


const SymptomSelector = () => {
  
  const { addToast } = useToasts();
  const { register, reset,handleSubmit } = useForm();
    
const [symptoms, setData] = useState([]);
 
useEffect(() => {
  getSymptoms();
}, []);

  const getSymptoms = async () => {
    const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let result = await axios.get(`${URL}/api/symptom/list`);
    console.log(result.data)
    setData(result.data);
  };
  
  const onSubmit = async(data) => {
 
    const selectedSymptoms = Object.keys(data.symptoms)
      .filter((key) => data.symptoms[key])
      .map((key) => parseInt(key.replace('symptoms.', '')));
      const token = localStorage.getItem('jwt');
      // Set the default headers for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(selectedSymptoms);
      if(selectedSymptoms.length==0)
     return  addToast("please select atleast one symptom", { appearance: 'error',autoDismissTimeout: 1000  })
      axios.post(`${URL}/api/map/diseasesearch`, selectedSymptoms)
      .then((response) => {
        addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  })
      })
      .catch((error) => {
        handleErrors(error, addToast);
      });
      reset()
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      
    <h1 className="text-warning"> Select Symptoms to know Disease</h1>
    <div className="row">
        {symptoms.map((symptom) => (
          <div className="col-sm-6 col-md-4" key={symptom.symptomId}>
            <label className="d-flex align-items-center">
              <input
                type="checkbox"
                {...register(`symptoms.${symptom.symptomId}`)}
        
              />
              <span>{symptom.symptom_name}</span>
            </label>
          </div>
        ))}
        </div>
      <button type="submit">Submit</button>
    </form>

   
    </>
  );
};

export default SymptomSelector;
