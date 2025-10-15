import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MyHealthAverage = () => {
  // //use states
  const [isShowWarning, setisShowWarning] = useState(false);
  const [warning, setWarning] = useState(" ");
  const [monthData, setmonthData] = useState([]);
  const [popup, setpopup] = useState(false);

  const [averages, setAverages] = useState([]);

  async function monthlyData() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/myhealthaverage/monthlydata"
      );
      setmonthData(response.data);
    } catch (error) {
      console.log("error", error.msg);
    }
  }
  const deleteSheet = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/myhealthaverage/deletesheet"
      );
      if (response.status === 200) {
        monthlyData();
      }
    } catch (error) {
      console.log("error", error.msg);
    }
  };
  const deleteOne = async (_id) => {
    const ObjectId = _id;

    try {
      const response = await axios.delete(
        "http://localhost:3001/api/myhealthaverage/deleteone",
        { data: { id: ObjectId } }
      );

      if (response.status === 200) {
        monthlyData();
      }
    } catch (error) {
      console.log("error", error.msg);
    }
  };
  useEffect(() => {
    monthlyData();
  }, []);
  useEffect(() => {
    if (monthData.length > 0) {
      avg();
    }
  }, [monthData]);

  const avg = async () => {
    const newAvg = [];
    console.log("BROFRE SLICE");
    for (let i = 0; i < monthData.length; i += 3) {
      const threeDay = monthData.slice(i, i + 3);
      console.log("AFTER SLICE");

      const systolic = threeDay.map((e) => e.Systolic);
      const diastolic = threeDay.map((e) => e.Diastolic);
      const heartBeat = threeDay.map((e) => e.HeartBeat);
      console.log(systolic, diastolic, heartBeat);
      const threeDaysavg = (a, b, c, d, e, f, g, h, i) => {
        const systolic = Math.round((a + b + c) / 3);
        const diastolic = Math.round((d + e + f) / 3);
        const heartBeat = Math.round((g + h + i) / 3);
        console.log(heartBeat);

        const averageBp = systolic + " / " + diastolic;
        newAvg.push({
          averageBp: averageBp,
          averageheartBeat: heartBeat,
        });
      };

      threeDaysavg(...systolic, ...diastolic, ...heartBeat);
    }
    setAverages(newAvg);
    console.log(newAvg);
  };

  const handleSubmit = async (e) => {
    if (monthData.length < 2) {
      setWarning("log in more value to get avg");
      setisShowWarning(true);
    } else {
      setisShowWarning(false);
      avg();
    }
    e.preventDefault();

    //daily input value /post
    try {
      await axios.post("http://localhost:3001/api/myhealthaverage/dailydata", {
        systolic: e.target.systolic.value,
        diastolic: e.target.diastolic.value,
        heartbeat: e.target.heartbeat.value,
      });

      monthlyData();
      setWarning("log in more value to get avg");
    } catch {}

    e.target.systolic.value = " ";
    e.target.diastolic.value = " ";
    e.target.heartbeat.value = " ";
  };

  return (
    //  blood pressure form
    <div>
      <h1> My Health Data</h1>
      <p>Blood pressure</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="systolic" className="formLabel">
          systolic
        </label>

        <input name="systolic" id="systolic"></input>
        <label htmlFor="diastolic" className="formLabel">
          diastolic
        </label>
        <input name="diastolic" id="diastolic"></input>
        <label htmlFor="heartbeat" className="formLabel">
          heartbeat
        </label>
        <input name="heartbeat" id="heartbeat"></input>
        <button>sumbit</button>
      </form>
      <div id="deleteButton">
        <button onClick={deleteSheet}>delete sheet</button>
      </div>
      <div>
        <table id="table">
          <thead>
            <tr>
              <th>systolic</th>
              <th>diastolic</th>
              <th>heartBeat</th>
              <th>bloodPressure avg</th>
              <th>heartBeat avg</th>
              <th>date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {monthData.map((e, index) => (
              <tr key={e._id || index}>
                <td>{e.Systolic}</td>
                <td>{e.Diastolic}</td>
                <td>{e.HeartBeat}</td>

                <td>
                  {index % 3 === 2 && averages[Math.floor(index / 3)]
                    ? averages[Math.floor(index / 3)].averageBp
                    : ""}
                </td>
                <td>
                  {index % 3 === 2 && averages[Math.floor(index / 3)]
                    ? averages[Math.floor(index / 3)].averageheartBeat
                    : ""}
                </td>
                <td>{e.createdAt.split("T")[0]}</td>
                <td>
                  <button id="trash">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => deleteOne(e._id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isShowWarning ? <h2>{warning}</h2> : <h2> </h2>}
    </div>
  );
};
export default MyHealthAverage;
