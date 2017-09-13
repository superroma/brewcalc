import React from 'react'
import { FormGroup, FormControl, Panel, Row, Col } from 'react-bootstrap'
import { importFromBeerXml } from 'brewcalc'
import { connect } from 'react-redux'

import UnitsArea from '../components/UnitsArea'

const ImportArea = ({ editorState, onReloadEditorState }) => {
  const onXmlLoaded = e => {
    const reader = new FileReader()
    reader.readAsText(e.target.files[0])
    reader.onloadend = function () {
      const result = importFromBeerXml(reader.result)
      onReloadEditorState(
        JSON.stringify(
          { recipe: result.recipe, equipment: result.equipment },
          null,
          4
        )
      )
    }
  }

  return (
    <Row className="show-grid">
      <Col md={6}>
        <Panel header="Upload BeerXML file">
          <FormGroup>
            <FormControl
              id="formControlsFile"
              type="file"
              label="File"
              accept="application/xml"
              onChange={onXmlLoaded}
            />
          </FormGroup>
        </Panel>
      </Col>
      <Col md={6}>
        <UnitsArea />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ editorState }) => ({ editorState })

const mapDispatchToProps = dispatch => ({
  onReloadEditorState: editorState => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: editorState
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportArea)
