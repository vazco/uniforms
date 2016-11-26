import React          from 'react';
import {connectField} from 'uniforms';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss'
import FormGroup from '../forms/FormGroup.js';

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
  handleClick(visible){
    this.setState({ displayCompanyColorPicker: visible })
  }
  handleCustomClick(){
    this.setState({ displayCompanyColorPicker: !this.state.displayCompanyColorPicker });
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }
  handleCompColorClick(event, colorClicked){
    this.setState({ displayCompanyColorPicker: !this.state.displayCompanyColorPicker })
    this.props.onChange(event);
  }

  getCompanyColors(props,index){
    const compColors = props.fieldData ?
        props.fieldData.colors ?
            props.fieldData.colors : ["#ff5555","#4ca64c","#3232ff","#D9A40D"]
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

  componentWillMount () {
        if (!this.props.value && this.props.defaultValue) {
            this.props.onChange(this.props.defaultValue);
        } else if (!this.props.value) {
            this.props.onChange('#434d52');
        }
    }

  render() {

    const styles = reactCSS({
      'default': {
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
    const compColors = this.props.fieldData ?
        this.props.fieldData.colors ?
            this.props.fieldData.colors : ["#ff5555","#4ca64c","#3232ff","#D9A40D"]
        : ["#ff5555","#4ca64c","#3232ff","#D9A40D"];
    let colorRatios = [0, 0.3, 0.5, -0.25, -0.6];
    if(this.props.colorRatios)
        colorRatios = this.props.colorRatios;
    const compColorContent = (
      <div >
        {colorRatios.map(ratio =>
            <Row justify="center" type="flex" gutter={5} key={Math.random().toString(36).substring(7)}>
              {compColors.map( color =>
                <Col span={Math.round(24/compColors.length)} key={Math.random().toString(36).substring(7)}>
                  <div
                    style={{
                      width: '40px',
                      height: '17px',
                      borderRadius: '3px',
                      marginBottom: '5px',
                      background: this.shadeBlendConvert(ratio,color),
                      cursor: 'pointer',
                    }}
                    onClick={this.handleCompColorClick.bind(this, this.shadeBlendConvert(ratio,color))}
                  />
                </Col>
              )}
            </Row>
        )}
        <Row justify="center" type="flex" gutter={3} key={Math.random().toString(36).substring(7)}>
          <Col span={24} key={Math.random().toString(36).substring(7)}>
            <Button type="ghost" size="small" onClick={this.handleCustomClick.bind(this)} style={{width: '100%'}}>
                Custom Color
            </Button>
          </Col>
        </Row>
      </div>
    );

    return (
      <div>
        <Popover
          content={compColorContent}
          trigger="click"
          visible={this.state.displayCompanyColorPicker}
          onVisibleChange={this.handleClick.bind(this)}
        >
            <div style={ styles.swatch } >
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
                    style={{width: '85px', align: 'center'}}
                />
            </div>
        </Popover>
        { this.state.displayColorPicker &&
          (<div style={ styles.popover }>
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
          </div>)}
      </div>
    )
  }
}
