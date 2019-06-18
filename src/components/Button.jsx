import React from "react";
// import components
import Button from "@material-ui/core/Button";

class ButtonComponent extends React.Component {
  render() {
    const { ButtonName, AddButtonClick } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          AddButtonClick();
        }}
      >
        {ButtonName}
      </Button>
    );
  }
}

export default ButtonComponent;
