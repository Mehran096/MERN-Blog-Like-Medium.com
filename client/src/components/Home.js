import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Helmet} from 'react-helmet';
import { Link, useParams  } from 'react-router-dom';
import { homePost } from '../store/asyncMethods/PostMethods';
import Loader from './Loader'
import moment from 'moment'
import Pagination from './Pagination';
import { htmlToText } from 'html-to-text';
 

const Home = () => {
    //useSelector
    const {loading} = useSelector(state => state.PostReducer)
    const {posts, count, perPage} = useSelector(state => state.fetchPostReducers)
    // const { user: {_id}  } = useSelector(state => state.AuthReducer);
    //useDispatch
    const dispatch = useDispatch()
    //useParams
    let {page} = useParams();
    if(page === undefined){
        page = 1
    }
    //useEffect
    useEffect(() => {
		dispatch(homePost(page));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);
     
    return (
        <>
            <Helmet>
                <title>web articles</title>
                <meta
                    name='description'
                    content='Learn Html, css and so on'
                 />
            </Helmet>
            <div className="container">
                <div className="row mt-100" style={{marginBottom: '30px'}}>
                    <div className="col-9 home" >
                        {!loading ? posts.length > 0 ? posts.map(post => (
                            <div className="row post-style" key={post._id}>
                                <div className="col-8">
                                    <div className="post">
                                        <div className="post__header">
                                            <div className="post__header__avator">
                                                {post.userName ? post.userName[0] : ''}
                                            </div>
                                            <div className="post__header__user">
                                                <span>{post.userName}</span>
                                                <span>{moment(post.updatedAt).format("MMM Do YY") }</span>
                                            </div>
                                        </div>
                                        <div className="post__body">
                                            <h1 className="post__body__title"><Link to={`/details/${post.slug}`}>{post.title}</Link></h1>
                                            <div className="post__body__details">{  htmlToText(post.body.slice(0, 250))}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                <div className="post__image">
                                     <img src={`/images/${post.image}`} alt={post.image} />
                                    </div>
                                </div>
                            </div>
                        )) : 'No Posts' : <Loader/>}
                        
                    </div>
                </div>
                <div className='row'>
					<div className='col-9'>
						<Pagination
							path='home'
							page={page}
							perPage={perPage}
							count={count}
						/>
					</div>
				</div>
            </div>
        </>
    )
}

export default Home
