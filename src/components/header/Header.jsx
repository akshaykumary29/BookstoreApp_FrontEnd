import React, { useEffect, useState } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import MuiDrawer from '@mui/material/Drawer';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InputBase from '@mui/material/InputBase';
import { Link, useHistory } from 'react-router-dom';
import '../header/Header.scss'
import DisplayCart from '../displayCart/DisplayCart';
import Wishlist from '../wishlist/Wishlist';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

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
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
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
        console.log(searchval.target.value)
        setSearchText(searchval.target.value);
        // props.abc(searchval.target.value);
    }

    useEffect(() => {
     console.log(props.cartLen);
     console.log(props.wishlistLen);   
    }, []);

    const DisplayCart= () => {
        history.push('/cart')
    }

    const Wishlist= () => {
        history.push('/wishlist')
    }

    return <div>
        <AppBar position="fixed" >
            <Toolbar className='header-menu' >

                <img src={require("../../assests/education.png")} alt="logo" />
                <Typography variant="h6" noWrap component="div" sx={{ color: "#fff" }} className='header-search-icons'>
                    <div className='header-title'>Bookstore</div>
                </Typography>
                <Typography>
                    <Search className="search" style={{ }} >
                        <SearchIconWrapper>
                            <SearchIcon style={{ color: "#fff" }} />
                        </SearchIconWrapper>
                        
                            <StyledInputBase onChange={(searchval) => requestSearch(searchval)}
                                placeholder="Search"
                                value={searchText}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                    </Search>
                </Typography>
                <Typography>
                    <div className='header-icons' style={{ display: "flex", marginLeft: "100%" }}>

                        <Typography className='header-search-icons' style={{ display: "flex", marginLeft: "30px" }}><AccountCircleOutlined style={{ color: "#fff" }} />Akshaykumar</Typography>
                        <Typography className='header-search-icons1' style={{ display: "flex", marginLeft: "60px" }}><ShoppingCartOutlinedIcon style={{ color: "#fff" }} onClick={() => DisplayCart()} /> {props.cartLen} </Typography>
                        <Typography className='header-search-icons1' style={{ display: "flex", marginLeft: "60px" }}><FavoriteBorderOutlinedIcon style={{ color: "#fff" }} onClick={() => Wishlist()} /> {props.wishlistLen} </Typography>

                    </div>
                </Typography>
            </Toolbar>
        </AppBar>
    </div>;
}