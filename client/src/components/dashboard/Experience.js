/**
 * Created by Kaizhi Du on 2019/11/9.
 */
import React, { Fragment } from 'react';
import Moment from "react-moment";

const Experience = ({ experience }) => {

    const experiences = experience.map(exp => {
        return (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td className='hide-sm'>{exp.title}</td>
                <td>
                    <Moment fromat='YYYY/MM/DD'>{exp.from}</Moment> -
                    {exp.to === null ? (' Now') : (<Moment fromat='YYYY/MM/DD'>{exp.to}</Moment>)}
                </td>
                <td>
                    <button className='btn btn-danger'>Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                <tr>
                    <th>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};

export default Experience