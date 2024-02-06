const Hamburger = ({ color = '#fff' }) => {
  return (
    <svg fill={color} viewBox="0 0 100 80" width="20" height="20">
      <rect width="100" height="18"></rect>
      <rect y="30" width="100" height="18"></rect>
      <rect y="60" width="100" height="18"></rect>
    </svg>
  );
};

export default Hamburger;
