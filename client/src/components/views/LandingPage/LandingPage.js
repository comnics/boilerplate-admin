import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

import { PageHeader, Typography } from "antd";
import { connect } from 'react-redux'

function LandingPage(props) {
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
    });

    return (
        <PageHeader className="site-page-header" title="Dashboard" subTitle="This is a subtitle">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "65vh",
                }}
            >
                <div>
                    <h2>Dashboard</h2>
                </div>
            </div>
        </PageHeader>
    );
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {user: state.user}
}
const mapDispatchToProps = {  } 
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(LandingPage));