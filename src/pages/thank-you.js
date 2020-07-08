import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const ThankYou = (props) => {
    return(
        <Layout>
            <div className="container-fluid mt-5">
                <div className="row justify-content-center">
                    <div className="col-6 text-center">
                        <h1>Thanks for your donation!</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Link to="/donate"><button class="btn">GO BACK</button></Link>
                </div>
            </div>
        </Layout>
    )
}

export default ThankYou