import React, { Component } from 'react';

class Table extends Component {

    //If hypothesized mean is active, then add its table spot
    testMeanTable = () => {
        return ((this.props.testMean.active) 
        ?   <tr>
                <th scope="row">Hypothesized Mean</th>
                <td>{this.props.testMean.value}</td>
            </tr>
        : false);
    }

    //Render a table that contains the input values
    render() { 
        const {renderTable, size, mean, dev} = this.props;

        if(renderTable){
            return (
                <table className="table my-4">
                    <thead>
                        <tr>
                            <th scope="col">Fields</th>
                            <th scope="col">Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Sample Size</th>
                            <td>{size.value}</td>
                        </tr>
                        <tr>
                            <th scope="row">Sample Mean</th>
                            <td>{mean.value}</td>
                        </tr>
                        <tr>
                            <th scope="row">Standard Deviation</th>
                            <td>{dev.value}</td>
                        </tr>
                        {this.testMeanTable()}
                    </tbody>

                </table>
            );
        }
        else{
            return null;
        }
    }
}
 
export default Table;