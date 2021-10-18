import React from 'react'
import { Helmet } from 'react-helmet';

const NotFound = (props) => {

    return (
        <>
            <Helmet>
                <title>404 - not found</title>
                <meta
                    name='description'
                    content='Oops! that page not found'
                />
            </Helmet>
            <div className="notFound">
                <div className="notFound__container">
                    <div className="notFound__container__h1">404</div>
                    <div className="notFound__container__p">Oops! that page not found</div>
                    <div className="group mt-20">
                        <input
                            type="submit"
                            className="btn btn-default btn-block"
                            value="Go Back"
                            onClick={() => props.history.push('/')}
                        />
                    </div>
                </div>



            </div>

        </>
    )

}

export default NotFound
