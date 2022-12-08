import React, { useContext } from 'react'

import Notes from './Notes';

export const Home = () => {

    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Add a title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button>Add</button>
                </form >
            </div >
            <Notes />
        </div >
    )
}
export default Home