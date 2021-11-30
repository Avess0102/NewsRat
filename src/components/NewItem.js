import React, { Component } from 'react'

export default class NewItem extends Component {
    render() {
        let {title, description, imageURL, newsURL, author, date, source} = this.props;
        return (
            <div>
                <div className="card m-3">
                    <img src={imageURL?imageURL:"https://images.indianexpress.com/2021/10/singapore-1.jpg"} className="card-img-top" alt="..."/>
                        {/* <p className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source} </p> */}
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"> <small className="text-dark">by {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small> </p>
                        <a href={newsURL} target="_blank" rel="noreferrer" className="btn btn-outline-secondary">Read More..</a>
                        
                    </div>
                </div>
            </div>
        )
    }
} 
 
// Z ID: Z04776 Z Password: patch82
// 6d3f912896364169b86250a1775cab40