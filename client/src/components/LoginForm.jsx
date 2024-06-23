function LoginForm() {
  let params = new URL(document.location).searchParams;
  let message = params.get('message');
  console.log(message);

  return <div>LoginForm</div>;
}

export default LoginForm;
