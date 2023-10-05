import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faDivide,
  faEquals,
  faMinus,
  faPlus,
  faTimes,
  faPercent,
  faPlusMinus,
} from "@fortawesome/free-solid-svg-icons";

const primaryColor = "#bbb";
const secondaryColor = "teal";
const size = 25;

export default keys = {
  clear: {
    isElement: false,
    character: "C",
    color: "red",
    type: "clear",
  },
  brackets: {
    isElement: false,
    character: "( )",
    color: "teal",
    type: "brackets",
  },
  percent: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faPercent} color={secondaryColor} size={size} />
    ),
    type: "percent",
    character: "%",
  },
  divide: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faDivide} color={secondaryColor} size={size} />
    ),
    type: "operator",
    character: "÷",
  },
  seven: {
    isElement: false,
    character: "7",
    color: primaryColor,
    type: "number",
  },
  eight: {
    isElement: false,
    character: "8",
    color: primaryColor,
    type: "number",
  },
  nine: {
    isElement: false,
    character: "9",
    color: primaryColor,
    type: "number",
  },
  multiply: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faTimes} color={secondaryColor} size={size} />
    ),
    type: "operator",
    character: "x",
  },
  four: {
    isElement: false,
    character: "4",
    color: primaryColor,
    type: "number",
  },
  five: {
    isElement: false,
    character: "5",
    color: primaryColor,
    type: "number",
  },
  six: {
    isElement: false,
    character: "6",
    color: primaryColor,
    type: "number",
  },
  minus: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faMinus} color={secondaryColor} size={size} />
    ),
    type: "operator",
    character: "-",
  },
  one: {
    isElement: false,
    character: "1",
    color: primaryColor,
    type: "number",
  },
  two: {
    isElement: false,
    character: "2",
    color: primaryColor,
    type: "number",
  },
  three: {
    isElement: false,
    character: "3",
    color: primaryColor,
    type: "number",
  },
  plus: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faPlus} color={secondaryColor} size={size} />
    ),
    type: "operator",
    character: "+",
  },
  minusPlus: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faPlusMinus} color={primaryColor} size={size} />
    ),
    type: "minusPlus",
  },
  zero: {
    isElement: false,
    character: "0",
    color: primaryColor,
    type: "number",
  },
  dot: {
    isElement: false,
    character: ".",
    color: primaryColor,
    type: "decimal",
  },
  equals: {
    isElement: true,
    element: (
      <FontAwesomeIcon icon={faEquals} color={primaryColor} size={size} />
    ),
    type: "equals",
  },
};

export { primaryColor, secondaryColor, size };
