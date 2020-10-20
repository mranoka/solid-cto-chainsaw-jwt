import React from 'react';
import fetch from 'isomorphic-fetch';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
let storeArr = [];


class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            inputsArr: []
        }
        this.HandleInput = this.HandleInput.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    // loads user data after successful login
    componentDidMount() {
        this.getData()
    }

    // fetches data associated with username as soon as user logs in
    getData() {
        fetch(`/get/${this.props.username}`)
            .then(res => res.json())
            .then(response => {
                storeArr = response.list;
                this.setState({
                    inputsArr: response.list
                })
                console.log(response.list)
            }, err => console.log(err))
    }
    // posts user to-do list items to database for storage
    postData() {
        fetch('/postnew', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.props.username,
                items: this.state.inputsArr

            })
        }).then(res => res.json())
            .then(response => {
                console.log(response)
            }, err => console.log(err))
    }
    // handles user logout
    handleLogout() {
        window.location.reload()
    }

    // handles inputs by user
    HandleInput(e) {
        e.preventDefault();
        this.setState({
            input: e.target.value
        })
    }

    // handles additions to to-do list by adding data to both state
    // and external database through a post request
    handleAdd() {
        if (this.state.input) {
            storeArr.push(this.state.input)
            this.setState({
                inputsArr: storeArr,
                input: ''

            })
            this.postData();

        }

    }

    // handles removal of items from user to-do list
    handleDelete(e) {
        e.preventDefault();
        storeArr.splice(e.target.value, 1);
        this.setState({
            inputsArr: storeArr
        })
        this.postData(); // update database accordingly
    }

    render() {
        let items = this.state.inputsArr.map((item, index) => (
            <>
                <li className='list-item' key={index * Math.random()}>{item}</li>
                <button onClick={this.handleDelete} className='item-button' value={index}>Delete Item</button>
            </>
        ))

        return (
            <Container>
                <h3 id='todo-heading'>MY LIST:</h3>
                <div id='items-container'>
                    <ul>
                        {items}
                    </ul>
                </div>

                <label>
                    <textarea onChange={this.HandleInput} cols='40' value={this.state.input} rows='2' type="text" placeholder='WHAT NEEDS TO BE DONE?'>
                    </textarea>
                    <br />
                    <Button variant='success' onClick={this.handleAdd}>ADD</Button>
                </label>
                <Button id='logout-boton' variant="danger" onClick={this.handleLogout}>LOGOUT</Button>
            </Container>
        );
    }

}

export default List;