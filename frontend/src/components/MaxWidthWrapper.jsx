import PropTypes from "prop-types";

const MaxWidthWrapper = ({ children }) => {
  return (
    <div className="h-full mx-auto w-full max-w-screen-xl px-4 md:px-20 ">
      {children}
    </div>
  );
};

MaxWidthWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default MaxWidthWrapper;
