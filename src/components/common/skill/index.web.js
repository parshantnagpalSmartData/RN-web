import React from "react";
import Skills from "./Skill";

const Skill = props => {
  return (
    <div className={"skills"}>
      <Skills {...props} />
    </div>
  );
};

export default Skill;
