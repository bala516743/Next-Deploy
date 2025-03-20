'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu'; // <-- added for hamburger icon
import useMediaQuery from '@mui/material/useMediaQuery'; // <-- added for responsive check
import { useTheme } from '@mui/material/styles';

const settings = ['Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: '96%',
        m: 4,
        // mt:4,
        background: 'linear-gradient(150deg, #fff720, #4c4c4b)',
        color: '#fff',
        borderRadius: '10px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Left section */}
          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/* Navigation Links inside menu */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">Home</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/AddCustomer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">Add Customer</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={'/Contact'} style={{ marginRight: 30 }}>
                    Contact
                  </Link>

                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link
              href="/"
              style={{
                fontWeight: 700,
                color: 'black',
                textDecoration: 'none',
                fontSize: '20px',
              }}
            >
              CUSTOMERS
            </Link>
          )}

          {/* Center links (Desktop only) */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end'}}>
              <Link href="/" style={{ fontWeight: 700, marginRight: 30, color: '#fff' }}>
                Home
              </Link>
              <Link href={'/AddCustomer'} style={{fontWeight: 700, marginRight:30}}>Add Customer</Link>
              <Link href="/Contact" style={{ fontWeight: 700, marginRight: 30, color: '#fff' }}>
                Contact
              </Link>
            </Box>
          )}

          {/* Right section (user avatar or Logout text in mobile view) */}
          <Box sx={{ flexGrow: 0 }}>
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Bala" src="/assets/man.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
