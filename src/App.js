import React, { Component } from 'react';
import Field from './components/field';
import Table from './components/table';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    state = { 
        size: {value: '', valid: false},
        mean: {value: '', valid: false},
        dev: {value: '', valid: false},
        testMean: {value: '', valid: false, active: false},
        prevSize: {},
        prevMean: {},
        prevDev: {},
        prevTestMean: {},
        check: false,
        renderTable: false,
        displaySmall: false
     }

    //Handles the update the values and the validity of the values
    handleUpdate = (dict) => {
        const newValues = { ...this.state[dict.id] };
        
        if(dict.value === '')
        {
            newValues.valid = false;
        }
        else{
            //Make sure all input is valid
            switch (dict.id){
                case "size":
                    newValues.valid = ((dict.value % 1 === 0) && (dict.value >= 2));
                    break;
                case "dev":
                    newValues.valid = (dict.value > 0) ? true : false;
                    break;
                default:
                    newValues.valid = true;
                    break;
            }
        }
        
        newValues.value = dict.value;

        //Update state
        this.setState({[dict.id]: newValues});
    }

    //Reset "value" within the inputs
    reset = () => {
        const stateCopy = this.state;
        const resetFields = ['size', 'mean', 'dev', 'testMean']
        
        resetFields.forEach(function(input){
            stateCopy[input].value = '';
            stateCopy[input].valid = false;
        });

        
        stateCopy.displaySmall =  false;
        this.setState({stateCopy}); 
    }

    //Called if the reset button is pressed. Resets values and ensures table is note rendered
    handleReset = () => {
        this.reset();
        const stateCopy = this.state;
        stateCopy.renderTable = false;

        this.setState({stateCopy});
    }

    //Called when the OK button is clicked. Handle all conditions for submit
    handleSubmit = () => {
        let stateCopy = this.state;
        const {size, mean, dev, testMean} = this.state;
        const meanPass = (testMean.active) ? testMean.valid : true;
        
        //If a valid submit occurs...
        if(size.valid && mean.valid && dev.valid && meanPass){

            //Save all values for display on table
            stateCopy.prevSize = { ...this.state.size}; 
            stateCopy.prevMean = { ...this.state.mean}; 
            stateCopy.prevDev = { ...this.state.dev}; 
            stateCopy.prevTestMean = { ...this.state.testMean}; 

            //Ensure table will be rendered
            stateCopy.renderTable = true;
            
            //Save state containing previous values
            this.setState({stateCopy});

            //Set current values to blank
            this.reset();
        }
        else{
            //If not a valid submit, display small text for warnings
            stateCopy.displaySmall = true;
            this.setState({stateCopy});
        }
        
    }

    //If checked, enable Hypothesized mean. If not, disable it.
    handleCheck = () => {
        const check = !this.state.check;
        let testMean = { ...this.state.testMean };
        testMean.active = check;

        this.setState({check});
        this.setState({testMean});;
    }

    //Render fields, buttons, and table
    render() { 
        return ( 
            <div className="d-flex w-100 justify-content-lg-center">
                <form className="form-horizontal w-75 m-4">
                    <Field
                        key="size"
                        id="size"
                        label="Sample Size"
                        placeholder="Enter a Whole Number Above 2"
                        small="Invalid input. There must be a whole number above 2."
                        active={true}
                        value={this.state.size.value}
                        valid={this.state.size.valid}
                        displaySmall={this.state.displaySmall}
                        onChange={this.handleUpdate}
                    />
                    <Field
                        key="mean"
                        id="mean"
                        label="Sample Mean"
                        placeholder="Enter a Number"
                        small="Invalid input. Must be a number."
                        active={true}
                        value={this.state.mean.value}
                        valid={this.state.mean.valid}
                        displaySmall={this.state.displaySmall}
                        onChange={this.handleUpdate}
                    />
                    <Field
                        key="dev"
                        id="dev"
                        label="Standard Deviation"
                        placeholder="Enter a Positive Number"
                        small="Invalid input. There must be a positive number."
                        active={true}
                        value={this.state.dev.value}
                        valid={this.state.dev.valid}
                        displaySmall={this.state.displaySmall}
                        onChange={this.handleUpdate}
                    />
                    <div className="form-check my-4">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="hypothesisCheck"
                            onClick={this.handleCheck}
                            />
                        <label 
                            className="form-check-label" for="hypothesisCheck">
                                Perform Hypothesis Test
                        </label>
                        <Field
                                key="testMean"
                                id="testMean"
                                label="Hypothesized Mean"
                                placeholder="Enter a Number"
                                small="Invalid input. Must be a number."
                                active={this.state.testMean.active}
                                value={this.state.testMean.value}
                                valid={this.state.testMean.valid}
                                displaySmall={this.state.displaySmall}
                                onChange={this.handleUpdate}
                            />
                    </div>
                    <div className="d-flex justify-content-center align-self-center">
                        <button 
                            type="button"
                            className="btn btn-primary px-4 mx-1 my-2"
                            onClick={this.handleSubmit}>
                                OK
                        </button>
                        <button 
                            type="button"
                            className="btn btn-secondary px-4 mx-4 my-2"
                            onClick={this.handleReset}>
                                Reset
                        </button>
                    </div>

                    <Table 
                        renderTable={this.state.renderTable}
                        size={this.state.prevSize}
                        mean={this.state.prevMean}
                        dev={this.state.prevDev}
                        testMean={this.state.prevTestMean}
                    />
                </form>
            </div>
        );
    }
}
 
export default App;
