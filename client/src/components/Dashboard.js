import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Camera from './Cam';
import "./Dashboardw.css";
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import {grey} from "@mui/material/colors";
import Recording from "./Recorder";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Header from './Header';
const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status === 401 || !data) {
            history("");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])

  
    const [Camon, sScamon] = useState(false);

    const Startrecord = () => {
        sScamon(true);
    };

    const Stoprecord = () => {
        sScamon(false);
    };
    return (
        
            <>
      
      <div className="dash-container">
        <div className="web-container">
          <div className="cam-screen">
            
            <div className="cam-live">
              <Camera permisssions={Camon} />
            </div>
          </div>
          <div className="cam-btn">
            {Camon ? (
              <button className="webcam-btn" onClick={Stoprecord}>
                <CameraAltIcon sx={{ color: grey[50],fontSize: 36 }}/>
              </button>
            ) : (
              <button className="webcam-btn" onClick={Startrecord}>
                <NoPhotographyIcon sx={{ color: grey[50], fontSize: 36  }}/>
              </button>
            )}
          </div>
        </div>
        <div>
          <Recording />
        </div>
      </div>
    </>
        
    )

}

export default Dashboard