import React from 'react';
import fetch from 'isomorphic-fetch';
import List from './List';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pass: '',
            usr: '',
            authUser: ''
        }

        this.handlePass = this.handlePass.bind(this);
        this.handleUser = this.handleUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    // handles data entry into username field
    handleUser(e) {
        this.setState({
            usr: e.target.value
        })
    }

    // handles data entry into password field
    handlePass(e) {
        this.setState({
            pass: e.target.value
        })
    }
    // sends password and user name for validation
    handleLogin(e) {
        e.preventDefault();
        fetch(`/login/${this.state.usr},${this.state.pass}`)
            .then(res => res.json())
            .then(response => {
                return fetch(`/auth/${response.token}`)
            }).then(res => res.json())
            .then(response => {

                this.setState({
                    authUser: response.username,
                    pass: '',
                    usr: ''
                })
            }).catch(function (err) {
                console.log(err)
            })
    }

    render() {
        return (
            <Container id='landin-container'>
                <Row>
                    <Col sm={{ span: 4, offset: 4 }}>
                        <h1>Welcome {this.state.authUser}</h1>
                        <form onSubmit={this.handleLogin}>
                            <input id='pass-input' onChange={this.handleUser} type='text' placeholder='enter username' value={this.state.usr} />
                            <br />
                            <input id='use-input' onChange={this.handlePass} type='text' placeholder='enter password' value={this.state.pass} />
                            <br />
                            <Button id='boton-login' variant='primary' type='submit' >LOGIN</Button>
                        </form>
                    </Col>
                </Row>
                <Row id='list-items'>
                    <Col sm={{ span: 6, offset: 4 }}>
                        {this.state.authUser ? <List username={this.state.authUser} /> : ''}
                    </Col>
                </Row>
            </Container>
        );
    }
}