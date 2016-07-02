import React from 'react'
import {connect} from 'react-redux'
import Languages from '../../config/languages'

class translate extends React.Component {
  constructor(props) {
    super(props)
    this.getTranslation.bind(this)
  }
  getTranslation() {
    if (!this.props.language) {
      throw new Error(`no language "${this.props.language}" defined`)
    } else if (!Languages[this.props.language]) {
      throw new Error(`no messages defined for language "${this.props.language}"`)
    } else if (!Languages[this.props.language][this.props.id]) {
      throw new Error(`no id "${this.props.id}" defined for language "${this.props.language}" messages`)
    } else {
      return Languages[this.props.language][this.props.id]
    }
  }
  render() {
    var text = this.getTranslation()

    return (
      <span>{text}</span>
    )
  }
}

class translateHTML extends translate {
  render() {
    var text = this.getTranslation()

    return (
      <span dangerouslySetInnerHTML={{__html: text}} />
    )
  }
}

translate.propTypes = {
  children: React.PropTypes.object,
  id: React.PropTypes.string,
  language: React.PropTypes.string,
  messages: React.PropTypes.object
}

// const translate = React.createClass({
//   propTypes: {
//     children: React.PropTypes.object,
//     id: React.PropTypes.string,
//     language: React.PropTypes.string,
//     messages: React.PropTypes.object
//   },
//   render() {
//     var text = ''
//     if (!this.props.language) {
//       throw new Error(`no language ${this.props.language} defined`)
//     } else if (!Languages[this.props.language]) {
//       throw new Error(`no messages defined for language ${this.props.language}`)
//     } else if (!Languages[this.props.language][this.props.id]) {
//       throw new Error(`no id ${this.props.id} defined for language ${this.props.language} messages`)
//     } else {
//       text = Languages[this.props.language][this.props.id]
//     }

//     return (
//       <span>{text}</span>
//     )
//   }
// })

export const Translate = connect(
  (state) => ({language: state.siteConfig.globalLanguage})
)(translate)

export const TranslateHTML = connect(
  (state) => ({language: state.siteConfig.globalLanguage})
)(translateHTML)
