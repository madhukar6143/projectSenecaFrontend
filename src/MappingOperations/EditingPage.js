import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";
import handleErrors from '../errorComponent'
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';

function EditingPage() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const location = useLocation();
  const disease = location.state.item;

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptoms, setData] = useState([]);
<<<<<<< HEAD
=======
  const [diseaseName, setDiseaseName] = useState(disease.diseaseName);
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68

  useEffect(() => {
    getSymptoms();
  }, []);

  useEffect(() => {
    // Set the selectedSymptoms state based on the symptoms in the disease
    const diseaseSymptoms = disease.symptoms.map((s) => s.symptomName);
    setSelectedSymptoms(diseaseSymptoms);
  }, [disease]);

  const getSymptoms = async () => {
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
<<<<<<< HEAD
    let result = await axios.get(`${URL}/api/symptom/list`);
=======
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
    setData(result.data);
  };

  const handleSymptomChange = (symptomName, checked) => {
<<<<<<< HEAD
  
    setSelectedSymptoms((prevSelected) => {
      console.log(prevSelected)
=======
    setSelectedSymptoms((prevSelected) => {
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
      if (checked) {
        // Add the selected symptom to the list
        return [...prevSelected, symptomName];
      } else {
        // Remove the selected symptom from the list
        return prevSelected.filter((s) => s !== symptomName);
      }
    });
  };

  const handleSubmit = async (e) => {
<<<<<<< HEAD
    try {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Find the IDs of the selected symptoms
      const selectedSymptomsIds = symptoms
        .filter((s) => selectedSymptoms.includes(s.symptom_name))
        .map((s) => s.symptomId);
      // Update the disease with the selected symptoms
      const updatedDisease = { ...disease, symptoms: selectedSymptomsIds };
      const result = await axios.put(`${URL}/api/map/update`,updatedDisease);
=======
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      // Find the IDs of the selected symptoms
      const selectedSymptomsIds = symptoms
        .filter((s) => selectedSymptoms.includes(s.symptom))
        .map((s) => s.symptom_id);
      // Update the disease with the selected symptoms
      const updatedDisease = { ...disease, symptoms: selectedSymptomsIds };
      const result = await axios.put(`${URL}/mappedtable/edit-mapped-disease`,updatedDisease);
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
      addToast(result.data.message, {
        appearance: "success",
        autoDismissTimeout: 1000,
      });
      
      setTimeout(() => {
        navigate("/mapped");
      }, 3000);
    
    } catch (error) {
      handleErrors(error, addToast);
    }
  };

<<<<<<< HEAD

  return (
=======
  const handleDiseaseNameChange = (e) => {
    setDiseaseName(e.target.value);
  }


  return (
    <div >
      <div><button className="bg-danger float-end  ">X</button></div>
  <div className="row">
    <div className="col-6">
    <form onSubmit={handleSubmit}>
      <h2>Edit {disease.diseaseName}</h2>
      <div>
        <label htmlFor="diseaseName">Disease Name:</label>
        <input type="text" id="diseaseName" name="diseaseName" value={diseaseName} onChange={handleDiseaseNameChange} />
      </div>

      <button type="submit">Submit</button>
    </form>
    </div>
    <div className="col-6">
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
    <form onSubmit={handleSubmit}>
      <h2>Edit symptoms for {disease.diseaseName}</h2>
      <div className="row">
      {symptoms.map((symptom) => (
<<<<<<< HEAD
            <div className="col-sm-6 col-md-4" key={symptom.symptomId}>
=======
            <div className="col-sm-6 col-md-4" key={symptom.symptom_id}>
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
                <label className="d-flex align-items-center">
      
          <input
            type="checkbox"
<<<<<<< HEAD
            id={symptom.symptomId}
            name={symptom.symptom_name}
            checked={selectedSymptoms.includes(symptom.symptom_name)}
            onChange={(e) =>
              handleSymptomChange(symptom.symptom_name, e.target.checked)
            }
            />
            <span className="normal">{symptom.symptom_name}</span>
=======
            id={symptom.symptom_id}
            name={symptom.symptom}
            checked={selectedSymptoms.includes(symptom.symptom)}
            onChange={(e) =>
              handleSymptomChange(symptom.symptom, e.target.checked)
            }
            />
            <span className="normal">{symptom.symptom}</span>
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
          </label>
        </div>
      ))}



          </div>


      <button type="submit">Submit</button>
    </form>
<<<<<<< HEAD
  
=======
    </div>
  </div>
  </div>
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
  );
}

export default EditingPage;
