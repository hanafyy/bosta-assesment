const ErrorMessage = ({ error }: { error: string }) => (
  <div className="text-primaryRed flex items-center justify-center min-h-screen w-full h-full">
    {error}
  </div>
);
export default ErrorMessage;
