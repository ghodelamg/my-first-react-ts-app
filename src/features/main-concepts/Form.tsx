import React, { FormEvent } from "react";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

type MyProps = any;
type MyState = { [index: string]: string|boolean|number|string[] };
export default class NameForm extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {value: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event: FormEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: FormEvent) {
    console.log('Name: ' + this.state.value);
    console.log('IsGoing: ' + this.state.isGoing);
    console.log('No Of Guests: ' + this.state.numberOfGuests);
    event.preventDefault();
  }

  render() {
    return (
      
         <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <label>
                Name:
              </label>
            </Grid>
            <Grid item xs={7}><input name="value" type="text" value={this.state.value as string} onChange={this.handleInputChange} /></Grid>
            <Grid item xs={5}>
              <label>
                Number of guests:
                
            </label>
            </Grid>
            <Grid item xs={7}><input
                  name="numberOfGuests"
                  type="number"
                  value={this.state.numberOfGuests as number}
                  onChange={this.handleInputChange} /></Grid>
            <Grid item xs={5}>
              <label>
                Is going:
                
              </label>
            </Grid>
            <Grid item xs={7}><input
                  name="isGoing"
                  type="checkbox"
                  checked={this.state.isGoing as boolean}
                  onChange={this.handleInputChange} /></Grid>
            <Grid item xs={12}>
              <input type="submit" value="Submit" />
            </Grid>
          </Grid>
        </Paper>
      //   <form onSubmit={this.handleSubmit}>
          
        
      // </form>
    );
  }
}