import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import reactCSS from 'reactcss';

import FormGroup from '../FormGroup';

/*
// SCHEMA PROTOTYPE

//Rating Field
ratingField: {
  type: String, //String or Number
  label: "How happy are you with our service?",
  defaultValue:  '0043' //either '0043' for String Type or 5 for Number type
  uniforms: {
              component: RatingField,
              ratingPreLabel: 'Verry Unhappy',
              ratingPostLabel: 'Extremely Happy',
              //Either this for integer based labels for radio choice (type=Number)
              ratingStart: 0, //exclusive
              ratingStop: 10, //inclusive
              ratingStep: 1,
              //Or this for text based labels for radio choice (type=String)
              textValues: [{value: ‘0043’, label: ’JHB’} , {value: ‘0078’, label: ’CPT’}, …. ]
            }
},

for number ratings:
ratingField: {
  type: Number, //String or Number
  label: "How happy are you with our service?",
  //defaultValue:  '0043', //either '0043' for String Type or 5 for Number type
  optional: true,
  uniforms: {
              component: RatingField,
              ratingPreLabel: 'Verry Unhappy',
              ratingPostLabel: 'Extremely Happy',
              //Either this for integer based labels for radio choice (type=Number)
              ratingStart: 0, //exclusive
              ratingStop: 10, //inclusive
              ratingStep: 1,
              //Or this for text based labels for radio choice (type=String)
              //textValues: [{value: 0043, label: 'JHB'} , {value: 0078, label: 'CPT'} ]
            }
},


class RatingField extends React.Component {
  constructor(){
      super();
      this.state = {
      }
      this.ratingData = [];
  }

  render() {
    //if (Meteor.isClient){
      var AntIn = require('antd');
      const RadioGroup = AntIn.Radio.Group;
      const RadioButton = AntIn.Radio.Button;
      this.ratingData = [];
      console.log(this.props)
      console.log(this.props.fieldType)
//      if(Object.getPrototypeOf(this.props.fieldType) === Number.prototype){
      if (this.props.fieldType === Number){
        if (!this.props.ratingStart) this.props.ratingStart = 0;
        if (!this.props.ratingStop) this.props.ratingStop = 10;
        if (!this.props.ratingStep) this.props.ratingStep = 1;
        for (index = this.props.ratingStart; index <= this.props.ratingStop; index += this.props.ratingStep){
           this.ratingData.push({value: index, label: index.toString()});
        }
      } else {
        if (!this.props.textValues) this.props.textValues = [{value: '0000', label: 'Empty'}];
        this.props.textValues.map( (textObj)=>{
          this.ratingData.push({value: textObj.value, label: textObj.label});
        })
      }
      var keyIndex = 0;
      return(
          <FormGroup feedbackable {...this.props}>
            <div className="antd-uni-rating-parent">
                <div className="antd-uni-rating-col-left">{this.props.ratingPreLabel}</div>
                <div className="antd-uni-rating-col-center ">
                    <RadioGroup onChange={event => this.props.onChange(event.target.value)} defaultValue={this.props.defaultValue} >
                    {
                      this.ratingData.map( (ratingobj)=>{
                        keyIndex++;
                        return <RadioButton key={keyIndex.toString()} value={ratingobj.value}>{ratingobj.label}</RadioButton>
                      })
                    }
                    </RadioGroup>
                </div>
                <div className="antd-uni-rating-col-right">{this.props.ratingPostLabel}</div>
            </div>
          </FormGroup>
        )
    //}
  }
}

export default connectField(RatingField);
*/
