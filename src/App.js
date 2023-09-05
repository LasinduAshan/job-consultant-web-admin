
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import React from "react";
import AppRouter from "./routers/Router";

function App() {

    return (
        <div className="App">
            <AppRouter/>
        </div>
    );
}

export default App;
