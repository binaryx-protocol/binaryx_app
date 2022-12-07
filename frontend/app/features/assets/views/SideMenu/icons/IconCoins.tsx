import s from './IconCoins.module.scss'
const IconCoins = ({ width = 24, height = 24, color = '#58667E'}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={s.root}
  >
    <rect width={width} height={height} fill="none" />
    <path
      opacity="0.2"
      d="M9 11.25C13.1421 11.25 16.5 9.73896 16.5 7.875C16.5 6.01104 13.1421 4.5 9 4.5C4.85786 4.5 1.5 6.01104 1.5 7.875C1.5 9.73896 4.85786 11.25 9 11.25Z"
      fill={color}
    />
    <path
      opacity="0.2"
      d="M16.5 9.06561C19.9219 9.38436 22.5 10.7437 22.5 12.375C22.5 14.2406 19.1438 15.75 15 15.75C13.1625 15.75 11.475 15.45 10.1719 14.9625C13.7625 14.7094 16.5 13.3125 16.5 11.625V9.06561Z"
      fill={color}
    />
    <path
      d="M9 11.25C13.1421 11.25 16.5 9.73896 16.5 7.875C16.5 6.01104 13.1421 4.5 9 4.5C4.85786 4.5 1.5 6.01104 1.5 7.875C1.5 9.73896 4.85786 11.25 9 11.25Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 7.875V11.625C1.5 13.4906 4.85625 15 9 15C13.1438 15 16.5 13.4906 16.5 11.625V7.875"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 10.9688V14.7188"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5 9.06561C19.9219 9.38436 22.5 10.7437 22.5 12.375C22.5 14.2406 19.1438 15.75 15 15.75C13.1625 15.75 11.475 15.45 10.1719 14.9625"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 14.9344V16.125C7.5 17.9906 10.8562 19.5 15 19.5C19.1438 19.5 22.5 17.9906 22.5 16.125V12.375"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 15.4688V19.2188"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 10.9688V19.2188"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconCoins;
