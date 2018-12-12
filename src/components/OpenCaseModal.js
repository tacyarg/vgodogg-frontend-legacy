import React, { Component } from 'react'
import '../styles/OpenCase.css'
import {
  Dialog,
  Classes,
  NumericInput,
  Button,
  Intent,
} from '@blueprintjs/core'

class OpenCaseModal extends Component {
  constructor() {
    super()
    this.state = {
      autoFocus: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: true,
      enforceFocus: true,
      usePortal: true,
      wantedCases: 1,
    }
  }

  render() {
    const { isOpen, handleClose, box, buyCases, maxKeys } = this.props
    return (
      <Dialog
        icon="box"
        onClose={handleClose}
        title={box.name}
        isOpen={isOpen}
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="OpenCase-content">
            <img src={box.image ? box.image['300px'] : null} alt={box.name} />
          </div>
        </div>

        <div className={Classes.DIALOG_FOOTER}>
          <h4>How many cases would you like to buy?</h4>
          <NumericInput
            className="OpenCase-key-input"
            leftIcon="box"
            max={maxKeys || 100}
            min="1"
            large={true}
            onValueChange={value => {
              this.setState({ wantedCases: value })
            }}
            value={this.state.wantedCases}
          />

          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              intent={Intent.PRIMARY}
              large={true}
              onClick={e => buyCases(box.id, this.state.wantedCases)}
              text={
                <b>
                  Spend {box.key_amount_per_case * this.state.wantedCases} Keys
                </b>
              }
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default OpenCaseModal
