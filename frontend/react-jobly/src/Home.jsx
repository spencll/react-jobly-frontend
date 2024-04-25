import React from "react";

function Home({userInfo}) {

  return (<div>
    {userInfo.username ? ( <h1>Welcome back {userInfo.username}! </h1>): <h1>Welcome to Jobly!</h1>}
    </div>
)
}

export default Home;
