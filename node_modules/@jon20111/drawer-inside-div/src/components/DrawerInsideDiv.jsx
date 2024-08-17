import React, { useEffect, useState, useRef } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    drawer: {
        width: 300,
        flexShrink: 0,
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& .MuiDrawer-paper": {
            width: 300,
            position: 'absolute',
            height: props => props.height,
            transition: 'none !important'
        }
    }
});

const DrawerInsideDiv = (props) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef();
    const [height, setHeight] = useState(0);

    const classes = useStyles({ height: height });

    useEffect(() => {
        if (open) {
            setHeight(containerRef.current.clientHeight - 64);
        } else {
            setHeight(0);
        }
    }, [useRef, open])

    const handleFilterIconClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <div
                ref={containerRef}
                style={{ position: 'relative' }}
            >
                <AppBar position="static" {...props.appBarProps}>
                    <Toolbar style={{ display: 'flex' }}>
                        {props.appBarComponent}
                        <IconButton
                            style={{ marginLeft: 'auto' }}
                            color="inherit"
                            aria-label="filterButton"
                            onClick={handleFilterIconClick}
                        >
                            {props.appBarIcon}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={open}
                    className={classes.drawer}
                    variant="persistent"
                    style={props.anchor === 'left' ? { position: 'relative', marginRight: 'auto' } : { position: 'relative', marginLeft: 'auto' }}
                    {...props.drawerProps}
                >
                    {props.drawerComponent}
                </Drawer>
                {props.children}
            </div>
        </>
    )
};

export default DrawerInsideDiv;