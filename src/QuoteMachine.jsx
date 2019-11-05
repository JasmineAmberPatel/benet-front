import React, {  Component, Fragment } from 'react';

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            statement: '',
            hasQuote: false
        }
        this.EndPoint = 'https://wisdom-from-benet.herokuapp.com/quotes'
        this.getRandomQuote = this.getRandomQuote.bind(this);
    }

    getRandomQuote = (data) => {
        fetch(this.EndPoint)
         .then(response => response.json())
         .then(data => {
             console.log(data);
            if(data.statement) {
                let { statement } = this.state;
                this.setState({ statement }, () => {
                    if(this.state.hasQuote === false) {
                        this.setState({ hasQuote: true, statement: data.statement })
                    }
                })
            } 
            else {
                return console.error('No quote has been found')
            }
         })
    }

    renderQuote = () => {
        const { statement } = this.state.statement;
        return (
            <div>
              <h1>{statement}</h1>
            </div>
        )
    }

    render() {
        console.log(this.state);
        const { hasQuote } = this.state;
        return (
            <Fragment>
                <h1>What would Benet say?</h1>
                <br />
                <h2>{this.state.statement}</h2>
                <button onClick={this.getRandomQuote}>Click for wisdom from Benet</button>
                <br />
                {hasQuote === true ? this.state.statement : ''}
            </Fragment>
        )
    }
}

export default QuoteMachine;