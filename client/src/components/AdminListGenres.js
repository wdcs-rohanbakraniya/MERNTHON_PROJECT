import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteGenres, getGenres, getLoginUserDetails } from '../actions'
import genresBg from '../assets/genres.jpg';
import Pagination from '@mui/material/Pagination';


import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash.debounce';
const ListGenres = () => {

    const dispatch = useDispatch()
    const [pageNumber, setpageNumber] = useState(1)
    const [search, setSearch] = useState("");

    const genres = useSelector(state => state.blogUserReducer.genres)
    const page = useSelector(state => state.blogUserReducer.page)
    const toggle = useSelector(state => state.blogUserReducer.toggle)

    console.log("genres", genres);

    const handleDelete = (id) => {
        dispatch(deleteGenres(id))
    }


    const useStyles = makeStyles((theme) => ({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }));
    const classes = useStyles();
    const onchangeChandler = event => {
        setSearch(event.target.value)
    }
    const debouncedOnChange = debounce(onchangeChandler, 500)
    useEffect(() => {
        dispatch(getGenres(pageNumber, search))
    }, [pageNumber, toggle, search])
    return (
        <div className='listGenresMainDiv'>

            <div className='slide-image'>
                <img className='HomeImg' src={genresBg} alt='jpg'></img>
                <NavLink to="/createGenres"><Button variant="contained" color="error">Add Genres</Button></NavLink>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        onChange={debouncedOnChange}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
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
                                            <NavLink to={`/editgenres/:?id=${list._id}`}><Button variant="contained" color="success" >Edit </Button></NavLink>
                                            <Button type='submit' variant="contained" color='error' onClick={() => handleDelete(list._id)}>Delete  </Button>
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

