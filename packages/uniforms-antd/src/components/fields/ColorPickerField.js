import React          from 'react';
import classnames     from 'classnames';
import {connectField} from 'uniforms';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss'
import FormGroup from '../forms/FormGroup.js';
import _ from 'lodash';


/*
// SCHEMA PROTOTYPE

colorArray: {
      type: [String],
      label: "Hex color value for chart text.",
      uniforms: {
        fieldComponent: 'color',
        colorRatios: [0.35, 0.7, -0.2, -0.4],
        info: "Hex color value"
      }
  },
    colorOne: {
      type: String,
      label: "Hex color value for chart text.",
      defaultValue: "#434d52",
      uniforms: {
        fieldComponent: 'color',
        colorRatios: [0.35, 0.7, -0.2, -0.4],
        info: "Hex color value"
      }
  },
*/

const ColorPicker = ({
    errorMessage,
    id,
    label,
    showInlineError,
    info,
    ...props
}) => {
    return(
        <FormGroup errorMessage={errorMessage} id={id} label={label} showInlineError={showInlineError} info={info} >
            <RenderColorPicker {...props} />
        </FormGroup>
    )
}

export default connectField(ColorPicker);


class RenderColorPicker extends React.Component {
  constructor(){
      super();
      this.state = {
        displayColorPicker: false,
        displayCompanyColorPicker: false
      };
  }
  handleClick(){
    this.setState({ displayCompanyColorPicker: !this.state.displayCompanyColorPicker })
  }
  handleCustomClick(){
    this.setState({ displayCompanyColorPicker: !this.state.displayCompanyColorPicker });
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }
  handleCompColorClick(event, colorClicked){
    this.setState({ displayCompanyColorPicker: !this.state.displayCompanyColorPicker })
    this.props.onChange(event);
  }

//GvW ToDo: get companycolours from mongo
  getCompanyColors(index){
    const compColors = this.props.fieldData ?
        this.props.fieldData.colors ?
            this.props.fieldData.colors : ["#ff5555","#4ca64c","#3232ff","#D9A40D"]
        : ["#ff5555","#4ca64c","#3232ff","#D9A40D"];
    return compColors[index];
  }
  shadeBlendConvert(p, from, to) {
      if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
      const sbcRip = d => {
          var l=d.length,RGB=new Object();
          if(l>9){
              d=d.split(",");
              if(d.length<3||d.length>4)return null;//ErrorCheck
              RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
          }else{
              if(l==8||l==6||l<4)return null; //ErrorCheck
              if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
              d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
          }
          return RGB;
      }
      var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
      if(!f||!t)return null; //ErrorCheck
      if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
      else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
  }

  handleClose(){
    this.setState({ displayColorPicker: false });
    this.setState({ displayCompanyColorPicker: false });
  }

  render() {
    let colorRatios = [0.4, 0.8, -0.3, -0.6];
    if(this.props.colorRatios)
        colorRatios = this.props.colorRatios;
    let compColorRatio1 = colorRatios[0] ? colorRatios[0] : 0.40;
    let compColorRatio2 = colorRatios[1] ? colorRatios[1] : 0.80;
    let compColorRatio3 = colorRatios[2] ? colorRatios[2] : -0.30;
    let compColorRatio4 = colorRatios[3] ? colorRatios[3] : -0.60;
    const styles = reactCSS({
      'default': {
        compcolor: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: '#ff5555',
          cursor: 'pointer',
        },
        colorone: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.getCompanyColors(0),
          cursor: 'pointer',
        },
        colortwo: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.getCompanyColors(1),
          cursor: 'pointer',
        },
        colorthree: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.getCompanyColors(2),
          cursor: 'pointer',
        },
        colorfour: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.getCompanyColors(3),
          cursor: 'pointer',
        },
        colorfive: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.shadeBlendConvert(compColorRatio1,this.getCompanyColors(0)),
          cursor: 'pointer',
        },
        colorsix: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.shadeBlendConvert(compColorRatio1,this.getCompanyColors(1)),
          cursor: 'pointer',
        },
        colorseven: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio1,this.getCompanyColors(2)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        coloreight: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio1,this.getCompanyColors(3)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colornine: {
          width: '40px',
          height: '17px',
          padding: '5px',
          borderRadius: '3px',
          background: this.shadeBlendConvert(compColorRatio2,this.getCompanyColors(0)),
          cursor: 'pointer',
        },
        colorten: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio2,this.getCompanyColors(1)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        coloreleven: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio2,this.getCompanyColors(2)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colortwelve: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio2,this.getCompanyColors(3)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colorthirteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio3,this.getCompanyColors(0)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colorfourteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio3,this.getCompanyColors(1)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colorfifteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio3,this.getCompanyColors(2)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colorsixteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio3,this.getCompanyColors(3)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colorseventeen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio4,this.getCompanyColors(0)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        coloreighteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio4,this.getCompanyColors(1)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colornineteen: {
          width: '40px',
          height: '17px',
          padding: '5px',
          background: this.shadeBlendConvert(compColorRatio4,this.getCompanyColors(2)),
          borderRadius: '3px',
          cursor: 'pointer',
        },
        colortwenty: {
          width: '40px',
          height: '17px',
          background: this.shadeBlendConvert(compColorRatio4,this.getCompanyColors(3)),
          padding: '5px',
          borderRadius: '3px',
          cursor: 'pointer',
        },
        color: {
          width: '85px',
          height: '14px',
          borderRadius: '2px',
          background: this.props.value,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
          margin: '5px'
        },
        compcolorwindow: {
          marginLeft: '-15px'
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    const AntIn = require('antd');
    const Icon = AntIn.Icon;
    const Row = AntIn.Row;
    const Col = AntIn.Col;
    const Button = AntIn.Button;
    const Popover = AntIn.Popover;

    const headerText = <span>Company Color Picker Array</span>;
    const compColorContent = (
      <div style={ styles.compcolorwindow } >
        <Row type="flex" justify="space-around" gutter={5}>
              <Col span={4}><div style={ styles.colorone} onClick={this.handleCompColorClick.bind(this, styles.colorone.background)} /></Col>
              <Col span={4}><div style={ styles.colortwo } onClick={this.handleCompColorClick.bind(this, styles.colortwo.background)} /></Col>
              <Col span={4}><div style={ styles.colorthree } onClick={this.handleCompColorClick.bind(this, styles.colorthree.background)} /></Col>
              <Col span={4}><div style={ styles.colorfour } onClick={this.handleCompColorClick.bind(this, styles.colorfour.background)} /></Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" gutter={5}>
              <Col span={4}><div style={ styles.colorfive } onClick={this.handleCompColorClick.bind(this, styles.colorfive.background)} /></Col>
              <Col span={4}><div style={ styles.colorsix } onClick={this.handleCompColorClick.bind(this, styles.colorsix.background)} /></Col>
              <Col span={4}><div style={ styles.colorseven } onClick={this.handleCompColorClick.bind(this, styles.colorseven.background)} /></Col>
              <Col span={4}><div style={ styles.coloreight } onClick={this.handleCompColorClick.bind(this, styles.coloreight.background)} /></Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" gutter={5}>
              <Col span={4}><div style={ styles.colornine } onClick={this.handleCompColorClick.bind(this, styles.colornine.background)} /></Col>
              <Col span={4}><div style={ styles.colorten } onClick={this.handleCompColorClick.bind(this, styles.colorten.background)} /></Col>
              <Col span={4}><div style={ styles.coloreleven } onClick={this.handleCompColorClick.bind(this, styles.coloreleven.background)} /></Col>
              <Col span={4}><div style={ styles.colortwelve } onClick={this.handleCompColorClick.bind(this, styles.colortwelve.background)} /></Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" gutter={5}>
              <Col span={4}><div style={ styles.colorthirteen } onClick={this.handleCompColorClick.bind(this, styles.colorthirteen.background)} /></Col>
              <Col span={4}><div style={ styles.colorfourteen } onClick={this.handleCompColorClick.bind(this, styles.colorfourteen.background)} /></Col>
              <Col span={4}><div style={ styles.colorfifteen } onClick={this.handleCompColorClick.bind(this, styles.colorfifteen.background)} /></Col>
              <Col span={4}><div style={ styles.colorsixteen } onClick={this.handleCompColorClick.bind(this, styles.colorsixteen.background)} /></Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" gutter={5}>
              <Col span={4}><div style={ styles.colorseventeen } onClick={this.handleCompColorClick.bind(this, styles.colorseventeen.background)} /></Col>
              <Col span={4}><div style={ styles.coloreighteen } onClick={this.handleCompColorClick.bind(this, styles.coloreighteen.background)} /></Col>
              <Col span={4}><div style={ styles.colornineteen } onClick={this.handleCompColorClick.bind(this, styles.colornineteen.background)} /></Col>
              <Col span={4}><div style={ styles.colortwenty } onClick={this.handleCompColorClick.bind(this, styles.colortwenty.background)} /></Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around" gutter={5}>
          <Col span={4}><Button type="primary" size="small" onClick={this.handleClick.bind(this)}>Cancel</Button></Col>
          <Col span={12}><Button type="primary" size="small" onClick={this.handleCustomClick.bind(this)}>Custom Color</Button></Col>
        </Row>
      </div>
    );

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick.bind(this) }>
          <div style={ styles.color } />
            <input
                disabled={this.props.disabled}
                id={this.props.id}
                key={`colorinput_${this.props.id}`}
                name={this.props.name}
                onChange={event => this.props.onChange(event.target.value)}
                ref={this.props.inputRef}
                value={this.props.value}
                type="text"
                style={{width: "85px"}}
            />
        </div>

        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose.bind(this) }/>
              <ChromePicker
                  key={`colorfield_${this.props.id}`}
                  color={this.props.value}
                  disabled={this.props.disabled}
                  id={this.props.id}
                  name={this.props.name}
                  onChange={event => this.props.onChange(event.hex)}
                  ref={this.props.inputRef}
              />
        </div> : null }
        {
          this.state.displayCompanyColorPicker ?
              <section >
                <Popover content={compColorContent} title={headerText} trigger="click" visible={true}>
                  <Icon type="tablet" />
                </Popover>
              </section>
          : null
        }
      </div>
    )
  }
}
