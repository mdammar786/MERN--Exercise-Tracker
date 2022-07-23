import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams } from "react-router-dom";


const EditExercise = () => {
  const { id } = useParams();
  const [Exericse, setExericse] = useState({
    username: "helllo",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [Users, setUsers] = useState([])

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/exercises/update/"+id, Exericse)
  };

  useEffect( () => {

    axios.get('http://localhost:5000/exercises/'+id)
      .then(response => {
        setExericse({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

     axios
      .get("http://localhost:5000/users")
      .then(res => {
        console.log(res)
        res.data.map(user => {
          setUsers(oldArray => [...oldArray, user.username])
          return 0;
        })
      })

      
  }, [id]);


  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={Exericse.username}
            onChange={(e) =>
              setExericse({ ...Exericse, username: e.target.value })
            }
          >
            {Users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={Exericse.description}
            onChange={(e) =>
              setExericse({ ...Exericse, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={Exericse.duration}
            onChange={(e) =>
              setExericse({ ...Exericse, duration: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={Exericse.date}
              onChange={(e) =>
                setExericse({ ...Exericse, date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
export default EditExercise;