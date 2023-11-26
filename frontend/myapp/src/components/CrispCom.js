import React, { Component } from "react";
import { Crisp } from "crisp-sdk-web";

class CrispCom extends Component {
  componentDidMount() {
    Crisp.configure("a736315f-6b2b-4885-a0b1-00e485f2fe1b");
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default CrispCom;