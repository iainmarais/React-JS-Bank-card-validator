import React, { useState } from 'react';
import {Form, Input, Button, FormControl} from 'react-bootstrap';
import  "./main.css";
import SessionManager from './SessionManager';

const BannedCountries = ['North Korea', 'Iran', 'Syria']; // hardcoded, but could be fetched from an API or config file

function generateSessionId(userId)
{
    const sessionManager = new SessionManager();
    userId = 0;
    //Use the user ID 0 to generate a unique session ID
    var MySessionId = sessionManager.createSession(userId);
    return MySessionId;
}
const sessionId = generateSessionId(0);

class Main extends React.Component 
{
    
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            //Assign these vars to null in the constructor to avoid the undefined fault.
            //cardholder:
            firstname: "",
            surname: "",
            idnum: "", //Most often this is an integer, but it can be a string in rare cases.
            nationality: "", //Either the full name of the country or its two-char country code.
            //bank card:
            cardnum: "",
            cardtype: "", //American express, visa or mastercard 
            expiry: "", // This is an MM/YY formatted number so should probably be a string value
            cvv: "", // This is a 3-digit number
            banned: false //This depends on the country of the cardholder.
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Check against the card number to determine which card type this is.
    checkCardType(cardnum)
    {
        const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const amexPattern = /^3[47][0-9]{13}$/;
        const mastercardPattern = /^5[1-5][0-9]{14}$/;
        if(amexPattern.test(cardnum))
        {
            return "AMEX";
        }
        else if(visaPattern.test(cardnum))
        {
            return "VISA";
        }
        else if(mastercardPattern.test(cardnum))
        {
            return "MASTERCARD";
        }
        else
        {
            return "INVALID";
        }
    }
    handleSubmit(event)
    {
        //Block the default event
        event.preventDefault();
        const formData = new FormData(event.target);
        const firstname = formData.get('firstname');
        const surname = formData.get('surname');
        const idnum = formData.get('idnum');
        const nationality = formData.get('nationality');
        const cardnum = formData.get('cardnum').replace(/\D/g, ''); //Strip out any non-digits
        const expiry = formData.get('expiry');
        const cvv = formData.get('cvv');

        const cardtype = this.checkCardType(cardnum);
        const banned = BannedCountries.includes(nationality);

        this.setState({
            sessionId: sessionId,
            firstname: firstname,
            surname: surname,
            idnum: idnum,
            nationality: nationality,
            cardnum: cardnum,
            cardtype: cardtype,
            expiry: expiry,
            cvv: cvv,
            banned: banned,
        });
        console.log(this.state);
        this.addDatatoLocalStorage();
    }
    addDatatoLocalStorage()
    {
        const CurrentState = this.state;
        const key = `stateData-${this.state.sessionId}`;
        //Append the current state to the local storage as json
        //Check that localstorage does not contain the data of the current state, if true, add it, else report that the data already exists
        if(!localStorage.getItem(key))
        {
            localStorage.setItem(key, JSON.stringify(CurrentState));
        }
        else
        {
            //If the card number is identical to the one already in the local storage,
            //report that the data already exists
            if(CurrentState.cardnum === localStorage.getItem(key).cardnum)
            {
                alert("You can't add a duplicate entry.");
                return;
            }
            //Else add the entry
            else
            {
                localStorage.setItem(key, JSON.stringify(CurrentState));
            }
        }
    }
    renderTableRows()
    {
        const rows = [];
        for(var i = 0; i < localStorage.length; i++)
        {
            const key = localStorage.key(i);
            if (key.startsWith("stateData-"))
            {
                const stateData = JSON.parse(localStorage.getItem(key));
                rows.push(
                    <tr key={key}>
                        <td>{stateData.sessionId}</td>
                        <td>{stateData.firstname}</td>
                        <td>{stateData.surname}</td>
                        <td>{stateData.idnum}</td>
                        <td>{stateData.nationality}</td>
                        <td>{stateData.cardnum}</td>
                        <td>{stateData.cardtype}</td>
                        <td>{stateData.expiry}</td>
                        <td>{stateData.cvv}</td>
                        <td>{stateData.banned}</td>
                    </tr>
                );
            }
        }
        return rows;
    }
    render()
    {
        return (
            <div className="MainFrame">
                <div className="InputFrame">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name:   </Form.Label>
                            <Form.Control type="text" name = "firstname" placeholder="Name" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicSurname">
                            <Form.Label>Surname:   </Form.Label>
                            <Form.Control type="text" name = "surname" placeholder="Surname" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicIdnum">
                            <Form.Label>ID Number:   </Form.Label>
                            <Form.Control type="text"  name = "idnum" placeholder="ID Number" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicNationality">
                            <Form.Label>Country:   </Form.Label>
                            <Form.Select name="nationality" required>
                                <option value="">Select a country</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="MX">Mexico</option>
                                <option value="GB">United Kingdom</option>
                                <option value="ZA">South Africa</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="PT">Portugal</option>
                                {/* add more countries here */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formBasicCardnum">
                            <Form.Label>Card Number:   </Form.Label>
                            <Form.Control type="text"  name = "cardnum" placeholder="Card Number" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCardtype">
                            <Form.Label>Card Type:   </Form.Label>
                            <Form.Control type="text"  name = "cardtype" placeholder="Card Type" value = {this.state.cardtype} />
                        </Form.Group>
                        <Form.Group controlId="formBasicExpiry">
                            <Form.Label>Expiry:   </Form.Label>
                            <Form.Control type="text" name = "expiry" placeholder="Expiry" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicCvv">
                            <Form.Label>CVV:   </Form.Label>
                            <Form.Control type="text"  name = "cvv" placeholder="CVV" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicBanned">
                            <Form.Label>Banned:   </Form.Label>
                            <Form.Control type="text"  name = "banned" placeholder="Banned" value = {this.state.banned} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div className="OutputFrame">
                    <div>
                        <table className= "OutputTable"> 
                            <thead>
                                    <tr>
                                        <th>Session ID</th>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>ID Number</th>
                                        <th>Country</th>
                                        <th>Card Number</th>
                                        <th>Card Type</th>
                                        <th>Expiry</th>
                                        <th>CVV</th>
                                        <th>Subject to sanctions</th>
                                    </tr>
                                </thead>
                            <tbody className = "OutputTableBody">
                                {this.renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        );

    }
}
export default Main;