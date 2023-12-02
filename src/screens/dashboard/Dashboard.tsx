"use client";
import React from "react";
import forexImage from "../../../public/forexImage.jpg"
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

type Props = {};

const backgroundImageStyle = {
  backgroundImage: `url(${forexImage.src})`, 
  //backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100%",
  height: "92.1vh",
};

const Dashboard = (props: Props) => {
  return (
    <div>
      <div className="p-8" style={backgroundImageStyle}>
        <div className="col-span-5">
          <h2 className="text-lg font-bold"><i>Retail FX Sales Platform</i></h2>
        </div>
      </div>
      <div className="ag-theme-alpine bg-blue-300" style={{ position: "fixed", bottom: 0, width: "100%", /*backgroundColor: "white" */}}>
        <AgGridReact/>
        <div className="status-bar">
        <span style={{ marginLeft: "0rem", color: "black" }}>RetailFx solution</span>
        </div>
      </div>
    </div>
  )};
  
  /*return <div className="p-8">
    
   
    <h4 className="text-lg font-semibold border-b-2 border-gray-600 py-3 mt-28">Let's get started !</h4>
    <p className="pt-3 text-lg font-normal text-gray-600">
      FX Retail is an easy to use trading platform that integrates with calypso with a few steps you will be able to capture Allocation, and fun transfer and Invisibles.
    </p>
    </div>
  </div>; */


export default Dashboard;
