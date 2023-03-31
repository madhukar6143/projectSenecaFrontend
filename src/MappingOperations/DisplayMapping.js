import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DisplayMapping.css";
import { URL } from "../App";
import { useNavigate } from 'react-router-dom';

function DisplayMapping() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getMappedData();
  }, []);

  const getMappedData = async () => {
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
<<<<<<< HEAD
    let result = await axios.get(`${URL}/api/map/disease-symptoms`);
=======
    let result = await axios.get(`${URL}/mappedtable/disease-symptoms`);
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68

    setData(result.data);
  };
  const handleUpdate = async (item) => {
    console.log(item)
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    navigate("/edit", { state: { item:item} });
};
  return (
    <div>
      <h2>Diseases and Symptoms</h2>
      <table>
        <thead>
          <tr>
            <th>Disease</th>
            <th>Symptoms</th>
            <th>Update Symptoms</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.diseaseName}>
              <td>{item.diseaseName}</td>
              <td>{item.symptoms.map((s) => s.symptomName).join(", ")}</td>
              <td>
              <button onClick={() => handleUpdate(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

<<<<<<< HEAD
export default DisplayMapping;
=======
export default DisplayMapping;
>>>>>>> 902ca0c7a90dd442e35a8cf7973065ce6b99ed68
