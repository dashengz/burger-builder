import React, { Component } from 'react';
import {connect} from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from "../store/actions";

class Persons extends Component {

    createPerson = () => {
        return {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        };
    };

    render () {
        return (
            <div>
                <AddPerson personAdded={() => this.props.onAddPerson(this.createPerson())} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: (person) => dispatch({type: actionTypes.ADD_PERSON, person: person}),
        onDeletePerson: (id) => dispatch({type: actionTypes.DELETE_PERSON, id: id})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);