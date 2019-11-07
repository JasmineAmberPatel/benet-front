import React, {  Component, Fragment } from 'react';

class QuoteMachine extends Component {
    constructor() {
        super();
        this.state = {
            quote: {
                statement: ''
            },
            hasQuote: false,
        }
        this.getRandomQuote = this.getRandomQuote.bind(this);
        this.renderQuote = this.renderQuote.bind(this);
    }

    getRandomQuote = () => {
        fetch('https://wisdom-from-benet.herokuapp.com/quotes')
         .then(response => response.json())
         .then(data => {
             console.log(data);
             const randomIndex = Math.floor(Math.random() * 52);
            if(data[randomIndex].statement) {
                let { quote } = this.state;
                let quoteData = data[randomIndex];
                quote.statement = quoteData.statement;
                this.setState({ quote }, () => {
                    if(this.state.hasQuote === false) {
                        this.setState({ hasQuote: true })
                    }
                })
            } 
            else {
                return console.error('No quote has been found')
            }
         })
    }

    renderQuote = () => {
        const { statement } = this.state.quote;
        return (
            <Fragment>
                <br/>
                <q className="quote">{statement}</q>
            </Fragment>
        )
    }

    render() {
        console.log(this.state);
        const { hasQuote } = this.state;
        return (
            <main>
                <h1 className="title">What would Benet say?</h1>
                <br/>
                <button className="button" onClick={this.getRandomQuote}>
                    Click for wisdom from Benet
                </button>
                <br />
                {hasQuote === true ? this.renderQuote() : ''}
            </main>
        )
    }
}

export default QuoteMachine;