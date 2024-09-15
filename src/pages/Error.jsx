import MainNavigation from "../components/countryComponents/MainNavigation";
import ErrorContent from "../components/error/errorPage";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";
  console.log("error");
  console.log(error);

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Look like you're lost";
    message = "the page you are looking for not avaible!";
  }

  return (
    <>
      <ErrorContent title={title} message={message} status={error.status} />
    </>
  );
}

export default ErrorPage;
