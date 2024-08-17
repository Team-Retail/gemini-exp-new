"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useStyles = (0, _styles.makeStyles)({
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

const DrawerInsideDiv = props => {
  const [open, setOpen] = (0, _react.useState)(false);
  const containerRef = (0, _react.useRef)();
  const [height, setHeight] = (0, _react.useState)(0);
  const classes = useStyles({
    height: height
  });
  (0, _react.useEffect)(() => {
    if (open) {
      setHeight(containerRef.current.clientHeight - 64);
    } else {
      setHeight(0);
    }
  }, [_react.useRef, open]);

  const handleFilterIconClick = () => {
    setOpen(!open);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/_react.default.createElement(_AppBar.default, _extends({
    position: "static"
  }, props.appBarProps), /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
    style: {
      display: 'flex'
    }
  }, props.appBarComponent, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    style: {
      marginLeft: 'auto'
    },
    color: "inherit",
    "aria-label": "filterButton",
    onClick: handleFilterIconClick
  }, props.appBarIcon))), /*#__PURE__*/_react.default.createElement(_Drawer.default, _extends({
    open: open,
    className: classes.drawer,
    variant: "persistent",
    style: props.anchor === 'left' ? {
      position: 'relative',
      marginRight: 'auto'
    } : {
      position: 'relative',
      marginLeft: 'auto'
    }
  }, props.drawerProps), props.drawerComponent), props.children));
};

var _default = DrawerInsideDiv;
exports.default = _default;