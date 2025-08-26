import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";
import { SetPortofolioData, ShowLoading, HideLoading } from "./redux/rootSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.root.loading);
  const portofolioData = useSelector((state) => state.root.portofolioData);

  const getPortofolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/portofolio/get-portofolio-data");
      dispatch(SetPortofolioData(response.data));
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!portofolioData) {
      getPortofolioData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portofolioData]);

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
