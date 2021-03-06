import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithub } from '../../actions/profile';
import Wheel from '../layout/Wheel'

const Github =({ username, getGithub, repos }) => {
    useEffect(() => {
        getGithub(username)
    }, [getGithub, username]);

    return (
        <div className="profile-github">
            <h2 className="primary-txt my-1">Github Repos</h2>
            {repos === null ? (<Wheel />)
            : ( 
                repos.map(repo => (
                <div key={repo._id} className="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </h4>
                        <p>{repo.description}</p>
                    </div>
                </div>
            )
            ))}
        </div>
    )
}

Github.propTypes = {
    getGithub: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithub })(Github);
