import React, { Component } from 'react';

class Field extends Component {
    //Determines if the small text is to be displayed. It is displayed when a submit occurs, and an input is invalid. 
    displaySmallText = () => {
        //Check if not valid, is submitted, and is active
        if((!this.props.valid) && this.props.displaySmall && this.props.active){
            return this.props.small;
        }
        else{
            return '';
        }
    }

    //Render a label, text input field, and small pair
    render() { 
        const {id, label, placeholder, value,active, small} = this.props;

        return ( 
           <div className="form-group row my-2">
                <label 
                    for={id}
                    className={(active) ? "col-sm-4 control-label" : "col-sm-4 control-label text-muted"} >
                    {label}
                </label>
                <div className="col-sm-8">
                    <input 
                        type="number" 
                        className="form-control" 
                        id={id} 
                        placeholder={placeholder}
                        value={(value !== '') ? value : false}
                        disabled={!active}
                        small={small}
                        onChange={obj => this.props.onChange(
                            {id: obj.target.id, value: obj.target.value})}
                        >
                    </input>
                    <small 
                        id={id + "small"} 
                        className="form-text text-danger">
                            {this.displaySmallText()}
                    </small>
                </div>
           </div>
        );
    }
}
 
export default Field;