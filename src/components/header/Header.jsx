import React, { useState } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InputBase from '@mui/material/InputBase';
import { Link, useHistory } from 'react-router-dom';
import '../header/Header.scss'
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout'


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "brown",
    boxShadow: "none",
    color: "white",
    border: "1px solid lightgrey",
    fontFamily: 'Product Sans Arial,sans-serif',
    fontsize: '22px',
    // ['@media (min-width:992px)']: { // eslint-disable-line no-useless-computed-key
    // fontsize:'22px',
    // // width: '60%'
    //   }
    // [theme.breakpoints.down('sm')]: {
    //     width: '50%'
    // }

}));


const Search = styled('div')(({ theme }) => ({
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
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        }
    }
}));


export default function Header(props) {

    const history = useHistory()
    const theme = useTheme();
    const [searchText, setSearchText] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const requestSearch = (searchval) => {
        setSearchText(searchval.target.value);
        props.search(searchval.target.value);
    }

    const DisplayCart = () => {
        history.push('/cart')
    }

    const Wishlist = () => {
        history.push('/wishlist')
    }

    const handleLogout = () => {
        history.push("/");
    }

    return <>
        <AppBar >
            <Toolbar className='header-menu' >

                <img src={require("../../assests/education.png")} alt="logo" />
                <div className='header-search-icons'>
                    <div><Link to="/home" className='header-title' >Bookstore</Link></div>
                </div>
                <div>
                    <Search className="header-search" >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <StyledInputBase onChange={(searchval) => requestSearch(searchval)}
                            placeholder="Search"
                            value={searchText}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>
                <div>
                    <div className='header-icons' style={{ display: "flex", marginLeft: "112%" }}>

                        <div className='header-search-icons' >
                            <AccountCircleOutlined />Akshaykumar
                        </div>
                        <div className='header-search-icons1' >
                            <Badge badgeContent={props.cart} color="primary">
                                <ShoppingCartOutlinedIcon style={{ color: "#fff" }} onClick={() => DisplayCart()} />
                            </Badge>
                        </div>
                        <div className='header-search-icons1'>
                            <Badge badgeContent={props.wishlist} color="primary">
                                <FavoriteBorderOutlinedIcon style={{ color: "#fff" }} onClick={() => Wishlist()} />
                            </Badge>
                        </div>
                        <div className='logout'>
                            <LogoutIcon
                                onClick={handleLogout}
                                style={{ color: "white" }}
                                className="logout"
                            ></LogoutIcon>
                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    </>;
}