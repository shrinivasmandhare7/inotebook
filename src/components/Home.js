import React from 'react'

export const Home = () => {
    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form action="">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Add a title" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button>Add</button>
                </form>
            </div>
            <div className="container my-3">
                <h1>Your Notes</h1>
            </div>
        </div >
    )
}
export default Home