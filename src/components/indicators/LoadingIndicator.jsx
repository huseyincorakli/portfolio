import { InfinitySpin } from "react-loader-spinner";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center " >
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default LoadingIndicator;
