import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './OpenCase.css'
import { Dialog, Classes, NumericInput, Tooltip, Button, Intent } from '@blueprintjs/core'

class OpenCase extends Component {
  constructor(){
    super()
    this.state = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      // isOpen: false,
      usePortal: true,
    }
  }

  render() {
    const { isOpen, handleClose, box, buyCases } = this.props
    return (
      <Dialog
        icon="box"
        onClose={handleClose}
        title={box.name}
        isOpen={isOpen}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          {/* <CaseCard box={box} /> */}
          <div className="options">
            <img src={box.image ? box.image['300px'] : null} alt={box.name} />
            
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <h5>Make your selection:</h5>
          <NumericInput
            className="key-input"
            leftIcon="key"
            max="100"
            min="1"
            value="1"
          />
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {/* <Button onClick={handleClose} intent={Intent.DANGER} text="Nevermind" /> */}
            <Button
              intent={Intent.SUCCESS}
              onClick={buyCases}
              text="Buy Case(s)"
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default OpenCase

