import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteGenres, getGenres, getLoginUserDetails } from '../actions'
import genresBg from '../assets/genres.jpg';
import Pagination from '@mui/material/Pagination';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const ListGenres = () => {

    const dispatch = useDispatch()
    const [pageNumber, setpageNumber] = useState(1)

    const genres = useSelector(state => state.blogUserReducer.genres)
    const page = useSelector(state => state.blogUserReducer.page)
    const toggle = useSelector(state => state.blogUserReducer.toggle)

    console.log("genres", genres);

    const handleDelete = (id) => {
        dispatch(deleteGenres(id))
    }

    useEffect(() => {
        dispatch(getGenres(pageNumber))
    }, [pageNumber, toggle])
    useEffect(() => {
        dispatch(getLoginUserDetails())
    }, [])
    return (
        <div className='listGenresMainDiv'>
            <div className='slide-image'>
                <img className='HomeImg' src={genresBg} alt='jpg'></img>
                <NavLink to="/createGenres"><Button variant="contained" color="error">Add Genres</Button></NavLink>
                <div className='mainCardDiv'>
                    {
                        genres && genres.map((list) => {
                            return (
                                <>
                                    <div className='cardBox'>
                                        <div>
                                            <h3>{list.title}</h3>
                                        </div>
                                        <div>
                                            <p>{list.description}</p>
                                        </div>
                                        <div className='EditDeleteButton'>
                                            <NavLink to={`/editgenres/:?id=${list._id}`}><Button color="secondary" >Edit </Button></NavLink>
                                            <Button type='submit' color='error' onClick={() => handleDelete(list._id)}>Delete  </Button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pagination" >
                <Pagination
                    id="pagination"
                    count={page}
                    variant="outlined"
                    color="secondary"
                    onChange={(e, value) => { setpageNumber(value) }}
                />
            </div>
        </div>
    )
}

export default ListGenres
